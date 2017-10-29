<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->string('avatar_url');
            $table->string('product_hunt_id');
            $table->string('product_hunt_username');
            $table->string('user_name');
            $table->string('user_title');
            $table->text('pros');
            $table->text('cons');
            $table->text('review');
            $table->integer('positive_vote')->default(false);
            $table->integer('neutral_vote')->default(false);
            $table->integer('negative_vote')->default(false);
            $table->integer('products_id')->unsigned()->nullable();
            $table->foreign('products_id')->references('id')->on('products')->onDelete('cascade');
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
        Schema::dropIfExists('reviews');
    }
}
