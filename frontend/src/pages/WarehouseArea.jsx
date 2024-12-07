import React, { useState, useEffect } from 'react';
import '../style/WareHouseArea.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BiSolidDetail } from "react-icons/bi";
import WarehouseService from '../services/WarehouseService';
import productService from '../services/productService';
import AddWarehouseModal from '../components/Warehouse/AddWarehouseModal';
import EditWarehouseModal from '../components/Warehouse/EditWarehouseModal';
import DetailWarehouseModal from '../components/Warehouse/DetailWarehouseModal';

const WarehouseArea = () => {
    const [warehouses, setWarehouses] = useState([]);
    // lưu giá trị hiện tại của row
    const [currentWarehouse, setCurrentWarehouse] = useState({ id: null, name: '', note: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDetailWarehouse, setShowDetailWarehouse] = useState(false);
    const [dataDetailWarehouse, setDataDetailWarehouse] = useState([]);
    const [filterDataDetailWarehouse, setFilterDataDetailWarehouse] = useState([]);
    const [filterWarehouses, setFilterWarehouses] = useState([])
    // cảnh báo nhập 
    const [errorsName, setErrorsName] = useState('');
    const [errorsNote, setErrorsNote] = useState('');
    useEffect(() => {
        fetchWarehouses();
        fetchProducts();
    }, []);

    const fetchWarehouses = async () => {
        try {
            const data = await WarehouseService.getAllItems();
            setWarehouses(data);
            setFilterWarehouses(data); 
        } catch (error) {
            console.error('Error fetching warehouses:', error);
        }
    };
    const fetchProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setDataDetailWarehouse(data.data);
        } catch (error) {
            console.error('error fetching products:', error);
        }
    }
    // nút them
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
                setShowAddForm(false); //
                alert('Thêm kho mới thành công')
            } catch (error) {
                console.error('Error adding warehouse:', error);
                alert('Thêm kho mới thất bại')
            }
        }
    };
    // nút sửa
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
            setShowEditForm(false); 
        } catch (error) {
            console.error('Error updating warehouse:', error);
            alert('Sửa thất bại')
        }
        }
    };
    //nút xóa
    const handleDeleteWarehouse = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa kho này không?")) {
            try {
                console.log("Deleting warehouse with ID:", id);
                await WarehouseService.deleteItem(id);
                console.log("Warehouse deleted successfully");
                fetchWarehouses();
                alert('Kho được xóa thành công');
            } catch (error) {
                console.error('Error deleting warehouse:', error);
                alert("Có lỗi xảy ra khi xóa kho. Vui lòng thử lại.");
            }
        }
    };
    //thanh tìm kiếm
    const handleSearchWarehouse = (e) => {
        const value = e.target.value;
    
        const result = warehouses.filter((warehouse) => 
            warehouse.ten_kho.toLowerCase().includes(value.toLowerCase()) ||
            warehouse.chu_thich.toLowerCase().includes(value.toLowerCase())
        );
        setFilterWarehouses(result);
    };
    //hiển thị giao diện thêm kho
    const showAddArea = () => {
        setShowAddForm(true); //
        setCurrentWarehouse({ id: null, name: '', note: '' });
    };

    const showEditArea = (warehouse) => {
        setShowEditForm(true); 
        setCurrentWarehouse({
            id: warehouse.ma_kho,
            name: warehouse.ten_kho,
            note: warehouse.chu_thich
        });
    };
    const showDetailArea = (warehouse) => {
        console.log("danh sach kho bien warehouses",warehouses)
        console.log("danh sach kho filter",filterWarehouses)
        setShowDetailWarehouse(true);
        const data = dataDetailWarehouse.filter((product)=>{
            return product.storageArea.ma_kho === warehouse.ma_kho
        })
        setFilterDataDetailWarehouse(data)
    }
    //check đầu vào
    const validate = () => {
        let isValid = true;
        setErrorsName('')
        setErrorsNote('')
    
        if (!currentWarehouse.name.trim()) {
          setErrorsName('Tên khu vực kho không được bỏ trống')
          isValid = false;
        }
    
        if (!currentWarehouse.note.trim()) {
          setErrorsNote('Ghi chú không được bỏ trống')
          isValid = false;
        }
        return isValid;
    };
    

    return (
        <div className="warehouse-area">
            <div className="warehouse-area__container">
                    <h1 className='warehouse-area__container__banner'>Quản lý khu vực kho</h1>
                    <div className='warehouse-area_search-and-add'>
                        <input type="text" placeholder='search...' className='warehouse-search' onChange={handleSearchWarehouse}/>
                        <button onClick={showAddArea} className="warehouse-button add">Thêm</button>
                    </div>
                    <div className='warehouse-area__container__content'>
                        <table className="warehouse-area__container__table">
                            <thead>
                                <tr>
                                    <th className='warehouse-area__header-cell'>Mã kho</th>
                                    <th className='warehouse-area__header-cell'>Khu vực kho</th>
                                    <th className='warehouse-area__header-cell'>Ghi chú</th>
                                    <th className='warehouse-area__header-cell'>Chi tiết</th>
                                    <th className='warehouse-area__header-cell'>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterWarehouses.map((warehouse) => (
                                    <tr key={warehouse.id}>
                                        <td className='warehouse-area__data-cell'>{warehouse.ma_kho}</td>
                                        <td className='warehouse-area__data-cell'>{warehouse.ten_kho}</td>
                                        <td className='warehouse-area__data-cell'>{warehouse.chu_thich}</td>
                                        <td className='warehouse-area__data-cell'><BiSolidDetail className='warehouse-area__detail-icon' onClick={() => showDetailArea(warehouse)}/></td>
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
            {showAddForm && <AddWarehouseModal 
                currentWarehouse = {currentWarehouse}
                setCurrentWarehouse = {setCurrentWarehouse}
                setShowAddForm = {setShowAddForm}
                handleAddWarehouse = {handleAddWarehouse}
                errorsName = {errorsName}
                errorsNote = {errorsNote}
                setErrorsName = {setErrorsName}
                setErrorsNote = {setErrorsNote}
            />}
            {showEditForm && <EditWarehouseModal 
                currentWarehouse = {currentWarehouse}
                setCurrentWarehouse = {setCurrentWarehouse}
                setShowEditForm = {setShowEditForm}
                handleEditWarehouse = {handleEditWarehouse}
                errorsName = {errorsName}
                errorsNote = {errorsNote}
                setErrorsName = {setErrorsName}
                setErrorsNote = {setErrorsNote}
            />}
            {showDetailWarehouse && <DetailWarehouseModal 
                filterDataDetailWarehouse={filterDataDetailWarehouse}
                setShowDetailWarehouse={setShowDetailWarehouse}
                warehouses={warehouses}
                fetchProducts={fetchProducts}
            />}
        </div>
    );
};

export default WarehouseArea;