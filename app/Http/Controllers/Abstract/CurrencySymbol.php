<?php

abstract class CurrencySymbol
{
    public function __construct(
        private string $code,
        private string $name
    ) {
    }

    public function getCode(): string
    {
        return $this->code;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
