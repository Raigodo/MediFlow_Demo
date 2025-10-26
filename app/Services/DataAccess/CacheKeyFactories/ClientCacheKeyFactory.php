<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class ClientCacheKeyFactory
{
    public static function getSharedTags($structure_id)
    {
        return [
            StructureCacheKeyFactory::getCollectionKey(CurrentContext::userId()),
            StructureCacheKeyFactory::getItemKey($structure_id),
            self::getCollectionKey($structure_id),
        ];
    }
    
    
    public static function getCollectionKey($structure_id, $filter = null): string
    {
        return $filter
            ? 'clients:'.$structure_id.':'.json_encode($filter)
            : 'clients:'.$structure_id;
    }


    public static function getItemKey(string $client_id): string
    {
        return 'client:'.$client_id;
    }


    public static function getItemDetailKey(string $client_id): string
    {
        return self::getItemKey($client_id).':detail';
    }
}
