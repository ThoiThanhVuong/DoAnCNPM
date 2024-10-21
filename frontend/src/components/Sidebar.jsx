import React, { useState } from 'react'
import {
    FaBars ,
    FaHome,
    FaMobileAlt ,
    FaFilter,
    FaMapMarkedAlt  ,
    FaFileExport,
    FaFileImport,
    FaUser ,
    FaAddressCard ,
    FaUserCircle,
    FaChartBar ,
    FaUserFriends,
    FaCodeBranch ,
    FaUserShield
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar=({children})=>{
    const[isOpen,setIsOpen]=useState(false);
    const toggle=()=>setIsOpen(!isOpen);
    const menuItem=[
    
        {
            path:"/homePage",
            name:"Trang chủ",
            icon:<FaHome/>,
        },
        {
            path:"/product",
            name:"Sản phẩm",
            icon:<FaMobileAlt/>,
        },
        {
            path:"/attribute",
            name:"Thuộc tính",
            icon:<FaFilter/>,
        },
        {
            path:"/warehouseArea",
            name:"Khu vực kho",
            icon:<FaMapMarkedAlt/>,
        },
        {
            path:"/importForm",
            name:"Phiếu nhập",
            icon:<FaFileImport/>,
        },
        {
            path:"/exportForm",
            name:"Phiếu xuất",
            icon:<FaFileExport/>,
        },
        {
            path:"/customer",
            name:"Khách hàng",
            icon:<FaUser/>,
        },
        {
            path:"/provider",
            name:"Nhà cung cấp",
            icon:<FaAddressCard/>,
        },
        {
            path:"/employee",
            name:"Nhân viên",
            icon:<FaUserFriends/>,
        },
        {
            path:"/account",
            name:"Tài khoản",
            icon:<FaUserCircle/>,
        },
        {
            path:"/permission",
            name:"Phân quyền",
            icon:<FaCodeBranch/>,
        },
        {
            path:"/permissionAccount",
            name:"Quyền tài khoản",
            icon:<FaUserShield/>,
        },
        {
            path:"/statistics",
            name:"Thống kê",
            icon:<FaChartBar/>,
        },
    ];
    return (
        <div className="container">
            <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
                <div  className="top_section">
                    <h1 style={{display: isOpen ?"block":"none"}} className="logo">Logo</h1>
                    <div style={{marginLeft: isOpen ? "90px" : "0px"}} className="bars">
                    <FaBars onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item,index)=>(
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div  style={{paddingLeft: isOpen ? "5px" : "10px"}} className="icon">{item.icon}</div>
                            <div style={{display: isOpen ?"block":"none"}} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};
export default Sidebar;