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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("category_id")->default(0);
            $table->unsignedBigInteger("company_id")->default(0);
            $table->unsignedBigInteger("company_owner_id")->default(0);
            $table->unsignedBigInteger("parent_id")->default(0);
            $table->string("name", 255);
            $table->string("slug", 255);
            $table->string("description", 255)->nullable();
            $table->string("image", 255)->nullable();
            $table->boolean("is_active")->default(true);
            $table->double("price", 11, 2)->default(0);
            $table->boolean("discount_type")->default(0); // 0 - percentage, 1 - fixed
            $table->double("discount", 11, 2)->default(0);
            $table->integer("quantity")->default(0);
            $table->longText("options")->nullable();
            $table->longText("attributes")->nullable();
            $table->longText("ingredients")->nullable();
            $table->longText("allergens")->nullable();
            $table->longText("nutritional_facts")->nullable();
            $table->longText("recipe")->nullable();
            $table->string("video", 255)->nullable();
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
        Schema::dropIfExists('products');
    }
};
