<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class InvitationCacheKeyFactory
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
            ? 'invitations:'.$structure_id.':'.json_encode($filter)
            : 'invitations:'.$structure_id;
    }


    public static function getItemKey(string $invitation_id): string
    {
        return 'invitation:'.$invitation_id;
    }


    public static function getItemByTokenKey($structure_id, $token_value): string
    {
        return 'invitation:'.json_encode([
            'structure'=> $structure_id,
            'token_value'=> $token_value,
        ]);
    }


    public static function getItemDetailKey(string $invitation_id): string
    {
        return self::getItemKey($invitation_id).':detail';
    }
}
