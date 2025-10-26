<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\CurrentContext;
use Illuminate\Support\Facades\Cache;
use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\InvitationRepository;
use App\Services\DataAccess\CacheKeyFactories\InvitationCacheKeyFactory;

class InvitationRepositoryCache extends RepositoryCache
{

    public function __construct(private InvitationRepository $repository) {
        parent::__construct($repository);
    }


    protected function getSharedTags(): array
    {
        return InvitationCacheKeyFactory::getSharedTags(CurrentContext::structureId());
    }


    protected function getCollectionTag(string|null $structure_id, $filter = null): string
    {
        return InvitationCacheKeyFactory::getCollectionKey($structure_id, $filter);
    }


    protected function getItemTag(string $invitation_id): string
    {
        return InvitationCacheKeyFactory::getItemKey($invitation_id);
    }
    


    public function paginated(array $filter)
    {
        return $this->_paginated(CurrentContext::structureId(), $filter);
    }


    public function find(string $invitation_id)
    {
        return $this->_find($invitation_id);
    }


    public function findByToken(string $structure_id, string $token_value)
    {
        return $this->_findCached(
            InvitationCacheKeyFactory::getItemByTokenKey($structure_id, $token_value),
            function() use($structure_id, $token_value)
            {
                return $this->repository->findByToken($structure_id, $token_value);
            },
        );
    }


    public function findDetail(string $invitation_id)
    {
        return $this->_findDetail($invitation_id);
    }

    public function create(array $data)
    {
        return $this->_create(CurrentContext::structureId(), $data);
    }

    public function update(string $invitation_id, array $data)
    {
        return $this->_update(CurrentContext::structureId(), $invitation_id, $data);
    }

    public function delete(string $invitation_id)
    {
        return $this->_delete(CurrentContext::structureId(), $invitation_id);
    }

}
