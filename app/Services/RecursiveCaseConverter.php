<?php

namespace App\Services;

use Illuminate\Support\Str;
use InvalidArgumentException;

class RecursiveCaseConverter
{
    public const CASE_SNAKE  = 'snake';
    public const CASE_CAMEL  = 'camel';
    public const CASE_KEBAB  = 'kebab';
    public const CASE_STUDLY = 'studly';

    private array $allowed = [
        self::CASE_SNAKE,
        self::CASE_CAMEL,
        self::CASE_KEBAB,
        self::CASE_STUDLY,
    ];

    /**
     * Recursively convert all array keys to the given case.
     *
     * @param  string  $case  one of CASE_SNAKE|_CAMEL|_KEBAB|_STUDLY
     * @param  array   $data
     * @return array
     *
     * @throws InvalidArgumentException
     */
    public function convert(string $case, array $data): array
    {
        if (! in_array($case, $this->allowed, true)) {
            throw new InvalidArgumentException(
                'Unknown case “' . $case . '”. Allowed: ' . implode(', ', $this->allowed)
            );
        }

        $result = [];

        foreach ($data as $key => $value) {
            // Transform the key
            $newKey = Str::{$case}($key);

            // Recurse if nested array
            if (is_array($value)) {
                $value = $this->convert($case, $value);
            }

            $result[$newKey] = $value;
        }

        return $result;
    }
}
