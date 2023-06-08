import  { createContext, useEffect, useState , useContext} from 'react';
import { getAllProducts } from './../api/apiFetch';

// Create the useProduct context
const ProductContext = createContext();

// Create a custom hook to access the useProduct context
export const useProduct = () => useContext(ProductContext);

// Create a ProductProvider component
export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProduct(productsData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  const contextValue = {
    product,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
