<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\Client\ClientPreviewResource;
use App\Http\Resources\User\Base\UsersActionsResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserPreviewPagination extends ResourceCollection
{

    public function __construct(
        protected LengthAwarePaginator $paginator,
        protected array $filter
    ) {
        parent::__construct([
            'paginator'=> $paginator,
            'filter'=> $filter,
        ]);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->paginator->getCollection()
            ->transform(fn($item)
                => (new UserPreviewResource($item))
            );
        
        $paginated = $this->paginator->toArray();

        return [
            'filter'=> $this->filter,
            'collection'=> [
                'data'=> $paginated["data"],
                'actions'=> new UsersActionsResource(),
            ],
            'currentPage'=> $paginated['current_page'],
            'lastPage'=> $paginated['last_page'],
            'path'=> $paginated['path'],
            'firstPageUrl'=> $paginated['first_page_url'],
            'lastPageUrl'=> $paginated['first_page_url'],
            'nextPageUrl'=> $paginated['next_page_url'],
            'prevPageUrl'=> $paginated['prev_page_url'],
            'links'=> $paginated['links'],
            'from'=> $paginated['from'],
            'to'=> $paginated['to'],
            'perPage'=> $paginated['per_page'],
            'total'=> $paginated['total'],
        ];
    }
}
