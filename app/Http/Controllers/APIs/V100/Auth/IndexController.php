<?php

namespace App\Http\Controllers\APIs\V100\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'surname' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User([
            'name' => $request->name,
            'surname' => $request->surname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            "is_active" => $request->is_active,
            "user_type" => 4,
        ]);
        if ($user->save()) {
            $credentials = ['username' => $request->username, 'password' => $request->password]; // get credentials from request
            if (!Auth::attempt($credentials)) { // if login fails
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access'); // create token
            $token = $tokenResult->token; // get token
            $token->expires_at = Carbon::now()->addWeeks(4); // set token expiry
            $token->save(); // save token
            return response()->json([
                'success' => true,
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'surname' => $user->surname,
                'user' => $user,
                'email' => $user->email,
                'access_token' => $tokenResult->accessToken,
                "is_active" => $user->is_active,
                'token_type' => 'Bearer',
                'expires_at' => (int)round(Carbon::parse($tokenResult->token->expires_at)->format('Uu') / pow(10, 6 - 3)),
                "privileges" => $user->privileges
            ], 203);
        } else {
            return response()->json([
                'message' => 'error_creating_user'
            ], 401);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['username', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(4);
        $token->save();
        return response()->json([
            'success' => true,
            'id' => $user->id,
            'username' => $user->username,
            'name' => $user->name,
            'surname' => $user->surname,
            'user' => $user,
            'email' => $user->email,
            'access_token' => $tokenResult->accessToken,
            "is_active" => $user->is_active,
            'token_type' => 'Bearer',
            'expires_at' => (int)round(Carbon::parse($tokenResult->token->expires_at)->format('Uu') / pow(10, 6 - 3)),
            "privileges" => $user->privileges
        ], 203);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Logout successfully'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function authentication(Request $request)
    {
        $user = [];
        if (Auth::check()) {
            $user = $request->user();
        }
        return response()->json([
            'user' => $user,
            'isLoggedIn' => Auth::check()
        ],202);
    }
}
