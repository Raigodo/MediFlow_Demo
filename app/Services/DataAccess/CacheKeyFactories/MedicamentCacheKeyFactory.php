<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class MedicamentCacheKeyFactory
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
            ? 'medicaments:'.$structure_id.':'.json_encode($filter)
            : 'medicaments:'.$structure_id;
    }


    public static function getItemKey(string $medicament_id): string
    {
        return 'medicament:'.$medicament_id;
    }


    public static function getItemByTypeKey($structure_id, string $medicament_type_id): string
    {
        return 'medicament:'.json_encode([
            'structure'=> $structure_id,
            'medicament_type'=> $medicament_type_id,
        ]);
    }


    public static function getItemDetailKey(string $medicament_id): string
    {
        return self::getItemKey($medicament_id).':detail';
    }


    public static function getItemDetailByTypeKey($structure_id, string $medicament_type_id): string
    {
        return 'medicament:'.json_encode([
            'structure'=> $structure_id,
            'medicament_type'=> $medicament_type_id,
        ]).':detail';
    }
}
