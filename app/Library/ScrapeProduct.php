<?php

  namespace App\Library;

  use GuzzleHttp\Exception\ConnectException;
  use Illuminate\Database\QueryException;
  use GuzzleHttp\Client as GuzzleClient;
  use Carbon\Carbon;
  use Goutte\Client;
  use App\Products;
  use App\Reviews;

  class ScrapeProduct
  {

    public $error = false;

    private $productUpvotes,
            $goutte,
            $slug;

    /**
     * Create a new controller instance.
     *
     * @param string $slug
     * @return void
     */
    public function __construct($slug)
    {

      $this->slug = trim(strtolower($slug));

      /* Scraper setup */
      $this->goutte = new Client([
        'http_errors' => false
      ]);
      $guzzle = new GuzzleClient([
        'timeout' => 10
      ]);
      $this->goutte->setClient($guzzle);

      /* Get product */
      $productMarkup = $this->getProduct();
      $productData = $this->getProductJSON($productMarkup);

      if (!$this->error) { // Found product

        $this->productUpvotes = $this->getProductUpvotes();

        $productData = $this->cleanData($productData);
        if (Products::where('product_hunt_id', (int) $productData['post']['id'])->count()) {

          /* Update existing product */
          $updated = $this->updateProduct($productData);
          if (is_int($updated)) $this->deleteCurrentReviews($updated);

        } else {

          /* Create new product listing */
          $created = $this->createProduct($productData);
        }

        $newProductID = (isset($created)) ? $created : $updated;
        $reviews = $this->getReviews($newProductID, $productData);
        $this->createReviews($newProductID, $reviews);
      }
    }

    /**
     * Get product
     *
     * @return string
     */
    private function getProduct()
    {

      $request = $this->getProductHuntMarkup();
      if (!$request) $this->error = 'There was an error trying to reach producthunt.com';

      if (!$this->error) {
        $markup = $this->doesProductExist($request->text());
        if (!$markup) $this->error = 'Unable to find product from slug';
      }

      return ($this->error) ?: $request->text();
    }

    /**
     * Crawl product hunt
     *
     * @return object
     */
    private function getProductHuntMarkup()
    {

      try {

        $url = 'https://www.producthunt.com/posts/' . $this->slug . '/reviews';
        $request = $this->goutte->request('GET', $url);

      } catch (ConnectException $e) {

          return false;
      }

      return $request;
    }

    /**
     * Check product found
     *
     * @param string $markup
     * @return bool
     */
    private function doesProductExist($markup)
    {

      return (strpos($markup, 'Server error') !== false) ? false : true;
    }

    /**
     * Match product JSON
     *
     * @param string $markup
     * @return bool
     */
    private function getProductJSON($markup)
    {

      /* String to array */
      preg_match_all ("/window.initialState =(.*?)};/si", $markup, $matches);
      $dataString = (!empty($matches[1][0])) ? $matches[1][0] . '}' : false;
      $data = json_decode($dataString, JSON_FORCE_OBJECT);

      if (empty($data['apollo']['data'])) $this->error = 'Unable to process product data string';

      return ($this->error) ?: $data['apollo']['data'];
    }

    /**
     * Get product upvotes
     *
     * @return int
     */
    private function getProductUpvotes()
    {

      try {

        $url = 'https://www.producthunt.com/posts/' . $this->slug;
        $request = $this->goutte->request('GET', $url);
        $request = $request->html();

      } catch (ConnectException $e) {

          return 0;
      }

      /* Pull out count */
      preg_match_all ("/class=\"bigButtonCount_(.*?)\">(.*?)<\/span>/si", $request, $matches);
      $count = (!empty($matches[2][0])) ? $matches[2][0] : '';
      $count = (int) str_ireplace(',', '', $count);

      return $count;
    }

    /**
     * Clean product data
     *
     * @param array $productData
     * @return bool
     */
    private function cleanData($productData)
    {

      $count = 0;
      foreach ($productData as $key => $data) {

        /* Post data (first item) */
        if ($count == 0) {
          $productData['post'] = $data;
          unset($productData[$key]);
        }

        /* Website */
        if (strpos($key, 'ProductLink') !== false) {
          if (!empty($data['store_name']) && $data['store_name'] == 'Website') {
            $productData['link'] = 'http://' . $data['website_name'];
          }
        }

        $count++;
      }

      return $productData;
    }

    /**
     * Create product
     *
     * @param array $productData
     * @return bool|int
     */
    private function createProduct($productData)
    {

      try {

        $product = new Products();
        $product->product_hunt_id = $productData['post']['id'] ?: false;
        $product->slug = $this->slug;
        $product->title = $productData['post']['name'] ?: false;
        $product->tagline = $productData['post']['tagline'] ?: false;
        $product->website_url = @$productData['link'] ?: '';
        $product->upvotes = $this->productUpvotes ?: 0;
        $product->positive_votes = $productData['post']['positive_reviews_count'] ?: false;
        $product->neutral_votes = $productData['post']['neutral_reviews_count'] ?: false;
        $product->negative_votes = $productData['post']['negative_reviews_count'] ?: false;
        $product->save();

      } catch (QueryException $e) {

        $this->error = 'Unable to create product with invalid data';
        return false;
      }

      return $product->id;
    }

    /**
     * Update product
     *
     * @param array $productData
     * @return bool|int
     */
    private function updateProduct($productData)
    {

      try {

        $product = Products::where('product_hunt_id', (int) $productData['post']['id'])->get()->first();
        $product->product_hunt_id = $productData['post']['id'] ?: false;
        $product->slug = $this->slug;
        $product->title = $productData['post']['name'] ?: false;
        $product->tagline = $productData['post']['tagline'] ?: false;
        $product->website_url = @$productData['link'] ?: '';
        $product->upvotes = $this->productUpvotes ?: 0;
        $product->positive_votes = $productData['post']['positive_reviews_count'] ?: false;
        $product->neutral_votes = $productData['post']['neutral_reviews_count'] ?: false;
        $product->negative_votes = $productData['post']['negative_reviews_count'] ?: false;
        $product->update();

      } catch (QueryException $e) {

        $this->error = 'Unable to update product with invalid data';
        return false;
      }

      return $product->id;
    }

    /**
     * Delete current reviews
     *
     * @param array $productID
     * @return bool
     */
    private function deleteCurrentReviews($productID)
    {

      return Reviews::where('products_id', $productID)->delete();
    }

    /**
     * Pull out data from nested node
     *
     * @param array $body
     * @return string
     */
    private function getBodyFromNode($body)
    {

      $body = str_ireplace('"', "'", json_encode($body));
      preg_match_all ("/'text':'(.*?)','/si", $body, $matches);
      $string = (!empty($matches[1][0])) ? $matches[1][0] : '';

      if ($string == '\r') $string = (!empty($matches[1][1])) ? $matches[1][1] : '';

      return $string;
    }

    /**
     * Clean data string
     *
     * @param string $string
     * @return string
     */
    private function cleanDataString($string)
    {

      $string = str_ireplace(["\r", "\n", '\\', '"', '&nbsp;'], '', $string);
      $string = utf8_encode($string);
      $string = strip_tags($string);
      $string = preg_replace("/&#?[a-z0-9]+;/i", "", $string);
      $string = preg_replace('/\s+/', ' ', $string);

      return trim($string);
    }

    /**
     * Get avatar URL
     *
     * @param int $id
     * @return string
     */
    private function getAvatarURL($id)
    {

      $url = 'https://ph-avatars.imgix.net/' . $id . '/original?w=32&h=32&fit=crop&dpr=2';
      return $url;
    }

    /**
     * Get reviews
     *
     * @param int $productID
     * @param array $productData
     * @return array
     */
    private function getReviews($productID, $productData)
    {

      $reviews = [];
      foreach ($productData as $key => $data) {
        if (strpos($key, 'Review') !== false) {

          /* User details */
          $userData = @$productData[@$data['user']['id']];
          if (empty($userData)) continue;

          /* Build review */
          $review = [
            'positive_vote' => false,
            'neutral_vote' => false,
            'negative_vote' => false,
            'review' => $this->getBodyFromNode($data['body']),
            'pros' => $this->getBodyFromNode($data['pros']),
            'cons' => $this->getBodyFromNode($data['cons']),
            'avatar_url' => $this->getAvatarURL($userData['id']),
            'product_hunt_id' => (int) $userData['id'],
            'product_hunt_username' => $userData['username'],
            'user_name' => $userData['name'],
            'user_title' => trim($userData['headline']) ?: '',
            'date' => Carbon::parse($data['created_at'])
          ];

          /* Append review */
          $review[($data['sentiment']) . '_vote'] = true;
          $reviews[] = $review;
        }
      }

      return $reviews;
    }

    /**
     * Create reviews
     *
     * @param int $productID
     * @param array $reviews
     * @return
     */
    private function createReviews($productID, $reviews)
    {

      foreach ($reviews as $key => $review) {

        $create = new Reviews();
        $create->positive_vote = $review['positive_vote'];
        $create->neutral_vote = $review['neutral_vote'];
        $create->negative_vote = $review['negative_vote'];
        $create->review = $this->cleanDataString($review['review']);
        $create->pros = $this->cleanDataString($review['pros']);
        $create->cons = $this->cleanDataString($review['cons']);
        $create->avatar_url = $review['avatar_url'];
        $create->product_hunt_id = $review['product_hunt_id'];
        $create->product_hunt_username = $this->cleanDataString($review['product_hunt_username']);
        $create->user_name = $this->cleanDataString($review['user_name']);
        $create->user_title = $this->cleanDataString($review['user_title']);
        $create->products_id = $productID;
        $create->created_at = $review['date'];
        $create->updated_at = $review['date'];
        $create->save();
      }
    }
  }
