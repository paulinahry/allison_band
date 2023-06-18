import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { prodActions } from '../redux/slices/products';
import CardProduct from '../components/CardProduct';
import { cartActions } from '../redux/slices/cart';

import Spinner from '../components/Spinner';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loaded } = useSelector((s) => s.prod);
  const { cart } = useSelector((s) => s.cart);


  useEffect(() => {
    dispatch(prodActions.getProductById(id)); 
  }, [dispatch, id]);

  if (!loaded) {
    return <Spinner size={20} />;
  }

  function handleAddToCart(productId) {
    dispatch(cartActions.addToCart({ _id: productId }));
    console.log(productId, cart);
  }


  return (
    <div className="flex flex-wrap justify-center">
      {product ? (
        <CardProduct
          key={product._id}
          product={product}
          onClick={() => handleAddToCart(product._id)}
        />
      ) : (
        <p>No product found.</p>
      )}
    </div>
  );
};

export default ProductDetails;
