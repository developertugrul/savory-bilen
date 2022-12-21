<?php

namespace App\Http\Controllers\APIs\V100\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TextController extends Controller
{
    //
    private $database;

    public function __construct()
    {
        $this->database = \App\Services\FirebaseService::connect();
    }

    public function create(Request $request)
    {
        $this->database
            ->getReference('test/blogs/' . $request['title'])
            ->set([
                'title' => $request['title'],
                'content' => $request['content'],
            ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully created blog post!'
        ]);
    }

    public function index()
    {
        return response()->json($this->database->getReference('test/blogs')->getValue());
    }

    public function edit(Request $request)
    {
        $this->database->getReference('test/blogs/' . $request['title'])
            ->update([
                'content/' => $request['content']
            ]);

        return response()->json('blog has been edited');
    }

    public function delete(Request $request)
    {
        $this->database
            ->getReference('test/blogs/' . $request['title'])
            ->remove();

        return response()->json('blog has been deleted');
    }
}
