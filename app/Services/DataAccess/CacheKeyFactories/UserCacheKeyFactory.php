<?php

namespace App\Services\DataAccess\CacheKeyFactories;


class UserCacheKeyFactory
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
            ? 'users:'.json_encode($filter)
            : 'users';
    }


    public static function getItemKey(string $user_id): string
    {
        return 'user:'.$user_id;
    }


    public static function getItemDetailKey(string $user_id): string
    {
        return self::getItemKey($user_id).':detail';
    }
}
