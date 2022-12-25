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
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string("name",255);
            $table->string("slug", 255)->unique();
            $table->string("url",255)->nullable();
            $table->integer("rank")->default(0);
            $table->unsignedBigInteger("parent_id")->default(0);
            $table->longText("seo_tags")->nullable();
            $table->string("primary_image")->nullable();
            $table->boolean("is_active")->default(true);
            $table->boolean("is_indexed")->default(true);
            $table->longText("content")->nullable();
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
        Schema::dropIfExists('blog_categories');
    }
};
