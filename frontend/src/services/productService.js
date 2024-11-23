import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';
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
    },
    getCountProduct : async (params) =>{
        try {
            const response =await axios.get(`${API_URL}/countProduct`);
            return response.data;
        } catch (error) {
            console.error('Error getting count product:', error);
            return [];
        }
    },
    updatedTonKho : async (ma_sp, so_luong_moi) =>{
        try {
            await axios.patch(`${API_URL}/${ma_sp}`, so_luong_moi);
          } catch (error) {
            console.error(error);
          }
    
    }
    
};



export default productService;