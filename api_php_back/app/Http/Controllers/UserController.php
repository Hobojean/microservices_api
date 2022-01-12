<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {

    /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(): \Illuminate\Http\JsonResponse
    {
        return response()->json(['user' => Auth::user()], 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $users = User::all();
        return response()->json($users);
    }

    public function update(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = User::find(Auth::user()->getAuthIdentifier());
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $plainPassword = $request->input('password');
        $user->password = app('hash')->make($plainPassword);
        $user->save();
        return response()->json('User updated successfully');
    }

    public function delete(): \Illuminate\Http\JsonResponse
    {
        $user = User::find(Auth::user()->getAuthIdentifier());
        $user->delete();

        return response()->json('User removed successfully');
    }

    public  function one($id):\Illuminate\Http\JsonResponse
    {
        $user = User::find($id);
        return response()->json('User find ok'.$user);
    }


}
