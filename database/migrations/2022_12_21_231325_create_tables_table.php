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
        Schema::create('tables', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("company_id")->default(0);
            $table->unsignedBigInteger("company_owner_id")->default(0);
            $table->unsignedBigInteger("current_waiter_id")->default(0);
            $table->unsignedBigInteger("current_order_id")->default(0);
            $table->unsignedBigInteger("table_location_id")->default(0);
            $table->string("name", 255);
            $table->string("slug", 255);
            $table->string("description", 255)->nullable();
            $table->string("image", 255)->nullable();
            $table->boolean("is_active")->default(true);
            $table->integer("capacity")->default(0);
            $table->integer("current_capacity")->default(0);
            $table->longText("qr_code")->nullable();
            $table->boolean("is_reserved")->default(false);
            $table->boolean("is_occupied")->default(false);
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
        Schema::dropIfExists('tables');
    }
};
