import { useProduct } from '../context/useProduct'
import CardProduct from '../components/CardProduct'


const Product = () => {
    const { products } = useProduct();
  
    return (
      <div className="store">
        <h2>Products</h2>
        {products.map((product) => (
          <CardProduct key={product._id} product={product} />
        ))}
      </div>
    );
  }

  export default Product;
  