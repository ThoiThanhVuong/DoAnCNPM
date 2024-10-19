import React from 'react'
import '../style/Permission.css'
import {FaEdit, FaTrash} from 'react-icons/fa'
const Permission=()=>{
    return (
        <div>
            <div className='manager-permission'>
                <h1>Quản Lí Nhóm Quyền</h1>
                <div className="manager-permission_content">
                    <table>
                        <tr>
                            <td>STT</td>
                            <td>Nhóm Quyền</td>
                            <td>Thao Tác</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>admin</td>
                            <td><FaEdit className="edit"/><FaTrash className="delete"/></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>nhân viên quản lí kho</td>
                            <td><FaEdit className="edit"/><FaTrash className="delete"/></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>kế toán</td>
                            <td><FaEdit className="edit"/><FaTrash className="delete"/></td>
                        </tr>
                    </table>
                </div>
                <div className="manager-permission_button">
                    <button>Thêm</button>
                    <button>Thoát</button>
                </div>                
            </div>
        </div>
    );
};
export default Permission;