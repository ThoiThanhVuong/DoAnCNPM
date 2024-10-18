import React from 'react'
import '../style/ExportForm.css'
import Textfield from '@atlaskit/textfield';
import { FaSearch } from "react-icons/fa"
const ExportForm=()=>{
    return (
        <div>
            <div className='Title'>Danh Sách Phiếu Xuất</div>
            <div className='boxFind'>
                <div className='boxDate'>
                    <p>Tìm kiếm theo ngày</p>
                    <div className='custom-startDate'>
                        <p>Từ ngày:</p>
                        <input type="date" />
                    </div>
                    <div className='custom-endDate'>
                        <p>Đến ngày:</p>
                        <input type="date" />
                    </div>
                    <div className='custom-icSearchDate'>
                        <FaSearch className='icSearchDate'/>
                    </div>
                </div>
                <div className='boxID'>
                    <p>Tìm kiếm theo mã SP</p>
                    <div className='custom_textField'>
                        <p>Mã phiếu xuất:</p>
                        <Textfield
                            name='TextPX'
                            placeholder='Nhập mã phiếu xuất'
                        />
                    </div>
                    <div className='custom-icSearchID'>
                        <FaSearch className='icSearchID'/>
                    </div>
                </div>
            </div>
            <div className='listPX'>
                <table style={{width: "100%", borderCollapse: "collapse"}} border="1">
                    <thead>
                       <tr>
                            <th style={{ width: "20%" }}>Mã phiếu xuất</th>
                            <th style={{width: "20%"}}>Tên tài khoản</th>
                            <th style={{width: "20%"}}>Mã khách hàng</th>
                            <th style={{width: "20%"}}>Thời gian xuất</th>
                            <th style={{width: "20%"}}>Trạng thái</th>
                       </tr> 
                    </thead>
                </table>    
            </div>
        </div>
    );
};
export default ExportForm;