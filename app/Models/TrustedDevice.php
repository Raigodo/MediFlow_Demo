<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrustedDevice extends Model
{
    /** @use HasFactory<\Database\Factories\StructureFactory> */
    use HasFactory, HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'token_value',
        'note',
        'last_used_at',
        'last_employee_id',
        'structure_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        //
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            //
        ];
    }

    /**
     * Get structure invitation belongs to.
     */
    public function last_employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'last_employee_id',);
    }

    /**
     * Get structure invitation belongs to.
     */
    public function structure(): BelongsTo
    {
        return $this->belongsTo(Structure::class);
    }

}
