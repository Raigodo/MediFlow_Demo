<?php

namespace App\Services\DataAccess\CacheKeyFactories;

use App\Services\CurrentContext;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;


class EmployeeCacheKeyFactory
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
            ? 'employees:'.$structure_id.':'.json_encode($filter)
            : 'employees:'.$structure_id;
    }


    public static function getItemKey(string $employee_id): string
    {
        return 'employee:'.$employee_id;
    }


    public static function getItemByStructureKey($structure_id, $user_id): string
    {
        return 'employee:'.json_encode([
            'structure'=> $structure_id,
            'user'=> $user_id,
        ]);
    }


    public static function getItemDetailKey(string $employee_id): string
    {
        return self::getItemKey($employee_id).':detail';
    }
}
