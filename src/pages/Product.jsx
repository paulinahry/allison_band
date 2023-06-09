import { productContext } from '../context/useProduct'
import CardProduct from '../components/CardProduct'

const Product = () => {
    const { products } = productContext()

    return (
        <div className="store">
            <h2>Products</h2>
            {products.map((product) => (
                <CardProduct key={product._id} product={product} />
            ))}
        </div>
    )
}

export default Product
