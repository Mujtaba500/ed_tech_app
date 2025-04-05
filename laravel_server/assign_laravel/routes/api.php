<?php

use App\Http\Controllers\LessonController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Models\practice;
use Illuminate\Http\Testing\File;
use Illuminate\Support\Facades\File as FacadesFile;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// }); 
 

Route::group(['middleware' => ['jwtMiddleware']], function () {
    Route::get('/users', [UserController::class, 'getUsers']);
    Route::post('/auth/logout', [UserController::class, 'logoutUser']);
    Route::get("/auth", function(){
    
    });

    // Subject
    Route::post('/subject', [SubjectController::class, 'createSubject'])->middleware('subjectValidation');
    Route::get('/subject', [SubjectController::class, 'getSubjects']);
    Route::delete('/subject/{id}', [SubjectController::class, 'deleteSubject']);
    Route::put('/subject/{id}', [SubjectController::class, 'updateSubject']);

    //Lesson
    Route::post('/lesson/{subjectId}', [LessonController::class, 'createLesson'])->middleware(('lessonValidation'));
    Route::get('/lesson/{subjectId}', [LessonController::class, 'getLessons']);
    Route::delete('/lesson/{lessonId}', [LessonController::class, 'deleteLesson']);
});

// Route::get('/image', function() {
//     return FacadesFile::get(public_path() . '/storage/images/test/AsAycGEVJmGr3Ffcs2MQhiLCXuJuYlk87D2F38Zj.svg');
//   });


Route::get("/video", [LessonController::class, 'getVideo']);

// Route::get('/users', [UserController::class, 'getUsers'])->middleware('auth:sanctum');

Route::post('/auth/login', [UserController::class, 'login']);

Route::post('/auth/register', [UserController::class, 'register'])->middleware('authValidation');