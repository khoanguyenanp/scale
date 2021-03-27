<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Products extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $res = array(
            'id'            => $this->id,
            'name'          => $this->name,
            'description'   => $this->description,
            'price'         => number_format((float)$this->price, 2, '.', '')
        );
        return $res;
    }
}
