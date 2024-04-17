<?php

use App\Http\Services\Fixer;

test('get response from currency symbols source', function () {
    $fixer = new Fixer('RANDOM_ACCESS_KEY');

    $symbols = $fixer->getCurrencySymbol();

    expect($symbols)->toHaveKeys(['AED', 'AFN']);
})->group('request');

test('get response from latest exchange rates source', function () {
    $fixer = new Fixer('RANDOM_ACCESS_KEY');

    $exchangeRates = $fixer->getExchangeRates();

    expect($exchangeRates)->toHaveKeys(['rates'])->not->toHaveKeys(['success']);
})->group('request');
