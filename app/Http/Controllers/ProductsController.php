<?php

namespace App\Http\Controllers;

use App\Reviews;
use App\Products;
use Illuminate\Http\Request;
use App\Library\ScrapeProduct;

class ProductsController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param string $slug
     * @return \Illuminate\Http\Response
     */
     public function show ($slug)
     {

        $product = Products::where('slug', $slug)
                             ->get()
                             ->first();

        if (!$product) return [
          'error' => 'Product not found'
        ];

        $reviews = Reviews::where('products_id', $product->id)
                            ->orderBy('created_at', 'DESC')
                            ->get()
                            ->toArray();

        $product = [
          'title' => $product->title,
          'description' => $product->description,
          'website_url' => $product->website_url,
          'upvotes' => number_format($product->upvotes),
          'positive_votes' => $product->positive_votes,
          'neutral_votes' => $product->neutral_votes,
          'negative_votes' => $product->negative_votes,
          'reviews' => [
            'count' => number_format(count($reviews)),
            'list' => $reviews
          ]
        ];

        return $product;
     }

    /**
     * Fetch product / review data
     *
     * @param string $slug
     * @return \Illuminate\Http\Response
    */
    public function fetch($slug)
    {

        $scrape = (new ScrapeProduct($slug));

        if ($scrape->error !== false) {
          $response = ['error' => $scrape->error];
        } else if ($scrape->limit !== false) {
          $response = ['warning' => 'Too many requests to the same product slug'];
        } else {
          $response = $this->show($slug);
        }

        return $response;
    }
}
