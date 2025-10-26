<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\DataAccess\CacheKeyFactories\MedicamentTypeCacheKeyFactory;
use App\Services\DataAccess\Repositories\MedicamentTypeRepository;

class MedicamentTypeRepositoryCache extends RepositoryCache
{

    public function __construct(private MedicamentTypeRepository $repository) {
        parent::__construct($repository);
    }


    protected function getSharedTags(): array
    {
        return MedicamentTypeCacheKeyFactory::getSharedTags();
    }


    protected function getCollectionTag(string|null $super_id, $filter = null): string
    {
        return MedicamentTypeCacheKeyFactory::getCollectionKey($filter);
    }


    protected function getItemTag(string $medicament_type_id): string
    {
        return MedicamentTypeCacheKeyFactory::getItemKey($medicament_type_id);
    }
    


    public function paginated(array $filter)
    {
        return $this->_paginated(null, $filter);
    }

    
    public function all()
    {
        return $this->_findCached(
            $this->getCollectionTag(null),
            function()
            {
                return $this->repository->all();
            },
        );
    }


    public function find(string $medicament_type_id)
    {
        return $this->_find($medicament_type_id);
    }


    public function findDetail(string $medicament_type_id)
    {
        return $this->_findDetail($medicament_type_id);
    }

    public function create(array $data)
    {
        return $this->_create(null, $data);
    }

    public function update(string $medicament_type_id, array $data)
    {
        return $this->_update(null, $medicament_type_id, $data);
    }

    public function delete(string $medicament_type_id)
    {
        return $this->_delete(null, $medicament_type_id);
    }
}
