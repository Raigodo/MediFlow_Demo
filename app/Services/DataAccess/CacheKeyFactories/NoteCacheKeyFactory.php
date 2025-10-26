<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use Illuminate\Support\Carbon;
use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\ClientCacheKeyFactory;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class NoteCacheKeyFactory
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
            ? 'notes:'.$client_id.':'.json_encode($filter)
            : 'notes:'.$client_id;
    }


    public static function getRelatedCollectionKey($client_id, $note_id): string
    {
        return self::getCollectionKey($client_id, [
            'note'=> $note_id,
        ]);
    }


    public static function getItemKey(string $note_id): string
    {
        return 'note:'.$note_id;
    }


    public static function getItemPreviewTag(string $note_id): string
    {
        return self::getItemKey($note_id).':preview';
    }


    public static function getItemDetailKey(string $note_id): string
    {
        return self::getItemKey($note_id).':detail';
    }


    public static function getTodaysItemDetailKey($client_id, $creator_id): string
    {
        return 'note:'.json_encode([
            'client'=> $client_id,
            'creator'=> $creator_id,
            'date'=> Carbon::today(),
        ]).':detail';
    }
}
