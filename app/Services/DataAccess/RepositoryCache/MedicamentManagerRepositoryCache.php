<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\DataAccess\RepositoryCache\RepositoryCache;
use App\Services\DataAccess\Repositories\MedicamentManagerRepository;
use App\Services\DataAccess\CacheKeyFactories\MedicamentManagerCacheKeyFactory;

class MedicamentManagerRepositoryCache  extends RepositoryCache
{

    public function __construct(private MedicamentManagerRepository $repository) {
        parent::__construct($repository);
    }


    protected function getSharedTags(): array
    {
        return MedicamentManagerCacheKeyFactory::getSharedTags();
    }


    protected function getCollectionTag(string|null $structure_id, $filter = null): string
    {
        return MedicamentManagerCacheKeyFactory::getCollectionKey($structure_id, $filter);
    }


    protected function getItemTag(string $employee_id): string
    {
        return MedicamentManagerCacheKeyFactory::getItemKey($employee_id);
    }
    

    public function all(string $structure_id)
    {
        return $this->_findCached(
            $this->getCollectionTag(null),
            function() use($structure_id)
            {
                return $this->repository->all($structure_id);
            },
        );
    }


    public function find(string $employee_id)
    {
        return $this->_find($employee_id);
    }


    public function create(string $structure_id, array $data)
    {
        return $this->_create($structure_id, $data);
    }


    public function delete(string $structure_id, string $employee_id)
    {
        return $this->_delete($structure_id, $employee_id);
    }
}