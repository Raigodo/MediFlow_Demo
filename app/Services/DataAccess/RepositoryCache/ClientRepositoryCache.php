<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use Illuminate\Support\Facades\Cache;
use App\Services\DataAccess\Repositories\ClientRepository;
use App\Services\DataAccess\CacheKeyFactories\ClientCacheKeyFactory;

class ClientRepositoryCache extends RepositoryCache
{

    public function __construct(private ClientRepository $repository) {
        parent::__construct($repository);
    }


    public function invalidateAll($structure_id){
        Cache::tags($this->getCollectionTag( $structure_id))->flush();
    }


    public function invalidate($client_id){
        Cache::tags($this->getItemTag($client_id))->flush();
    }


    protected function getSharedTags(): array
    {
        return ClientCacheKeyFactory::getSharedTags(CurrentContext::structureId());
    }


    protected function getCollectionTag($structure_id, $filter = null): string
    {
        return ClientCacheKeyFactory::getCollectionKey($structure_id, $filter);
    }


    protected function getItemTag($client_id): string
    {
        return ClientCacheKeyFactory::getItemKey($client_id);
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


    public function find(string $client_id)
    {
        return $this->_find($client_id);
    }


    public function findDetail(string $client_id)
    {
        return $this->_findDetail($client_id);
    }

    public function create(array $data)
    {
        return $this->_create(CurrentContext::structureId(), $data);
    }

    public function update(string $client_id, array $data)
    {
        return $this->_update(CurrentContext::structureId(), $client_id, $data);
    }

    public function delete(string $client_id)
    {
        return $this->_delete(CurrentContext::structureId(), $client_id);
    }
}
