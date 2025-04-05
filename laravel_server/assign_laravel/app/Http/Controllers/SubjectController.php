<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class SubjectController extends Controller
{
    //
    public function createSubject(Request $request){
        try {
            //code...
            $username = auth()->user()->username;
            $id = auth()->user()->id;

            $filePath = $request->file('subjectImg')->store("images/$username", 'public');
            $filePath = 'storage/'.$filePath;
            $body = $request->all();

             Subject::Create([
                'name' => $body['subjectName'],
                'image' => $filePath,
                'user_id' => $id
            ]);

            return response()->json([
                'success' => true,
                'message'=> 'Subject created sucessfully!',
            ], 200);

        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getSubjects(){
        try {
            $id = auth()->user()->id;

            $subjects = Subject::where('user_id' , '=' , $id)->get();

            return response()->json([
                'success' => true,
                'data'=> $subjects,
            ], 200);


        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteSubject(Request $request, $id){
        try {
            $userId = auth()->user()->id;
            // $subject = Subject::find($id);

            $subject = Subject::where('id', $id)->where('user_id', $userId)->get()->first();

            if(!$subject){
                return response()->json([
                    'message' => 'Subject not found'
                ], 404);
            }

            $image_path = str_replace("/app", "", app_path())."/public/".($subject->image);
            

            if (File::exists($image_path)) {
                
                unlink($image_path);
            }

            $subject->delete();

            
            return response()->json([
                'success' => true,
                'message' => 'Subject deleted successfully!'
            ], 200);

        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function updateSubject(Request $request, $id){
        try {
            //code...
            $userId = auth()->user()->id;
            $username = auth()->user()->username;
            $body = $request->all();

            // dd($body);

            $subject = Subject::where('id', $id)->where('user_id', $userId)->get()->first();

            if(!$subject){
                return response()->json([
                    'message' => 'Subject not found'
                ], 404);
            }

            if($request->file('subjectImg')){

                $image_path = str_replace("/app", "", app_path())."/public/".($subject->image);

            if (File::exists($image_path)) {
                
                unlink($image_path);
            }

            $filePath = $request->file('subjectImg')->store("images/$username", 'public');
            $filePath = 'storage/'.$filePath;

            $subject->image = $filePath;

            }

            dd($body);

            // if($body['subjectName']){
            //     // dd($body['subjectName']);
            //     // $subject->name = $body['subjectName'];
            // }

            $subject->save();

            return response()->json([
                'success' => true,
                'message' => 'Subject updated successfully!'
            ], 200);




        } catch (\Throwable $e) {
            //throw $th;
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
