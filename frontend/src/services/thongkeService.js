import axios from 'axios';


const thongkeService = {
    getThongKeKhachHang: async (params) => {
        try {
            const response = await axios.get('http://localhost:5000/api/thongke/thongKeKhachHang',{params});
            return response.data
        }
        catch(error){
            console.error("Error fetching products:", error);
            return [];
        }
    },
    getThongKeProvider : async (params) =>{
        try{
            const response = await axios.get('http://localhost:5000/api/thongke/thongKeNhaCungCap',{params});
            return response.data;
        }catch(error){
            console.error("Error fetching products:", error);
            return [];
        }
    },
    getThongKeTonKho : async (params) =>{
        try{
            const respone = await axios.get('http://localhost:5000/api/thongke/thongKeTonKho',{params});
            return respone.data;
        }catch(error){
            console.error("Error fetching products:", error);
            return [];
        }
    }

}
export default thongkeService;