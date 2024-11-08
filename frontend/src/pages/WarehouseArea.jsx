import React,{useState} from 'react'
import '../style/WareHouseArea.css'
import { FaEdit,FaTrash } from 'react-icons/fa';
import { BiSolidDetail } from "react-icons/bi";
const WarehouseArea=()=>{

    const [showWarehouse,setShow]=useState(true)
    const [showAddArea,setShow1]=useState(false)
    const [showEditArea,setShow2]=useState(false)

    const onclickShowWarehouseInAdd = () =>{
        setShow(!showWarehouse);
        setShow1(!showAddArea);
    }
    const onclickShowWarehouseInEdit = () =>{
        setShow(!showWarehouse);
        setShow2(!showEditArea)
    }
    const onclickShowAddArea = () => {
        setShow(!showWarehouse);
        setShow1(!showAddArea);
    }
    const onclickShowEditArea = () => {
        setShow(!showWarehouse);
        setShow2(!showEditArea)
    }
    return (
        <div>
            <div className="container-area" style={{display: showWarehouse ? "block" : "none"}}>
                <button onClick={onclickShowAddArea} style={{display:'flex'}}>them</button>
                <h1 className='container_banner'>QUan li khu vuc kho</h1>
                <div className='container_content'>
                    <table>
                        <tr>
                            <th>Ma kho</th>
                            <th>khu vuc kho</th>
                            <th>ghi chu</th>
                            <th>chi tiet</th>
                            <th>Thao tac</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>khu vuc A</td>
                            <td>xiaomi</td>
                            <td><BiSolidDetail className='detail'/></td>
                            <td><FaEdit className='edit' onClick={onclickShowEditArea}/><FaTrash className='delete'/></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>khu vuc A</td>
                            <td>xiaomi</td>
                            <td><BiSolidDetail className='detail'/></td>
                            <td><FaEdit className='edit' onClick={onclickShowEditArea}/><FaTrash className='delete'/></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='add-area' style={{display: showAddArea ? "block" : "none"}}>
                <h1 className='add-area_banner'>Them khu vuc kho</h1>
                <div className='add-area_content'>
                    <div className='add-area_content__content-items'>
                        <label htmlFor="warehouse-name">Ten khu vuc kho</label>
                        <input type="text" id='warehouse-name' placeholder='Nhap ten khu vuc kho' />
                    </div>
                    <div className='add-area_content__content-items'>
                        <label htmlFor="warehouse-note">Ghi chu</label>
                        <input type="text" id='warehouse-note' placeholder='Nhap ten khu vuc kho' />
                    </div>
                    <div className='add-area_button'>
                        <button>Luu</button>
                        <button onClick={onclickShowWarehouseInAdd}>Thoat</button>
                    </div>
                </div>
            </div>
            <div className='edit-area' style={{display: showEditArea ? "block" : "none"}}>
                <h1 className='edit-area_banner'>thong tin khu vuc kho</h1>
                <div className='edit-area_content'>
                    <div className='edit-area_content__content-items'>
                        <label htmlFor="warehouse-name_edit">Ten khu vuc kho</label>
                        <input type="text" id='warehouse-name_edit' placeholder='Nhap ten khu vuc kho' />
                    </div>
                    <div className='edit-area_content__content-items'>
                        <label htmlFor="warehouse-note_edit">Ghi chu</label>
                        <input type="text" id='warehouse-note_edit' placeholder='Nhap ten khu vuc kho' />
                    </div>
                    <div className='edit-area_button'>
                        <button >Luu</button>
                        <button onClick={onclickShowWarehouseInEdit}>Thoat</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default WarehouseArea;