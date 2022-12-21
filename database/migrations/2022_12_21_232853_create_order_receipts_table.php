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
        Schema::create('order_receipts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("table_id")->default(0);
            $table->unsignedBigInteger("company_id")->default(0);
            $table->unsignedBigInteger("company_owner_id")->default(0);
            $table->unsignedBigInteger("waiter_id")->default(0);
            $table->double("total_amount",11,2)->default(0);
            $table->double("total_discount",11,2)->default(0);
            $table->boolean("is_paid")->default(false);
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
        Schema::dropIfExists('order_receipts');
    }
};
