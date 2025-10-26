<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use Illuminate\Support\Facades\Cache;
use App\Services\DataAccess\Repositories\EmployeeRepository;
use App\Services\DataAccess\CacheKeyFactories\EmployeeCacheKeyFactory;

class EmployeeRepositoryCache extends RepositoryCache
{

    public function __construct(private EmployeeRepository $repository) {
        parent::__construct($repository);
    }

    protected function getSharedTags(): array
    {
        return EmployeeCacheKeyFactory::getSharedTags(CurrentContext::structureId());
    }


    protected function getCollectionTag(string|null $structure_id, $filter = null): string
    {
        return EmployeeCacheKeyFactory::getCollectionKey($structure_id, $filter);
    }


    protected function getItemTag(string $employee_id): string
    {
        return EmployeeCacheKeyFactory::getItemKey($employee_id);
    }
    

    public function paginated(array $filter)
    {
        return $this->_paginated(CurrentContext::structureId(), $filter);
    }

    
    public function all()
    {
        return $this->_findCached(
            $this->getCollectionTag(CurrentContext::structureId(), []),
            function()
            {
                return $this->repository->all(CurrentContext::structureId());
            },
        );
    }


    public function find(string $employee_id)
    {
        return $this->_find($employee_id);
    }


    public function findDetail(string $employee_id)
    {
        return $this->_findDetail($employee_id);
    }

    
    public function findByStructure(string $structure_id, string $user_id)
    {
        return $this->_findCached(
            EmployeeCacheKeyFactory::getItemByStructureKey($structure_id, $user_id),
            function() use($structure_id, $user_id)
            {
                return $this->repository->findByStructure($structure_id, $user_id);
            },
        );
    }


    public function create(array $data)
    {
        return $this->_create(CurrentContext::structureId(), $data);
    }


    public function update(string $employee_id, array $data)
    {
        return $this->_update(CurrentContext::structureId(), $employee_id, $data);
    }


    public function delete(string $employee_id)
    {
        return $this->_delete(CurrentContext::structureId(), $employee_id);
    }
}
