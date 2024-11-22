import React, { useState, useEffect } from 'react';
import '../style/WareHouseArea.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BiSolidDetail } from "react-icons/bi";
import WarehouseService from '../services/WarehouseService';

const WarehouseArea = () => {
    const [active, setActive] = useState('showWarehouse');
    const [warehouses, setWarehouses] = useState([]);
    const [currentWarehouse, setCurrentWarehouse] = useState({ id: null, name: '', note: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [filterWarehouses, setFilterWarehouses] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [errors, setErrors] = useState({
        nameError: '',
        noteError: ''
      });

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const fetchWarehouses = async () => {
        try {
            const data = await WarehouseService.getAllItems();
            console.log(data);
            setWarehouses(data);
            setFilterWarehouses(data); // filter data
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };

    const handleAddWarehouse = async (e) => {
        e.preventDefault();
        if(validate()){
            try {
                await WarehouseService.addItem({
                    ten_kho: currentWarehouse.name,
                    chu_thich: currentWarehouse.note,
                    trang_thai: 1
                });
                fetchWarehouses();
                // setActive('showWarehouse');
                setShowAddForm(false); //
                alert('Thêm kho mới thành công')
            } catch (error) {
                console.error('Error adding warehouse:', error);
                alert('Thêm kho mới thất bại')
            }
        }
    };

    const handleEditWarehouse = async () => {
        if(validate()){
            try {
            await WarehouseService.updateItem(currentWarehouse.id, {
                ten_kho: currentWarehouse.name,
                chu_thich: currentWarehouse.note,
                trang_thai: 1
            });
            alert('Sửa thành công')
            fetchWarehouses();
            // setActive('showWarehouse');
            setShowEditForm(false); 
        } catch (error) {
            console.error('Error updating warehouse:', error);
            alert('Sửa thất bại')
        }
        }
    };

    const handleDeleteWarehouse = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa kho này không?")) {
            try {
                console.log("Deleting warehouse with ID:", id);
                await WarehouseService.deleteItem(id);
                console.log("Warehouse deleted successfully");
                fetchWarehouses();
            } catch (error) {
                console.error('Error deleting warehouse:', error);
                alert("Có lỗi xảy ra khi xóa kho. Vui lòng thử lại.");
            }
        }
    };

    const handleSearchWarehouse = (e) => {
        const value = e.target.value;
    
        const result = warehouses.filter((warehouse) => 
            warehouse.ten_kho.toLowerCase().includes(value.toLowerCase()) ||
            warehouse.chu_thich.toLowerCase().includes(value.toLowerCase())
        );
        setFilterWarehouses(result);
        setSearchTerm(value);
    };
    const showAddArea = () => {
        // setActive('showAddArea');
        setShowAddForm(true); //
        setCurrentWarehouse({ id: null, name: '', note: '' });
    };

    const showEditArea = (warehouse) => {
        // setActive('showEditArea');
        setShowEditForm(true); 
        setCurrentWarehouse({
            id: warehouse.ma_kho,
            name: warehouse.ten_kho,
            note: warehouse.chu_thich
        });
    };
    const validate = () => {
        let isValid = true;
        let nameError = '';
        let noteError = '';
    
        if (!currentWarehouse.name.trim()) {
          nameError = 'Tên khu vực kho không được bỏ trống';
          isValid = false;
        }
    
        if (!currentWarehouse.note.trim()) {
          noteError = 'Ghi chú không được bỏ trống';
          isValid = false;
        }
    
        setErrors({
          nameError,
          noteError
        })
        return isValid;
    };


    return (
        <div className="warehouse-area">
            {active === 'showWarehouse' && (
                <div className="warehouse-area__container">
                    <div className='warehouse-area_search-and-add'>
                        <input type="text" placeholder='search...' className='warehouse-search' onChange={handleSearchWarehouse}/>
                        <button onClick={showAddArea} className="warehouse-button add">Thêm</button>
                    </div>
                    <h1 className='warehouse-area__container__banner'>Quản lý khu vực kho</h1>
                    <div className='warehouse-area__container__content'>
                        <table className="warehouse-area__container__table">
                            <thead>
                                <tr>
                                    <th className='warehouse-area__header-cell'>Mã kho</th>
                                    <th className='warehouse-area__header-cell'>Khu vực kho</th>
                                    <th className='warehouse-area__header-cell'>Ghi chú</th>
                                    {/* <th className='warehouse-area__header-cell'>Chi tiết</th> */}
                                    <th className='warehouse-area__header-cell'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterWarehouses.map((warehouse) => (
                                    <tr key={warehouse.id}>
                                        <td className='warehouse-area__data-cell'>{warehouse.ma_kho}</td>
                                        <td className='warehouse-area__data-cell'>{warehouse.ten_kho}</td>
                                        <td className='warehouse-area__data-cell'>{warehouse.chu_thich}</td>
                                        {/* <td className='warehouse-area__data-cell'><BiSolidDetail className='warehouse-area__detail-icon' /></td> */}
                                        <td className='warehouse-area__data-cell'>
                                            <FaEdit className='warehouse-area__edit-icon' onClick={() => showEditArea(warehouse)} />
                                            <FaTrash className='warehouse-area__delete-icon' onClick={() => handleDeleteWarehouse(warehouse.ma_kho)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showAddForm && (
                <div className='overlay'>
                    <div className='warehouse-area__add-form'>
                        <h1 className='warehouse-area__add-form-banner'>Thêm khu vực kho</h1>
                        <div className='warehouse-area__add-form-content'>
                            <div className='warehouse-area__form-item'>
                                <label className='warehouse-area__form-item-label' htmlFor="warehouse-name">Tên khu vực kho</label>
                                <input
                                    className='warehouse-area__form-item-input'
                                    type="text"
                                    id='warehouse-name'
                                    placeholder='Nhập tên khu vực kho'
                                    value={currentWarehouse.name}
                                    onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, name: e.target.value })}
                                />
                                {errors.nameError && <p style={{ color: 'red' }}>{errors.nameError}</p>}
                            </div>
                            <div className='warehouse-area__form-item'>
                                <label className='warehouse-area__form-item-label' htmlFor="warehouse-note">Ghi chú</label>
                                <input
                                    className='warehouse-area__form-item-input'
                                    type="text"
                                    id='warehouse-note'
                                    placeholder='Nhập ghi chú'
                                    value={currentWarehouse.note}
                                    onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, note: e.target.value })}
                                />
                                {errors.nameError && <p style={{ color: 'red' }}>{errors.nameError}</p>}
                            </div>
                            <div className='warehouse-area__form-buttons'>
                                <button className='warehouse-button confirm' onClick={handleAddWarehouse}>Lưu</button>
                                <button className='warehouse-button exit' onClick={() => {setShowAddForm(false); setErrors({ nameError: '', noteError: '' });}}>Thoát</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEditForm && (
                <div className='overlay'>
                    <div className='warehouse-area__edit-form'>
                        <h1 className='warehouse-area__edit-form-banner'>Thông tin khu vực kho</h1>
                        <div className='warehouse-area__edit-form-content'>
                            <div className='warehouse-area__form-item'>
                                <label className='warehouse-area__form-item-label' htmlFor="warehouse-name_edit">Tên khu vực kho</label>
                                <input
                                    className='warehouse-area__form-item-input'
                                    type="text"
                                    id='warehouse-name_edit'
                                    placeholder='Nhập tên khu vực kho'
                                    value={currentWarehouse.name}
                                    onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, name: e.target.value })}
                                />
                                    {errors.nameError && <p style={{ color: 'red' }}>{errors.nameError}</p>}
                            </div>
                            <div className='warehouse-area__form-item'>
                                <label className='warehouse-area__form-item-label' htmlFor="warehouse-note_edit">Ghi chú</label>
                                <input
                                    className='warehouse-area__form-item-input'
                                    type="text"
                                    id='warehouse-note_edit'
                                    placeholder='Nhập ghi chú'
                                    value={currentWarehouse.note}
                                    onChange={(e) => setCurrentWarehouse({ ...currentWarehouse, note: e.target.value })}
                                />
                            </div>
                            <div className='warehouse-area__form-buttons'>
                                <button className='warehouse-button confirm' onClick={handleEditWarehouse}>Lưu</button>
                                <button className='warehouse-button exit' onClick={() => {setShowEditForm(false); setErrors({ nameError: '', noteError: '' });}}>Thoát</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WarehouseArea;