<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Measurement extends Model
{
    /** @use HasFactory<\Database\Factories\MeasurementFactory> */
    use HasFactory, HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'client_id',
        'creator_id',
        'note_id',
        'measurement_type_id',
        'value',
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

    
    public function note(): BelongsTo
    {
        return $this->belongsTo(Note::class);
    }
    

    public function measurement_type(): BelongsTo
    {
        return $this->belongsTo(MeasurementType::class);
    }

    
    public function creator(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }


    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

}
