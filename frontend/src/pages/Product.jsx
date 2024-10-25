import React, {useEffect,useState} from 'react'
import productService from '../services/productService';
const Product=()=>{
  const [data ,setData] = useState([]);
    useEffect(()=>{
      const fetchProduct = async()=>{
        const data = await productService.getAllProducts();
        console.log(data);
        setData(data);
      };
      fetchProduct();
    },[])
    return (
    <div className="products">
      <h2> Trang sản phẩm</h2>
     

    </div>
    );
};
export default Product;