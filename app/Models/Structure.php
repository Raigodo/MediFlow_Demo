<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Structure extends Model
{
    /** @use HasFactory<\Database\Factories\StructureFactory> */
    use HasFactory, HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'icon_key',
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
        ];
    }

    
    public function getIconUrlAttribute(): string
    {
        return Storage::temporaryUrl(
            'structures/icons/'.$this->icon_key,
            now()->addMinutes(15),
        );
    }


    public function trusted_devices(): HasMany
    {
        return $this->hasMany(TrustedDevice::class);
    }


    public function medicaments(): HasMany
    {
        return $this->hasMany(Medicament::class);
    }


    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    
    public function invitations(): HasMany
    {
        return $this->hasMany(Invitation::class);
    }

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }

    public function managers(): HasMany
    {
        return $this->hasMany(Manager::class);
    }
    
    public function medicament_manager(): HasOne
    {
        return $this->hasOne(MedicamentManager::class);
    }

}
