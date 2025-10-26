<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use Illuminate\Support\Facades\Cache;
use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\StructureRepository;
use App\Services\DataAccess\CacheKeyFactories\StructureCacheKeyFactory;

class StructureRepositoryCache extends RepositoryCache
{

    public function __construct(private StructureRepository $repository) {
        parent::__construct($repository);
    }


    public function invalidateAll($user_id){
        Cache::tags($this->getCollectionTag( $user_id))->flush();
    }


    public function invalidate($structure_id){
        Cache::tags($this->getItemTag($structure_id))->flush();
    }


    protected function getSharedTags(): array
    {
        return StructureCacheKeyFactory::getSharedTags(CurrentContext::structureId());
    }


    protected function getCollectionTag(string|null $user_id, $filter = null): string
    {
        return StructureCacheKeyFactory::getCollectionKey($user_id, $filter);
    }


    protected function getItemTag(string $structure_id): string
    {
        return StructureCacheKeyFactory::getItemKey($structure_id);
    }
    


    public function paginated(string $user_id, array $filter)
    {
        return $this->_paginated($user_id, $filter);
    }

    
    public function managed(string $user_id)
    {
        return $this->_findCached(
            StructureCacheKeyFactory::getManagedCollectionKey($user_id),
            function() use($user_id)
            {
                return $this->repository->managed($user_id);
            },
        );
    }

    
    public function employed(string $user_id)
    {
        return $this->_findCached(
            StructureCacheKeyFactory::getEmployedCollectionKey($user_id),
            function() use($user_id)
            {
                return $this->repository->employed($user_id);
            },
        );
    }


    public function participating(string $user_id)
    {
        return $this->_findCached(
            StructureCacheKeyFactory::getParticipatingCollectionKey($user_id),
            function() use($user_id)
            {
                return $this->repository->participating($user_id);
            },
        );
    }


    public function find(string $structure_id)
    {
        return $this->_find($structure_id);
    }
    

    public function default(string $user_id)
    {
        return $this->repository->default($user_id);
    }
    

    public function defaultPreview(string $user_id)
    {
        return $this->repository->defaultPreview($user_id);
    }
    

    public function current()
    {
        return $this->find(CurrentContext::structureId());
    }


    public function findDetail(string $structure_id)
    {
        return $this->_findDetail($structure_id);
    }

    public function create(string $user_id, array $data)
    {
        return $this->_create($user_id, $data);
    }

    public function update(string $user_id, string $structure_id, array $data)
    {
        return $this->_update($user_id, $structure_id, $data);
    }

    public function delete(string $user_id, string $structure_id)
    {
        return $this->_delete($user_id, $structure_id);
    }

}
