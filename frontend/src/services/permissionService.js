import axios from 'axios';

const API_URL = 'http://localhost:3001/api/permission';

const permissionService = {
    getAllPermissions :async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    },
};



export default permissionService;