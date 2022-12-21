<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger("owner_id")->default(0);
            $table->string("slug", 255)->unique();
            $table->string("logo", 255)->nullable();
            $table->string("website", 255)->nullable();
            $table->string("title", 255)->nullable();
            $table->string("description", 1000)->nullable();
            $table->string("slogan", 500)->nullable();
            $table->unsignedBigInteger("cuisine" )->default(0);
            $table->string("primary_image", 255)->nullable();
            $table->longText("seo_tags")->nullable();
            $table->string("phone", 20)->nullable();
            $table->string("email", 255)->nullable();
            $table->string("address", 100)->nullable();
            $table->unsignedBigInteger("city", )->default(0);
            $table->unsignedBigInteger("state", )->default(0);
            $table->unsignedBigInteger("country", )->default(0);
            $table->string("zip_code", 10)->nullable();
            $table->tinyInteger("price_range")->default(0); // 0 - $, 1 - $$, 2 - $$$, 3 - $$$$, 4 - $$$$$, 5 - $$$$$$
            $table->longText("social_media")->nullable();
            $table->longText("opening_hours")->nullable();
            $table->boolean("have_take_away")->default(false);
            $table->boolean("have_delivery")->default(false);
            $table->boolean("have_reservation")->default(false);
            $table->boolean("have_table_booking")->default(false);
            $table->boolean("have_catering")->default(false);
            $table->boolean("have_private_dining")->default(false);
            $table->string("tax_no", 255)->nullable();
            $table->string("tax_no2", 255)->nullable();
            $table->boolean("is_active")->default(true);
            $table->tinyInteger("company_type")->default(0); // 0 - restaurant, 1 - cafe, 2 - bar, 3 - pub, 4 - club, 5 - other
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
};
