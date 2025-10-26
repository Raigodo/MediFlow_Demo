<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use App\Services\DataAccess\Repositories\DiagnoseRepository;
use App\Services\DataAccess\CacheKeyFactories\DiagnoseCacheKeyFactory;

class DiagnoseRepositoryCache extends RepositoryCache
{

    public function __construct(private DiagnoseRepository $repository) {
        parent::__construct($repository);
    }


    //Its super bad, but will work for some time
    //No concurency
    //Tied to selected context
    private $client_id;

    protected function getSharedTags(): array
    {
        return DiagnoseCacheKeyFactory::getSharedTags($this->client_id);
    }


    protected function getCollectionTag(string|null $client_id, $filter = null): string
    {
        return DiagnoseCacheKeyFactory::getCollectionKey($client_id, $filter);
    }


    protected function getItemTag(string $diagnose_id): string
    {
        return DiagnoseCacheKeyFactory::getItemKey($diagnose_id);
    }
    


    public function paginated(string $client_id, array $filter)
    {
        $this->client_id = $client_id;
        return $this->_paginated($client_id, $filter);
    }


    public function find(string $client_id, string $diagnose_id)
    {
        $this->client_id = $client_id;
        return $this->_find($diagnose_id);
    }


    public function findDetail(string $client_id, string $diagnose_id)
    {
        $this->client_id = $client_id;
        return $this->_findDetail($diagnose_id);
    }

    public function create(string $client_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_create($client_id, $data);
    }

    public function update(string $client_id, string $diagnose_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_update($client_id, $diagnose_id, $data);
    }

    public function delete(string $client_id, string $diagnose_id)
    {
        $this->client_id = $client_id;
        return $this->_delete($client_id, $diagnose_id);
    }
}
