import React from 'react';
import {Link} from 'react-router-dom'

const ProductCard = ({product}) => {
    return (
        <>
            <div key={product.id} className="group relative mx-2">
                <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  <Link to={`product/${product.id}`}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.price}</p>
            </div>
        </>
    )
}

export default ProductCard;
