<?php

namespace App\Services;

use Closure;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ModelSyncService 
{

    function syncRelatedModels(
        array $data,
        Collection|HasMany $existingModels,
        Closure $createFn,
        Closure $updateFn,
        Closure $deleteFn,
    ) {
        $items = collect($data);
        $existingMap = [];

        // Build a map of existing models by ID
        foreach ($existingModels as $model) {
            if (isset($model['id'])) {
                $existingMap[$model['id']] = $model;
            }
        }

        // Process new and existing models
        foreach ($items as $item) {
            $isNew = !isset($item['id']);

            if ($isNew) {
                $createFn($item);
            } else {
                $id = $item['id'];
                if (isset($existingMap[$id])) {
                    $updateFn($existingMap[$id], $item);
                    unset($existingMap[$id]);
                } else {
                    abort(404);
                }
            }
        }

        // Delete any leftover models that weren’t in the input data
        foreach ($existingMap as $model) {
            $deleteFn($model);
        }
    }
}
