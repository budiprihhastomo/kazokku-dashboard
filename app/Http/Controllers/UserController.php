<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display the user's account.
     */
    public function index(Request $request): Response
    {
        $usersPaginate = User::with('roles')->paginate();

        return Inertia::render('Admin/User', ['users' => $usersPaginate]);
    }

    /**
     * Store new user's account.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('user');

        event(new Registered($user));

        return Redirect::route('user.index');
    }

    /**
     * Update the user's account.
     */
    public function update(Request $request, int $idUser): RedirectResponse
    {
        $request = $request->validate([
            'name' => 'string|max:255',
            'password' => ['sometimes', 'required', 'confirmed', Password::defaults()],
        ]);

        $user = User::find($idUser);

        $user->update($request);

        return Redirect::route('user.index');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, int $idUser): RedirectResponse
    {
        User::find($idUser)->delete();

        return Redirect::route('user.index');
    }
}
