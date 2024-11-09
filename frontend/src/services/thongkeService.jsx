
import axios from 'axios';

const API_URL = '/api/thongke';
const thongkeService = {
    fetchThongKeKhachHang : async (text, timeStart, timeEnd) => {
        try {
            const response = await axios.get(`${API_URL}/thongKeKhachHang`, {
                params: {
                    text,
                    timeStart,
                    timeEnd
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
}};
export default thongkeService;