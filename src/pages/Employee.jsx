import React, {useEffect,useState} from 'react'
const Employee=()=>{
    const [data, setData]= useState([]);
    useEffect(()=>{
        fetch("http://localhost:3000/employee")
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
    },[])
    return (
        <div>
           trang nhan viên
        </div>
    );
};
export default Employee;