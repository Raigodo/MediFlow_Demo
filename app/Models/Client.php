<?php

namespace App\Models;

use App\Casts\EncryptedEnum;
use App\Enums\InvalidityType;
use App\Enums\InvalidityGroup;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'icon_key',
        'birth_date',
        'personal_code',
        'language',
        'religion',
        'weight',
        'height',
        'invalidity_group',
        'invalidity_type',
        'invalidity_expires_on',
        'joined_on',
        'archived_on',
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
            'name' => 'encrypted',
            'surname' => 'encrypted',
            'birth_date' => 'encrypted',
            'personal_code' => 'encrypted',
            'religion' => 'encrypted',
            'weight' => 'encrypted',
            'height' => 'encrypted',
            'invalidity_group' => EncryptedEnum::class.':'.InvalidityGroup::class,
            'invalidity_type' => EncryptedEnum::class.':'.InvalidityType::class,
            'invalidity_expires_on' => 'encrypted',
        ];
    }

    public function getIconUrlAttribute(): string
    {
        return Storage::temporaryUrl(
            'clients/icons/'.$this->icon_key,
            now()->addMinutes(15),
        );
    }


    public function structure(): BelongsTo
    {
        return $this->belongsTo(Structure::class);
    }


    public function contacts(): HasMany
    {
        return $this->hasMany(ClientContact::class);
    }


    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
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
