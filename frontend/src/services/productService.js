import axios from 'axios';

const API_URL = 'http://localhost:3001/api/products';
const productService = {
    getAllProducts :async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    },
    createProduct : async (product) => {
        try {
            const response = await axios.post(API_URL, product);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }
};



export default productService;