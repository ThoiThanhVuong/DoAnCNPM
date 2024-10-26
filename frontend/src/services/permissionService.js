import axios from 'axios';

const permissionService = {
    getAllPermissions : async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/permission');
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    },
    createPermission : async (permission) => {
        try {
            const response = await axios.post('http://localhost:3001/api/permission/create', permission)
            return response.data
        } catch (error) {
            console.error('Error creating permission:', error);
            throw error;
        }
    },
    deletePermission : async (ma_quyen) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/permission/delete/${ma_quyen}`)
            return response.data
        } catch (error) {
            console.error('Error deleting permission:', error);
            throw error;
        }
    }
};



export default permissionService;