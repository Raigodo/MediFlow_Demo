<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Medication extends Model
{
    /** @use HasFactory<\Database\Factories\MedicationFactory> */
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
        'medicament_type_id',
        'amount',
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
    
    public function medicament(): HasOne
    {
        return $this->hasOne(Medicament::class, 'medicament_type_id', 'medicament_type_id');
    }


    public function medicament_type(): BelongsTo
    {
        return $this->belongsTo(MedicamentType::class);
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
