<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\ClientCacheKeyFactory;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class MedicationCacheKeyFactory
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
            ? 'medications:'.$client_id.':'.json_encode($filter)
            : 'medications:'.$client_id;
    }


    public static function getRelatedCollectionKey($client_id, $note_id): string
    {
        return self::getCollectionKey($client_id, [
            'note'=> $note_id,
        ]);
    }


    public static function getItemKey(string $medication_id): string
    {
        return 'medication:'.$medication_id;
    }


    public static function getItemDetailKey(string $medication_id): string
    {
        return self::getItemKey($medication_id).':detail';
    }
}
