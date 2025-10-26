<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\MedicamentRepository;
use App\Services\DataAccess\CacheKeyFactories\MedicamentCacheKeyFactory;

class MedicamentRepositoryCache extends RepositoryCache
{

    public function __construct(private MedicamentRepository $repository) {
        parent::__construct($repository);
    }


    protected function getSharedTags(): array
    {
        return MedicamentCacheKeyFactory::getSharedTags(CurrentContext::structureId());
    }


    protected function getCollectionTag(string|null $structure_id, $filter = null): string
    {
        return MedicamentCacheKeyFactory::getCollectionKey($structure_id, $filter);
    }


    protected function getItemTag(string $medicament_id): string
    {
        return MedicamentCacheKeyFactory::getItemKey($medicament_id);
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


    public function find(string $medicament_id)
    {
        return $this->_find($medicament_id);
    }


    public function findByType(string $medicament_type_id)
    {
        return $this->_findCached(
            MedicamentCacheKeyFactory::getItemByTypeKey(CurrentContext::structureId(), $medicament_type_id),
            function() use($medicament_type_id)
            {
                return $this->repository->findByType($medicament_type_id, CurrentContext::structureId());
            },
        );
    }


    public function findDetail(string $medicament_id)
    {
        return $this->_findDetail($medicament_id);
    }

    public function findDetailByType(string $medicament_type_id)
    {
        return $this->_findCached(
            MedicamentCacheKeyFactory::getItemDetailByTypeKey(CurrentContext::structureId(), $medicament_type_id),
            function() use($medicament_type_id)
            {
                return $this->repository->findDetailByType($medicament_type_id, CurrentContext::structureId());
            },
        );
    }

    public function create(array $data)
    {
        return $this->_create(CurrentContext::structureId(), $data);
    }

    public function update(string $medicament_id, array $data)
    {
        return $this->_update(CurrentContext::structureId(), $medicament_id, $data);
    }

    public function delete(string $medicament_id)
    {
        return $this->_delete(CurrentContext::structureId(), $medicament_id);
    }

}
