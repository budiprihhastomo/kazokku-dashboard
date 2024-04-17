<?php

namespace App\Http\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class Fixer
{
    function __construct(private string $accessKey)
    {
    }

    protected function fetch(): PendingRequest
    {
        if (!app()->isProduction()) {
            $symbolsJsonFake = Storage::json('fake/symbols.json') ?? "";
            $exchangeRatesFakeJson = Storage::json('fake/exchange-rates.json') ?? "";

            Http::fake([
                'data.fixer.io/api/symbols?*' => Http::response(
                    $symbolsJsonFake,
                    200
                ),
                'data.fixer.io/api/latest?*' => Http::response(
                    $exchangeRatesFakeJson,
                    200
                )
            ]);
        }

        return Http::baseUrl(config('fixer.base_url'))
            ->asJson()
            ->withQueryParameters([
                'access_key' => $this->accessKey,
            ]);
    }

    public function getCurrencySymbol(): array
    {
        $jsonData = Cache::remember('symbols', 3600, function () {
            $request = $this->fetch()->get('/symbols');

            throw_unless($request->successful(), new \Exception('Failed to fetch third-party. Please contact to administrator.'));

            return $request->json();
        });

        $jsonData = $jsonData['symbols'];

        return $jsonData ?? [];
    }

    public function getExchangeRates(): array
    {
        $jsonData = Cache::remember('rates', 3600, function () {
            $request = $this->fetch()->get('/latest');

            throw_unless($request->successful(), new \Exception('Failed to fetch third-party. Please contact to administrator.'));

            $jsonData = $request->json();

            unset($jsonData['success']);

            return $jsonData;
        });

        return  $jsonData ?? [];
    }
}
