import React, { useState, useEffect } from 'react';
import '../style/WareHouseArea.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BiSolidDetail } from "react-icons/bi";
import WarehouseService from '../services/WarehouseService';

const WarehouseArea = () => {
    const [active, setActive] = useState('showWarehouse');
    const [warehouses, setWarehouses] = useState([]);
    const [currentWarehouse, setCurrentWarehouse] = useState({ id: null, name: '', note: '' });

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const fetchWarehouses = async () => {
        try {
            const data = await WarehouseService.getAllItems();
            console.log(data);
            setWarehouses(data);
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };

    const handleAddWarehouse = async () => {
        try {
            await WarehouseService.addItem({
                ten_kho: currentWarehouse.name,
                chu_thich: currentWarehouse.note,
                trang_thai: 1
            });
            fetchWarehouses();
            setActive('showWarehouse');
        } catch (error) {
            console.error('Error adding warehouse:', error);
        }
    };

    const handleEditWarehouse = async () => {
        try {
            await WarehouseService.updateItem(currentWarehouse.id,{
                ten_kho: currentWarehouse.name,
                chu_thich: currentWarehouse.note,
                trang_thai: 1
            });
            fetchWarehouses();
            setActive('showWarehouse');
        } catch (error) {
            console.error('Error updating warehouse:', error);
        }
    };

    // const handleDeleteWarehouse = async (id) => {
    //     try {
    //         await WarehouseService.deleteItem(id);
    //         fetchWarehouses();
    //     } catch (error) {
    //         console.error('Error deleting warehouse:', error);
    //     }
    // };
    const handleDeleteWarehouse = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa kho này không?")) {
            try {
                console.log("Deleting warehouse with ID:", id); // Thêm log để kiểm tra ID
                await WarehouseService.deleteItem(id);
                console.log("Warehouse deleted successfully"); // Thêm log để xác nhận xóa thành công
                fetchWarehouses(); // Cập nhật lại danh sách kho sau khi xóa
            } catch (error) {
                console.error('Error deleting warehouse:', error);
                alert("Có lỗi xảy ra khi xóa kho. Vui lòng thử lại.");
            }
        }
    };
    const showAddArea = () => {
        setActive('showAddArea');
        setCurrentWarehouse({ id: null, name: '', note: '' });
    };

    const showEditArea = (warehouse) => {
        setActive('showEditArea');
        setCurrentWarehouse({id:warehouse.ma_kho,
            name:warehouse.ten_kho,
            note:warehouse.chu_thich});
    };

    return (
        <div>
            {active === 'showWarehouse' && (
                <div className="container-area">
                    <button onClick={showAddArea} style={{ display: 'flex' }}>Thêm</button>
                    <h1 className='container_banner'>Quản lý khu vực kho</h1>
                    <div className='container_content'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã kho</th>
                                    <th>Khu vực kho</th>
                                    <th>Ghi chú</th>
                                    <th>Chi tiết</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warehouses.map((warehouse) => (
                                    <tr key={warehouse.id}>
                                        <td>{warehouse.ma_kho}</td>
                                        <td>{warehouse.ten_kho}</td>
                                        <td>{warehouse.chu_thich}</td>
                                        <td><BiSolidDetail className='detail' /></td>
                                        <td>
                                            <FaEdit className='edit' onClick={() => showEditArea(warehouse)} />
                                            <FaTrash className='delete' onClick={() => handleDeleteWarehouse(warehouse.ma_kho)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {active === 'showAddArea' && (
                <div className='add-area'>
                    <h1 className='add-area_banner'>Thêm khu vực kho</h1>
                    <div className='add-area_content'>
                        <div className='add-area_content__content-items'>
                            <label htmlFor="warehouse-name">Tên khu vực kho</label>
                            <input
                                type="text"
                                id='warehouse-name'
                                placeholder='Nhập tên khu vực kho'
                                value={currentWarehouse.name}
                                onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, name: e.target.value })}
                            />
                        </div>
                        <div className='add-area_content__content-items'>
                            <label htmlFor="warehouse-note">Ghi chú</label>
                            <input
                                type="text"
                                id='warehouse-note'
                                placeholder='Nhập ghi chú'
                                value={currentWarehouse.note}
                                onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, note: e.target.value })}
                            />
                        </div>
                        <div className='add-area_button'>
                            <button onClick={handleAddWarehouse}>Lưu</button>
                            <button onClick={() => setActive('showWarehouse')}>Thoát</button>
                        </div>
                    </div>
                </div>
            )}
            {active === 'showEditArea' && (
                <div className='edit-area'>
                    <h1 className='edit-area_banner'>Thông tin khu vực kho</h1>
                    <div className='edit-area_content'>
                        <div className='edit-area_content__content-items'>
                            <label htmlFor="warehouse-name_edit">Tên khu vực kho</label>
                            <input
                                type="text"
                                id='warehouse-name_edit'
                                placeholder='Nhập tên khu vực kho'
                                value={currentWarehouse.name}

                                onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, name: e.target.value })}
                            />
                        </div>
                        <div className='edit-area_content__content-items'>
                            <label htmlFor="warehouse-note_edit">Ghi chú</label>
                            <input
                                type="text"
                                id='warehouse-note_edit'
                                placeholder='Nhập ghi chú'
                                value={currentWarehouse.note}

                                onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, note: e.target.value })}
                            />
                        </div>
                        <div className='edit-area_button'>
                            <button onClick={handleEditWarehouse}>Lưu</button>
                            <button onClick={() => setActive('showWarehouse')}>Thoát</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WarehouseArea;