<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\ClientCacheKeyFactory;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class AmbulanceCallCacheKeyFactory
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
            ? 'ambulance-calls:'.$client_id.':'.json_encode($filter)
            : 'ambulance-calls:'.$client_id;
    }


    public static function getItemKey(string $ambulance_call_id): string
    {
        return 'ambulance-call:'.$ambulance_call_id;
    }


    public static function getItemDetailKey(string $ambulance_call_id): string
    {
        return self::getItemKey($ambulance_call_id).':detail';
    }
}
