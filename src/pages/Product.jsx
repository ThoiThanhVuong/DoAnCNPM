import React,{ useEffect, useState } from 'react'
const Product=()=>{
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/products')
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.error('Error fetching products:', error));
      }, []);
    return (
    <div className="products">
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
    );
};
export default Product;