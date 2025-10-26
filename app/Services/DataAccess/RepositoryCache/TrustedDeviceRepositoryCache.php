<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use Illuminate\Support\Facades\Cache;
use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\TrustedDeviceRepository;
use App\Services\DataAccess\CacheKeyFactories\TrustedDeviceCacheKeyFactory;

class TrustedDeviceRepositoryCache extends RepositoryCache
{

    public function __construct(private TrustedDeviceRepository $repository) {
        parent::__construct($repository);
    }


    protected function getSharedTags(): array
    {
        return TrustedDeviceCacheKeyFactory::getSharedTags(CurrentContext::structureId());
    }


    protected function getCollectionTag(string|null $structure_id, $filter = null): string
    {
        return TrustedDeviceCacheKeyFactory::getCollectionKey($structure_id, $filter);
    }


    protected function getItemTag(string $trusted_device_id): string
    {
        return TrustedDeviceCacheKeyFactory::getItemKey($trusted_device_id);
    }
    

    public function paginated(array $filter)
    {
        return $this->_paginated(CurrentContext::structureId(), $filter);
    }


    public function find(string $trusted_device_id)
    {
        return $this->_find($trusted_device_id);
    }


    public function findByToken(string $token_value)
    {
        return $this->_findLocallyCached(
            TrustedDeviceCacheKeyFactory::getItemByTokenKey($token_value),
            function() use($token_value)
            {
                return $this->repository->findByToken($token_value);
            },
        );
    }


    public function findDetail(string $trusted_device_id)
    {
        return $this->_findDetail($trusted_device_id);
    }


    public function create(array $data)
    {
        return $this->_create(CurrentContext::structureId(), $data);
    }


    public function update(string $trusted_device_id, array $data)
    {
        return $this->_update(CurrentContext::structureId(), $trusted_device_id, $data);
    }

    public function delete(string $trusted_device_id)
    {
        return $this->_delete(CurrentContext::structureId(), $trusted_device_id);
    }

}
