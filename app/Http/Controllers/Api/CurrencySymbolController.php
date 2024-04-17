<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\Fixer;
use Illuminate\Http\JsonResponse;

class CurrencySymbolController extends Controller
{
    /**
     * Display the dashboard page.
     */
    public function index(Fixer $fixer): JsonResponse
    {
        $currencySymbol = $fixer->getCurrencySymbol();

        return response()->json($currencySymbol, 200);
    }
}
