<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class LessonController extends Controller
{
    //

    public function createLesson(Request $request, $subjectId){
        try {
            //code...
            $userId = auth()->user()->id;
            $username = auth()->user()->username;

            $filePath = $request->file('video')->store("videos/$username");

            $body = $request->all();

            $newLesson = Lesson::Create([
                'name' => $body['lessonName'],
                'videoURL' => $filePath,
                'user_id' => $userId,
                'subject_id' => $subjectId
            ]);

            return response()->json([
                'success' => true,
                'message'=> 'Lesson created sucessfully!',
                'data' => $newLesson
            ], 200);


        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getLessons(Request $request, $subjectId){

        try {
            $userId = auth()->user()->id;

            // $lessons = Lesson::first() ;
            // $lessons = $lessons->users->username;
            $lessons = Lesson::where('user_id' , '=' , $userId)->where('subject_id', $subjectId)->get();

            return response()->json([
                'success' => true,
                'data' => $lessons
            ], 200);

        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
        
    }

    public function deleteLesson(Request $request, $lessonId){
        $userId = auth()->user()->id;

        try {


            $lesson = Lesson::where('id', $lessonId)->where('user_id', $userId)->get()->first();

            if(!$lesson){
                return response()->json([
                    'message' => 'Lesson not found'
                ], 404);
            }

            $video_path = str_replace("/app", "", app_path())."/storage/app/".($lesson->videoURL);

            if (File::exists($video_path)) {
                
                unlink($video_path);
            }

            $lesson->delete();

            return response()->json([
                'success' => true,
                'message' => 'Lesson deleted sucessfully'
            ], 200);

        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getVideo(Request $request){
        try {
            $path = $request->query('path');

            $video = Storage::disk('local')->get($path);
            $response = Response::make($video, 200);
            $response->header('Content-Type', 'video/mp4');
             return $response;
        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
