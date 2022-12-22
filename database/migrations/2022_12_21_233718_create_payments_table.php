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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("company_id")->default(0);
            $table->unsignedBigInteger("company_owner_id")->default(0);
            $table->longText("order_list")->nullable();
            $table->unsignedBigInteger("order_receipt_id")->default(0);
            $table->unsignedBigInteger("table_id")->default(0);
            $table->unsignedBigInteger("waiter_id")->default(0);
            $table->unsignedBigInteger("customer_id")->default(0);
            $table->double("total_discount",11,2)->default(0);
            $table->double("amount",11,2)->default(0);
            $table->double("total_amount",11,2)->default(0);
            $table->boolean("is_paid")->default(false);
            $table->boolean("is_active")->default(true);
            $table->boolean("is_take_away")->default(false);
            $table->boolean("is_delivery")->default(false);
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
        Schema::dropIfExists('payments');
    }
};
