<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PublicController extends Controller
{

  /**
   * Show the profile for the given user.
   *
   * @return Response
   */
  public function index()
  {
      return view('index');
  }

  /**
   * Show the profile for the given user.
   *
   * @return Response
   */
  public function example()
  {
      return view('example');
  }
}
