<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\MeasurementRepository;
use App\Services\DataAccess\CacheKeyFactories\MeasurementCacheKeyFactory;

class MeasurementRepositoryCache extends RepositoryCache
{

    public function __construct(private MeasurementRepository $repository) {
        parent::__construct($repository);
    }


    //Its super bad, but will work for some time
    //No concurency
    //Tied to selected context
    private $client_id;

    protected function getSharedTags(): array
    {
        return MeasurementCacheKeyFactory::getSharedTags($this->client_id);
    }


    protected function getCollectionTag(string|null $client_id, $filter = null): string
    {
        return MeasurementCacheKeyFactory::getCollectionKey($client_id, $filter);
    }


    protected function getItemTag(string $measurement_id): string
    {
        return MeasurementCacheKeyFactory::getItemKey($measurement_id);
    }
    


    public function paginated(string $client_id, array $filter)
    {
        $this->client_id = $client_id;
        return $this->_paginated($client_id, $filter);
    }


    public function find(string $client_id, string $measurement_id)
    {
        $this->client_id = $client_id;
        return $this->_find($measurement_id);
    }


    public function findDetail(string $client_id, string $measurement_id)
    {
        $this->client_id = $client_id;
        return $this->_findDetail($measurement_id);
    }

    public function create(string $client_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_create($client_id, $data);
    }

    public function update(string $client_id, string $measurement_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_update($client_id, $measurement_id, $data);
    }

    public function delete(string $client_id, string $measurement_id)
    {
        $this->client_id = $client_id;
        return $this->_delete($client_id, $measurement_id);
    }

}
