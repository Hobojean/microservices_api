<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Exception;


class MessageController extends Controller
{
    /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function createMessage(Request $request)
    {
        $this->validate($request, [
            'content' => 'required|string',
        ]);

        try {

            $message = new Message();
            $message->fk_user_id = Auth::user()->getAuthIdentifier();
            $message->content = $request->input('content');
            $message->save();

            //return successful response
            return response()->json(['msg' => $message, 'message' => 'CREATED'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'Message could not be send!'.$e ], 409);
        }
    }


    public function delete($id)
    {
        try {
            $message = Message::find($id);
            if($message->fk_user_id == Auth::user()->getAuthIdentifier()) {
                $message->delete();
                return response()->json('Message deleted');
            } else {
                return response()->json('Unauthorized');
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'Message could not be deleted!'.$e ], 409);
        }
    }

    public  function readOne($id)
    {
            $message = Message::find($id);
            if(!$message) {
                return response()->json('Message does not exists');
            } else {
                return response()->json('Message read sucessfully :'. $message->content);
            }
    }


    public function update(Request $request, $id)
    {
        try {
            $message = Message::find($id);
            echo $message;
            if($message->fk_user_id == Auth::user()->getAuthIdentifier()) {
                $message->content = $request->input('content');
                $message->save();
                return response()->json('Message updated');
            } else {
                return response()->json('Unauthorized');
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'Message could not be updated!'.$e ], 409);
        }
    }



}
