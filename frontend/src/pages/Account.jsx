import React from 'react'
import '../style/Account.css'
import {FaEdit, FaTrash} from 'react-icons/fa'
const Account=()=>{
    return (
        <div>

            <div class="container-account">
                <h1>Quản Lí Người Dùng</h1>
                <div class="container-account_content">
                    <table>
                        <tr>
                            <td>Tên Tài Khoản</td>
                            <td>Email</td>
                            <td>Vai Trò</td>
                            <td>Thao Tác</td>
                        </tr>
                        <tr>
                            <td>user1</td>
                            <td>user1@gmail.com</td>
                            <td>admin</td>
                            <td><FaEdit className='edit'/><FaTrash className='delete'/></td>
                        </tr>
                        <tr>
                            <td>user2</td>
                            <td>user2@gmail.com</td>
                            <td>nhân viên quản lí kho</td>
                            <td><FaEdit className='edit'/><FaTrash className='delete'/></td>
                        </tr>
                        <tr>
                            <td>user3</td>
                            <td>user3@gmail.com</td>
                            <td>kế toán</td>
                            <td><FaEdit className='edit'/><FaTrash className='delete'/></td>
                        </tr>
                        <tr>
                            <td>user4</td>
                            <td>user4@gmail.com</td>
                            <td>kế toán</td>
                            <td><FaEdit className='edit'/><FaTrash className='delete'/></td>
                        </tr>
                        <tr>
                            <td>user5</td>
                            <td>user5@gmail.com</td>
                            <td>nhân viên quản lí kho</td>
                            <td><FaEdit className='edit'/><FaTrash className='delete'/></td>
                        </tr>
                    </table>
                    <div class="container-account_button">
                        <button>Thêm</button>
                        <button>Thoát</button>
                    </div>
                </div>
            </div>

            <div className="add-user-account">
                <h1>Sửa Thông Tin Người Dùng</h1>
                <div className="add-user-account_content">
                    <div className="add-user-account_content__content-items">
                        <label for="">Tên Tài Khoản:</label>
                        <input type="text" placeholder="Nhập tên tài khoản"/>
                    </div>
                    <div className="add-user-account_content__content-items">
                        <label for="">Email:</label>
                        <input type="text" placeholder="Nhập email"/>
                    </div>
                    <div className="add-user-account_content__content-items">
                        <label for="">Gán Nhóm Quyền:</label>
                        <input type="text" placeholder="Nhập vai trò" id="input"/>
                    </div>
                    <div className="add-user-account_button">
                        <button>Lưu</button>
                        <button>Thoát</button>
                    </div> 
                </div>               
            </div>
        </div>
    );
};
export default Account;