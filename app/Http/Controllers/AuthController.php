<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function postLogin(Request $req) {
        request()->validate([ 
            "email"=> ['required','email'],
            "password"=> ['required']
        ]);

        if(auth()->attempt($req->only(['email','password']))) {
            return redirect('/parkings');
        }

        return redirect()->back()->withErrors(['email'=> 'Invalid Credentials']);
    }

    public function postSignup(Request $req) {
        request()->validate([ 
            "name"=> ['required','string'],
            "email"=> ['required','email', 'unique:users'],
            "phone" => ['required', 'integer'],
            "vehicle_no" => ['required', 'string'],
            "password"=> ['required', 'string'],
        ]);

        
        $user = new User();
        $user->name = $req->name;
        $user->email = $req->email;
        $user->phone = $req->phone;
        $user->vehicle_no = $req->vehicle_no;
        $user->password = bcrypt($req->password);
        $user->role = "client";
        $user->save();
        
        if(auth()->attempt($req->only(['email','password']))) {
            return redirect('/parkings');
        }

        return redirect()->back()->withErrors(['email'=> 'Invalid Credentials']);
    }

    public function logout() {
        auth()->logout();
        return redirect('/login');
    }
}
