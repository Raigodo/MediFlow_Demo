<?php

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

Route::prefix("journal")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get("/",[NoteController::class,"prompt"])
            ->middleware([
                'can:prompt,'.Note::class,
                'client-sidelist.journal',
            ])
            ->name("note.prompt");
            

        Route::get("{client}", fn($client_id)
            => to_route('note.index', $client_id)
        )->middleware('can:list,'.Note::class.',client');
        

        Route::get("{client}/notes",[NoteController::class,"index"])
            ->middleware([
                'can:list,'.Note::class.',client',
                'select.client',
                'client-sidelist.journal',
                'append.employees'
            ])
            ->name("note.index");
            

        Route::get("{client}/notes/today",[NoteController::class,"write"])
            ->middleware([
                'can:create,'.Note::class.',client',
                'select.client',
                'client-sidelist.journal',
            ])
            ->name("note.write");
            

        Route::get("{client}/notes/{note}",[NoteController::class,"show"])
            ->middleware([
                'can:view,'.Note::class.',client,note',
                'select.client',
                'select.note',
                'client-sidelist.journal',
            ])
            ->name("note.show");
            

        Route::get("{client}/notes/{note}/force-edit",[NoteController::class,"forceEdit"])
            ->middleware([
                'can:forceUpdate,'.Note::class.',client,note',
                'select.client',
                'select.note',
                'client-sidelist.journal',
            ])
            ->name("note.force-edit");
            

        Route::put("{client}/notes/today",[NoteController::class,"store"])
            ->middleware('can:create,'.Note::class.',client')
            ->name("note.store");
            

        Route::delete("{client}/notes/{note}",[NoteController::class,"destroy"])
            ->middleware('can:delete,'.Note::class.',client,note')
            ->name("note.destroy");
            

        Route::put("{client}/notes/{note}/force-update",[NoteController::class,"forceUpdate"])
            ->middleware('can:forceUpdate,'.Note::class.',client,note')
            ->name("note.force-update");

    });
