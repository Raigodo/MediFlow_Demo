<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Note extends Model
{
    /** @use HasFactory<\Database\Factories\NoteFactory> */
    use HasFactory, HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'content',
        'is_important',
        'creator_id',
        'client_id',
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
            'content' => 'encrypted',
        ];
    }

    /**
     * Get Creator (Employee) of this note.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get Client that this note refers to.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }


    public function ambulance_calls(): HasMany
    {
        return $this->hasMany(AmbulanceCall::class);
    }


    public function diagnoses(): HasMany
    {
        return $this->hasMany(Diagnose::class);
    }


    public function measurements(): HasMany
    {
        return $this->hasMany(Measurement::class);
    }


    public function medications(): HasMany
    {
        return $this->hasMany(Medication::class);
    }

}
