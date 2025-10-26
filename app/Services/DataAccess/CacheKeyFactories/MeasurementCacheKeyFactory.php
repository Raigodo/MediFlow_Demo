<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\ClientCacheKeyFactory;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class MeasurementCacheKeyFactory
{
    public static function getSharedTags($client_id)
    {
        return [
            StructureCacheKeyFactory::getCollectionKey(CurrentContext::userId()),
            StructureCacheKeyFactory::getItemKey(CurrentContext::structureId()),
            ClientCacheKeyFactory::getCollectionKey(CurrentContext::structureId()),
            ClientCacheKeyFactory::getItemKey($client_id),
            self::getCollectionKey($client_id),
        ];
    }
    
    
    public static function getCollectionKey($client_id, $filter = null): string
    {
        return $filter
            ? 'measurements:'.$client_id.':'.json_encode($filter)
            : 'measurements:'.$client_id;
    }


    public static function getItemKey(string $measurement_id): string
    {
        return 'measurement:'.$measurement_id;
    }


    public static function getItemDetailKey(string $measurement_id): string
    {
        return self::getItemKey($measurement_id).':detail';
    }
}
