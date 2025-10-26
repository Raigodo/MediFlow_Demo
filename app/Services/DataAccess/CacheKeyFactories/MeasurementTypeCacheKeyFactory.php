<?php

namespace App\Services\DataAccess\CacheKeyFactories;


class MeasurementTypeCacheKeyFactory
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
            ? 'measurement-types:'.json_encode($filter)
            : 'measurement-types';
    }


    public static function getItemKey(string $measurement_type_id): string
    {
        return 'measurement-type:'.$measurement_type_id;
    }


    public static function getItemDetailKey(string $measurement_type_id): string
    {
        return self::getItemKey($measurement_type_id).':detail';
    }
}
