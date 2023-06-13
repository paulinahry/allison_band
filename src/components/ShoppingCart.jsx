import React from 'react';
import { useData } from '../context/UseContext';

const ShoppingCart = () => {
  const { cart } = useData()

  if (cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      {cart.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Amount: {product.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
