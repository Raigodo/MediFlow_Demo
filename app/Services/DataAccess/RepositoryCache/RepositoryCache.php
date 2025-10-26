<?php

namespace App\Services\DataAccess\RepositoryCache;

use App\Services\TaggedCache;
use Illuminate\Support\Facades\Cache;

abstract class RepositoryCache
{

    public function __construct(private $repository) {
        $this->cache = new TaggedCache();
    }


    abstract protected function getSharedTags():array;

    abstract protected function getCollectionTag(string|null $super_id, $filter = null):string;

    abstract protected function getItemTag(string $id):string;

    private $local_cache = [];

    protected $cache;


    protected function _findLocallyCached(
        string $key,
        $fetchCallback,
    )
    {
        if (array_key_exists($key, $this->local_cache)) {
            return $this->local_cache[$key];
        }

        $value = $fetchCallback();
        if ($value) {
            $this->local_cache[$key] = $value;
        }

        return $value;
    }


    protected function _findCached(
        string $key,
        $fetchCallback,
        string|array|null $tags = null,
    )
    {
        if (array_key_exists($key, $this->local_cache)) {
            return $this->local_cache[$key];
        }

        $final_tags = array_merge($this->getSharedTags(), (array)$tags);
        $value = Cache::tags($final_tags)->get($key);
        if ($value) {
            $this->local_cache[$key] = $value;
            return $value;
        }
        
        $value = $fetchCallback();
        if (!$value) {
            return $value;
        }

        $this->local_cache[$key] = $value;
        Cache::tags($final_tags)
            ->put(
                $key,
                $value,
                3600,
            );

        return $value;
    }



    protected function _paginated(string|null $super_id, array $filter)
    {
        return $this->_findCached(
            $this->getCollectionTag($super_id, $filter),
            function() use($super_id, $filter)
            {
                if ($super_id)
                    return $this->repository->paginated($super_id, $filter);
                return $this->repository->paginated($filter);
            },
        );
    }


    protected function _find(string $id)
    {
        return $this->_findCached(
            $this->getItemTag($id),
            function() use($id)
            {
                return $this->repository->find($id);
            },
        );
    }


    protected function _findDetail(string $id)
    {
        return $this->_findCached(
            $this->getItemTag($id).':detail',
            function() use($id)
            {
                return $this->repository->findDetail($id);
            },
            $this->getItemTag($id),
        );
    }


    protected function _create(string|null $super_id, array $data)
    {
        Cache::tags($this->getCollectionTag($super_id))->flush();
        return $this->repository->create($data);
    }


    protected function _update(string|null $super_id, string $id, array $data)
    {
        $this->local_cache = [];
        Cache::tags($this->getCollectionTag($super_id))->flush();
        return $this->repository->update($id, $data);
    }

    protected function _delete(string|null $super_id, string $id)
    {
        $this->local_cache = [];
        Cache::tags($this->getCollectionTag($super_id))->flush();
        return $this->repository->delete($id);
    }
}
