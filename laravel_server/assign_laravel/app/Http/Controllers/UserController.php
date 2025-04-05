<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mockery\Undefined;

use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    //

    public function getUsers() {
        $users = User::all();
        return $users;
    }

    public function login(Request $request) {
        
       try {
        //code...
        $body = $request->all();

        $checkUser = User::where('username', $body['username'])->first();

        if(!$checkUser) {

            return response()->json([
                'message' => 'Invalid Credentials',
            ], 400);
        }

        if(!Hash::check($body['password'], $checkUser['password'])){
            return response()->json([
                'message' => 'Invalid Credentials',
            ], 400);
        }

        // $token = $checkUser->createToken('authToken');
        $token = JWTAuth::fromUser($checkUser);

        return response()->json([
            'success' => true,
            'message'=> 'User logged in sucessfully!',
            'data' => [
                'user' => $checkUser,
                // 'token' => $token->plainTextToken
                'token' => $token
            ],
            
        ], 200);


       } catch (\Throwable $e) {
        return response()->json([
            'message' => 'Internal Server Error',
            'error' => $e->getMessage()
        ], 500);
       }
    }

    public function register(Request $request) {
        try {
            $body = $request->all();

        // $username = $request->input('username', null);
 
        // $checkUser = User::where('username', $body['username'])->first();

        // if($checkUser) {

        //     return response()->json([
        //         'message' => 'User with this username already exists',
        //     ], 400);
        // }

        $hPassword = Hash::make($body['password']);

        $newUser = User::Create([
            'username' => $body['username'],
            'password' => $hPassword
        ]);

        return response()->json([
            'success' => true,
            'message'=> 'User created sucessfully!',
            'data' => $newUser
        ], 200);
        } catch (\Throwable $e) {
            //throw $th;

            return response()->json([
                'message' => 'Internal Server Error',
            ], 500);
        }
       
        
    }

    public function logoutUser(Request $request) {
        try {
            // auth()->user()->tokens()->delete();

            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'message' => 'Logged out successfully!',
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
            ], 500);
        }
    }
}
