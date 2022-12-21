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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('username')->unique();
            $table->tinyInteger("gender")->default(0); // 0 - woman, 1 - man, 2 - other
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->tinyInteger("user_type")->default(0); // 0 - admin, 1 - cafe owner, 2 - manager, 3 - waiter, 4 - customer, 5 - guest
            $table->boolean("is_active")->default(true);
            $table->string("phone", 20)->nullable();
            $table->string("address", 100)->nullable();
            $table->unsignedBigInteger("city", )->default(0);
            $table->unsignedBigInteger("state", )->default(0);
            $table->unsignedBigInteger("country", )->default(0);
            $table->string("zip_code", 10)->nullable();
            $table->unsignedBigInteger("company_id")->default(0);
            $table->unsignedBigInteger("company_owner_id")->default(0);
            $table->string("website", 255)->nullable();
            $table->unsignedBigInteger("membership_package_id")->default(0);
            $table->date("membership_expire_date")->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
