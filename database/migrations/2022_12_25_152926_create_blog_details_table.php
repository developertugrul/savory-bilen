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
        Schema::create('blog_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("blog_id");
            $table->tinyInteger("content_type")->default(0); // 0: text, 1: image, 2: video, 3: audio, 4: file, 5: link, 6: embed, 7: html, 8: json, 9: xml, 10: yaml, 11:markdown, 12: code, 13: table, 14:short_code
            $table->longText("content");
            $table->integer("rank")->default(0);
            $table->string("short_code")->nullable();
            $table->boolean("is_active")->default(true);
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
        Schema::dropIfExists('blog_details');
    }
};
