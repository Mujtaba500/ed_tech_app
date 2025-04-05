<?php

namespace App\Http\Middleware;

use Closure;

class AuthValidation 
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

    public function handle($request, Closure $next){
        

        try {
            $request->validate([
                'username' => 'required|min:4|unique:users',
                'password' => 'required|min:4',
            ]);
            return $next($request);
        } catch (\Illuminate\Validation\ValidationException $th) {
            //throw $th;
            return response()->json([
                'error' => $th->validator->errors()->all()
            ], 422);
        }


        
    }
}
