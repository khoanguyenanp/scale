<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Resources\Products as ProductsResource;
use App\Http\Resources\ProductsCollection;

use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit') ?: 100;
        $sort = $request->input('sort') ?: 'id';
        $page = $request->input('page') ?: 0;

        if(substr($sort, 0, 1) == '-') {
            $sort_by = substr($sort,1);
            $sort_dir = 'DESC';
        } else {
            $sort_by = $sort ?: 'id';
            $sort_dir = 'ASC';
        }
        $products = Products::orderBy($sort_by, $sort_dir)->skip($page*$limit)->take($limit)->get();
        return new ProductsCollection($products);
    }

    public function show($id)
    {
        return new ProductsResource(Products::findOrFail($id));
    }

    public function store(Request $request)
    {
        $request->validate(array(
            'name'             => 'required|max:255',
            'description'      => 'required',
            'price'            => 'required|regex:/^\d*(\.\d{2})?$/'
        ));

        $product = Products::create($request->all());

        return (new ProductsResource($product))
                ->response()
                ->setStatusCode(201);
    }

    public function update($id, Request $request)
    {
        $request->validate(array(
            'name'             => 'required|max:255',
            'description'      => 'required',
            'price'            => 'required|regex:/^\d*(\.\d{2})?$/'
        ));

        $product = Products::findOrFail($id);
        $product->name = $request->get('name');
        $product->description = $request->get('description');
        $product->price = $request->get('price');

        $product->save();

        return new ProductsResource($product);
    }

    public function delete($id)
    {
        $product = Products::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }
}
