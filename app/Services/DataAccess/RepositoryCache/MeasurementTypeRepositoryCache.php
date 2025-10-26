<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\DataAccess\CacheKeyFactories\MeasurementTypeCacheKeyFactory;
use App\Services\DataAccess\Repositories\MeasurementTypeRepository;

class MeasurementTypeRepositoryCache extends RepositoryCache
{

    public function __construct(private MeasurementTypeRepository $repository) {
        parent::__construct($repository);
    }


    protected function getSharedTags(): array
    {
        return MeasurementTypeCacheKeyFactory::getSharedTags();
    }


    protected function getCollectionTag(string|null $super_id, $filter = null): string
    {
        return MeasurementTypeCacheKeyFactory::getCollectionKey($filter);
    }


    protected function getItemTag(string $measurement_type_id): string
    {
        return MeasurementTypeCacheKeyFactory::getItemKey($measurement_type_id);
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


    public function find(string $measurement_type_id)
    {
        return $this->_find($measurement_type_id);
    }


    public function findDetail(string $measurement_type_id)
    {
        return $this->_findDetail($measurement_type_id);
    }


    public function create(array $data)
    {
        return $this->_create(null, $data);
    }


    public function update(string $measurement_type_id, array $data)
    {
        return $this->_update(null, $measurement_type_id, $data);
    }


    public function delete(string $measurement_type_id)
    {
        return $this->_delete(null, $measurement_type_id);
    }
}
