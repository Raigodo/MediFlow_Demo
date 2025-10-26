<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;


class MedicamentManagerCacheKeyFactory
{
    public static function getSharedTags()
    {
        return [
            StructureCacheKeyFactory::getCollectionKey(CurrentContext::userId()),
            StructureCacheKeyFactory::getItemKey(CurrentContext::structureId()),
            self::getCollectionKey(CurrentContext::structureId()),
        ];
    }
    

    public static function getCollectionKey($structure_id, $filter = null): string
    {
        return $filter
            ? 'medicament-managers:'.$structure_id.':'.json_encode($filter)
            : 'medicament-managers:'.$structure_id;
    }


    public static function getItemKey(string $medicament_type_id): string
    {
        return 'medicament-manager:'.$medicament_type_id;
    }


    public static function getItemDetailKey(string $medicament_type_id): string
    {
        return self::getItemKey($medicament_type_id).':detail';
    }
}
