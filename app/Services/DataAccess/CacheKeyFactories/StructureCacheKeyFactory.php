<?php

namespace App\Services\DataAccess\CacheKeyFactories;


class StructureCacheKeyFactory
{
    public static function getSharedTags($user_id)
    {
        return [
            self::getCollectionKey($user_id),
        ];
    }
    
    
    public static function getCollectionKey($user_id, $filter = null): string
    {
        return $filter
            ? 'structures:'.$user_id.':'.json_encode($filter)
            : 'structures:'.$user_id;
    }

    
    public static function getManagedCollectionKey($user_id): string
    {
        return 'structures:'.$user_id.':'.json_encode([
            'managed'=> true,
            'employed'=> false,
        ]);
    }

    
    public static function getEmployedCollectionKey($user_id): string
    {
        return 'structures:'.$user_id.':'.json_encode([
            'managed'=> false,
            'employed'=> true,
        ]);
    }

    
    public static function getParticipatingCollectionKey($user_id): string
    {
        return 'structures:'.$user_id.':'.json_encode([
            'managed'=> true,
            'employed'=> true,
        ]);
    }


    public static function getItemKey(string $structure_id): string
    {
        return 'structure:'.$structure_id;
    }


    public static function getItemDetailKey(string $structure_id): string
    {
        return self::getItemKey($structure_id).':detail';
    }
}
