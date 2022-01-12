<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;


$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix'=>'api_php/user'], function () use($router)
{
    $router->get('/all', 'UserController@index');
    $router->get('/profile', 'UserController@profile');
    $router->get('/{id}', 'UserController@one');
    $router->put('/update', 'UserController@update');
    $router->delete('/delete', 'UserController@delete');
    $router->post('/register', 'AuthController@register');
    $router->post('/login', 'AuthController@login');
});

$router->group(['prefix'=>'api_php/message'], function () use($router)
{
    $router->get('/read/{id}', 'MessageController@readOne');
    $router->post('/create', 'MessageController@createMessage');
    $router->delete('/delete/{id}', 'MessageController@delete');
    $router->put('/updated/{id}', 'MessageController@update');
});

