<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Products;

class ScrapeProduct extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:scrapeproduct';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Periodically scrape for new product data and reviews';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        $products = Products::where('updated_at', '<', Carbon::now()->subHours(2))->get();

        $count = 0;
        foreach ($products as $key => $product) {

          /* Update product from scrape */
          app('App\Http\Controllers\ProductsController')->scrape($product->slug);

          if ($count > 3) break;
          $count++;
        }
    }
}
