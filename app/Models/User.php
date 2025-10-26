<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use App\Models\Structure;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'role',
        'password',
        'icon_key',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'role' => UserRole::class,
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function getIconUrlAttribute(): string
    {
        return Storage::temporaryUrl(
            'users/icons/'.$this->icon_key,
            now()->addMinutes(15),
        );
    }


    public function default_structure(): HasOne
    {
        return $this->hasOne(DefaultStructure::class);
    }

    /**
     * Get all Structures this User manages.
     */
    public function managed_structures(): BelongsToMany
    {
        return $this->belongsToMany(
            Structure::class,
            'managers',
        );
    }

    /**
     * Get all Structures this User is employed in.
     */
    public function employed_structures(): BelongsToMany
    {
        return $this->belongsToMany(
            Structure::class,
            'employees',
        );
    }


    /**
     * Get all employments of user.
     */
    public function employments(): HasMany
    {
        return $this->hasMany(
            related: Employee::class,
            foreignKey: 'user_id',
            localKey: 'id',
        );
    }

}
