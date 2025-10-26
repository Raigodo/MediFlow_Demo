<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class TaggedCache
{
    private string $prefix = 'tag_index:';

    public function put(string $key, $value, array|null $tags = [], int $ttl = 3600): void
    {
        $tags ??= [];
        $fullKey = $key;
        Cache::put($fullKey, $value, $ttl);

        foreach ($tags as $tag) {
            $indexKey = $this->prefix.$tag;

            $keys = Cache::get($indexKey, []);
            if (!in_array($key, $keys, true)) {
                $keys[] = $key;
                Cache::put($indexKey, $keys, $ttl);
            }
        }
    }

    /**
     * Retrieve a value by plain key.
     */
    public function get(string $key, $default = null)
    {
        return Cache::get($key, $default);
    }

    /**
     * Forget a value by key or by tag.
     */
    public function forget(string $keyOrTag): void
    {
        $visited = [];
        $toDelete = [];

        $collect = function($key) use (&$collect, &$visited, &$toDelete) {
            if (in_array($key, $visited, true)) return;
            $visited[] = $key;

            $toDelete[] = $key;

            $indexKey = $this->prefix.$key;
            $keys = Cache::get($indexKey, []);
            $toDelete[] = $indexKey;

            foreach ($keys as $k) {
                $collect($k);
            }
        };

        $collect($keyOrTag);

        // Batch deletion
        foreach ($toDelete as $cacheKey) {
            Cache::forget($cacheKey);
        }
    }
}