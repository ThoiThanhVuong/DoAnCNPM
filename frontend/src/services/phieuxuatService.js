import axios from 'axios';

const apiURL = 'http://localhost:5000/api/phieuxuat';

export const getExports = async () => {
    try{
        const response = await axios.get(apiURL)
        return response.data;
    }
    catch(err){
        console.error(err)
        }
};