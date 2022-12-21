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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("order_id")->default(0);
            $table->unsignedBigInteger("product_id")->default(0);
            $table->unsignedBigInteger("user_id")->default(0);
            $table->unsignedBigInteger("company_id")->default(0);
            $table->unsignedBigInteger("company_owner_id")->default(0);
            $table->unsignedBigInteger("table_id")->default(0);
            $table->integer("quantity")->default(0);
            $table->double("unit_price",11,2)->default(0);
            $table->double("total_amount",11,2)->default(0);
            $table->string("description", 500)->nullable();
            $table->boolean("is_completed")->default(false);
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
        Schema::dropIfExists('order_details');
    }
};
