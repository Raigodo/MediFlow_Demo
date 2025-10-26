<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class TrustedDeviceCacheKeyFactory
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
            ? 'trusted-devices:'.$structure_id.':'.json_encode($filter)
            : 'trusted-devices:'.$structure_id;
    }


    public static function getItemKey(string $trusted_device_id): string
    {
        return 'trusted-device:'.$trusted_device_id;
    }


    public static function getItemByTokenKey($token_value): string
    {
        return 'invitation:'.json_encode([
            'token_value'=> $token_value,
        ]);
    }


    public static function getItemDetailKey(string $trusted_device_id): string
    {
        return self::getItemKey($trusted_device_id).':detail';
    }
}
