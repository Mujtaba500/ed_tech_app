<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LessonValidation
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $request->validate([
                'lessonName' => 'required|min:4|max:100',
                'video' => 'required|mimes:mp4'
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
