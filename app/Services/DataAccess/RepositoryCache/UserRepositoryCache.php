<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use Illuminate\Support\Facades\Cache;
use App\Services\DataAccess\Repositories\UserRepository;
use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\CacheKeyFactories\UserCacheKeyFactory;

class UserRepositoryCache extends RepositoryCache
{

    public function __construct(private UserRepository $repository) {
        parent::__construct($repository);
    }


    public function invalidateAll(){
        Cache::tags($this->getCollectionTag( null))->flush();
    }


    public function invalidate(string $user_id){
        Cache::tags($this->getItemTag($user_id))->flush();
    }


    protected function getSharedTags(): array
    {
        return UserCacheKeyFactory::getSharedTags();
    }


    protected function getCollectionTag(string|null $super_id, $filter = null): string
    {
        return UserCacheKeyFactory::getCollectionKey($filter);
    }


    protected function getItemTag(string $user_id): string
    {
        return UserCacheKeyFactory::getItemKey($user_id);
    }


    public function paginated(array $filter)
    {
        return $this->_paginated(null, $filter);
    }


    public function find(string $user_id)
    {
        return $this->_find($user_id);
    }


    public function findDetail(string $user_id)
    {
        return $this->_findDetail($user_id);
    }


    public function create(array $data)
    {
        return $this->_create(null, $data);
    }


    public function update(string $user_id, array $data)
    {
        return $this->_update(null, $user_id, $data);
    }


    public function delete(string $user_id)
    {
        return $this->_delete(null, $user_id);
    }

}
