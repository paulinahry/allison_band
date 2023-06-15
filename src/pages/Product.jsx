import CardProduct from 'components/CardProduct'
import { useSelector, useDispatch } from 'react-redux'

const Product = () => {
    const { products } = useSelector((s) => s.prod)

    return (
        <div className="products">
            <h2>Products</h2>
            {products.map((product) => (
                <CardProduct key={product._id} product={product} />
            ))}
        </div>
    )
}

export default Product
