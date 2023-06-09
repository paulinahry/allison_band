const CardProduct = ({ product }) => {
    return (
        <div className="card">
            <img src={product.image} alt={product.title} />{' '}
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
        </div>
    )
}

export default CardProduct
