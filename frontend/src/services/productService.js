import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';
const productService = {
    getAllProducts :async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }
};



export default productService;