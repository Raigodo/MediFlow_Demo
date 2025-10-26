<?php

namespace App\Services\DataAccess\CacheKeyFactories;


class MedicamentTypeCacheKeyFactory
{
    public static function getSharedTags()
    {
        return [
            self::getCollectionKey(),
        ];
    }
    

    public static function getCollectionKey($filter = null): string
    {
        return $filter
            ? 'medicament-types:'.json_encode($filter)
            : 'medicament-types';
    }


    public static function getItemKey(string $medicament_type_id): string
    {
        return 'medicament-type:'.$medicament_type_id;
    }


    public static function getItemDetailKey(string $medicament_type_id): string
    {
        return self::getItemKey($medicament_type_id).':detail';
    }
}
