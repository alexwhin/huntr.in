<?php

namespace App\Http\Controllers;

use App\Reviews;
use App\Products;
use Illuminate\Http\Request;
use App\Library\ScrapeProduct;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

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
     * Scrape product / review data
     *
     * @param string $slug
     * @return \Illuminate\Http\Response
    */
    public function scrape($slug)
    {

        $scrape = (new ScrapeProduct($slug));

        return (!$scrape->error) ? $this->show($slug) : [
          'error' => $scrape->error
        ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Products $products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy(Products $products)
    {
        //
    }
}
