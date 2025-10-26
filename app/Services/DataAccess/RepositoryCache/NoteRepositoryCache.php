<?php

namespace App\Services\DataAccess\RepositoryCache;

use Illuminate\Support\Carbon;
use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\NoteRepository;
use App\Services\DataAccess\CacheKeyFactories\NoteCacheKeyFactory;

class NoteRepositoryCache extends RepositoryCache
{

    public function __construct(private NoteRepository $repository) {
        parent::__construct($repository);
    }


    //Its super bad, but will work for some time
    //No concurency
    //Tied to selected context
    private $client_id;

    protected function getSharedTags(): array
    {
        return NoteCacheKeyFactory::getSharedTags($this->client_id);
    }


    protected function getCollectionTag(string|null $client_id, $filter = null): string
    {
        return NoteCacheKeyFactory::getCollectionKey($client_id, $filter);
    }


    protected function getItemTag(string $note_id): string
    {
        return NoteCacheKeyFactory::getItemKey($note_id);
    }
    

    public function paginated(string $client_id, array $filter)
    {
        $this->client_id = $client_id;
        return $this->_paginated($client_id, $filter);
    }


    public function find(string $client_id, string $note_id)
    {
        $this->client_id = $client_id;
        return $this->_find($note_id);
    }


    public function findPreview(string $client_id, string $note_id)
    {
        $this->client_id = $client_id;
        return $this->_findCached(
            $this->getItemTag($note_id).':preview',
            function() use($note_id)
            {
                return $this->repository->findPreview($note_id);
            },
            $this->getItemTag($note_id),
        );
    }


    public function findDetail(string $client_id, string $note_id)
    {
        $this->client_id = $client_id;
        return $this->_findDetail($note_id);
    }


    public function todaysDetails(string $client_id, string $creator_id)
    {
        $this->client_id = $client_id;
        return $this->_findCached(
            NoteCacheKeyFactory::getTodaysItemDetailKey($client_id, $creator_id),
            function() use($client_id, $creator_id)
            {
                return $this->repository->todaysDetails($client_id, $creator_id);
            },
        );
    }


    public function create(string $client_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_create($client_id, $data);
    }


    public function make(string $client_id)
    {
        return $this->repository->make($client_id);   
    }


    public function update(string $client_id, string $note_id, array $data)
    {
        $this->client_id = $client_id;
        return $this->_update($client_id, $note_id, $data);
    }


    public function delete(string $client_id, string $note_id)
    {
        $this->client_id = $client_id;
        return $this->_delete($client_id, $note_id);
    }

}
