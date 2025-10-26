<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\MedicationRepository;
use App\Services\DataAccess\CacheKeyFactories\MedicationCacheKeyFactory;
use App\Services\DataAccess\CacheKeyFactories\NoteCacheKeyFactory;

class MedicationRepositoryCache extends RepositoryCache
{

    public function __construct(private MedicationRepository $repository) {
        parent::__construct($repository);
    }


    //Its super bad, but will work for some time
    //No concurency
    //Tied to selected context
    private $client_id;

    protected function getSharedTags(): array
    {
        return MedicationCacheKeyFactory::getSharedTags($this->client_id);
    }


    protected function getCollectionTag(string|null $client_id, $filter = null): string
    {
        return MedicationCacheKeyFactory::getCollectionKey($client_id, $filter);
    }


    protected function getItemTag(string $medication_id): string
    {
        return MedicationCacheKeyFactory::getItemKey($medication_id);
    }
    


    public function paginated(string $client_id, array $filter)
    {
        $this->client_id = $client_id;
        return $this->_paginated($client_id, $filter);
    }


    public function related(string $client_id, $note_id)
    {
        $this->client_id = $client_id;
        return $this->_findCached(
            NoteCacheKeyFactory::getRelatedCollectionKey($client_id, $note_id),
            function() use($note_id)
            {
                return $this->repository->related($note_id);
            },
        );
    }


    public function find(string $client_id, string $medication_id)
    {
        $this->client_id = $client_id;
        return $this->_find($medication_id);
    }


    public function findDetail(string $client_id, string $medication_id)
    {
        $this->client_id = $client_id;
        return $this->_findDetail($medication_id);
    }

    public function create(string $client_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_create($client_id, $data);
    }

    public function update(string $client_id, string $medication_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_update($client_id, $medication_id, $data);
    }

    public function delete(string $client_id, string $medication_id)
    {
        $this->client_id = $client_id;
        return $this->_delete($client_id, $medication_id);
    }

}
