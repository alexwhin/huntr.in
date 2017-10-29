<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_hunt_id')->unique()->index();
            $table->string('slug')->unique()->index();
            $table->string('title')->index();
            $table->string('tagline')->index()->nullable();
            $table->string('website_url')->index()->nullable();
            $table->integer('upvotes')->index()->nullable()->default(0);
            $table->integer('positive_votes')->index()->default(0);
            $table->integer('neutral_votes')->index()->default(0);
            $table->integer('negative_votes')->index()->default(0);
            $table->timestamps();
            $table->index(['created_at', 'updated_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
