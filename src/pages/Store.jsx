import { useProduct } from './useProduct';
import CardProduct from '../components/CardProduct'

const Store = () => {
    const { products } = useProduct();
  
    return (
      <div className="store">
        <h2>Products</h2>
        {products.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    );
  };
  
  export default Store;
  