<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Services\Fixer;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard page.
     */
    public function show(Fixer $fixer): Response
    {
        $currencySymbol = $fixer->getCurrencySymbol();
        $exchangeRates = $fixer->getExchangeRates();

        return Inertia::render('Dashboard', [
            'exchangeRates' => $exchangeRates,
            'currencySymbol' => $currencySymbol
        ]);
    }
}
