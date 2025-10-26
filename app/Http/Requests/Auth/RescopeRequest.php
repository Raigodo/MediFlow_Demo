<?php

namespace App\Http\Requests\Auth;

use App\Models\DefaultStructure;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Session;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\DataAccess\Facades\Users;
use App\Services\DataAccess\Facades\Structures;

class RescopeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "structure_id"=> ['required','ulid','exists:structures,id'],
        ];
    }

    /**
     * Attempt to change conextual structure.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function rescope(): void
    {
        $data = $this->validated();
        $structure = Structures::find($data['structure_id']) ?? abort(404);
        $user_id = CurrentContext::userId();
        $user = $user_id ? Users::find($user_id) : abort(404);

        $default_structure = DefaultStructure::whereUserId($user->id);
        if ($default_structure){
            $default_structure->update([
                'structure_id'=> $structure->id
            ]);
        }
        else{
            DefaultStructure::factory()->create([
                'user_id'=> $user->id,
                'structure_id'=> $structure->id,
            ]);
        }

        Session::regenerate();

        session([
            'user_id'=> CurrentContext::userId(),
            'user_role'=> CurrentContext::userRole(),
            'structure_id'=> $structure->id,
            'employee_id'=> null,
            'employee_role'=> null,
        ]);
    }
}
