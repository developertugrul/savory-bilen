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
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("parent_id")->default(0);
            $table->string("name", 255);
            $table->string("slug", 255);
            $table->string("description", 255)->nullable();
            $table->string("image", 255)->nullable();
            $table->boolean("is_active")->default(true);
            $table->unsignedBigInteger("company_id")->default(0);
            $table->unsignedBigInteger("company_owner_id")->default(0);
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
        Schema::dropIfExists('product_categories');
    }
};
