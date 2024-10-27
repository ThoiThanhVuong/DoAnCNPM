import React, {useState , useEffect} from 'react'
import '../style/Permission.css'
import permissionService from '../services/permissionService';
import {FaEdit, FaTrash} from 'react-icons/fa'
const Permission=()=>{
    
    const [showAddPermission, setShow] = useState(false);

    const handleShowAddPermission = () => {
        setShow(!showAddPermission);
    };

    const [dataFeature, setDataFeature] = useState({})
    const [showEditPermission, setShow2] = useState(false);
    const [namePermission, setNamePermission] = useState('')
    const [maQuyen, setMaQuyen] = useState(null)
    const handleShowEditPermission2 = () => {
        setShow2(!showEditPermission)
    }
    const handleShowEditPermission = async (ma_quyen, ten_quyen) => {
        setShow2(!showEditPermission)
        setNamePermission(ten_quyen)
        setMaQuyen(ma_quyen)
    };
    useEffect(()=>{
        const fetchFeature = async () => {
            if(maQuyen !== null){
                const response = await permissionService.getAllFeaturePermission(maQuyen)
                setDataFeature(response)
            }
        }
        fetchFeature()
    },[maQuyen]) // kiem tra su thay doi cua maQuyen: khi co su thay doi lap tuc thuc hien ham useEffect

    const [showAddFunctionPermission, setShow3] = useState(false);

    const handleShowAddFunctionPermission = () => {
        setShow3(!showAddFunctionPermission);
    }

    const [data ,setData] = useState([]);
    useEffect(()=>{
      const fetchPermission = async()=>{
        const response = await permissionService.getAllPermissions();
        setData(response);
      };
      fetchPermission();
    },[])


    const [dataSave, setDataSave] = useState({
        ma_quyen: '',
        ten_quyen: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataSave({ ...dataSave, [name]: value });
    };

    const handleSaveAddPermission =async()=>{
        try {
            if(dataSave.ma_quyen !== "" && dataSave.ten_quyen !== ""){
                const response = await permissionService.createPermission(dataSave)
                console.log('Permission created:', response);
                setDataSave({
                    ma_quyen: '',
                    ten_quyen: ''
                })
                window.location.reload(); 
            }else{
                alert("Nhap thong tin!")
            }
        } catch (error) {
            console.error('Error creating permission:', error);
        }
    }

    const handleDeletePermission = async (ma_quyen)=>{
        if(ma_quyen === 1 || ma_quyen === 2 || ma_quyen ===3){
            alert("ban khong the xoa quyen nay")
            return
        }
        const confirmDelete = window.confirm('Ban co chac chan muon xoa quyen nay?')
        if(!confirmDelete) return
        try {
            const response = await permissionService.deletePermission(ma_quyen)
            console.log('Permission deleted:', response);
            setData(data => data.filter(item => item.ma_quyen !== ma_quyen))
        } catch (error) {
            console.error('Error deleting permission:', error);
        }
    }

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
                        {data.map(item =>(
                            <tr>
                                <td>{item.ma_quyen}</td>
                                <td>{item.ten_quyen}</td>
                                <td><FaEdit className="edit" onClick={()=>handleShowEditPermission(item.ma_quyen, item.ten_quyen)}/><FaTrash className="delete" onClick={()=>handleDeletePermission(item.ma_quyen)}/></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="manager-permission_button">
                    <button onClick={handleShowAddPermission}>Thêm</button>
                </div>           
            </div>

            <div className="add-permission" style={{display: showAddPermission ? "block" : "none"}}>
                <h1>Thêm Nhóm Quyền</h1>
                <label for="">STT:</label>
                <input type="text" name="ma_quyen" onChange={handleChange} value={dataSave.ma_quyen}/>
                <label for="">Vai Trò:</label>
                <input type="text" placeholder="Nhập nhóm quyền" name='ten_quyen' onChange={handleChange} value={dataSave.ten_quyen}/>
                <div className="add-permission_button">
                    <button onClick={handleSaveAddPermission}>Lưu</button>
                    <button onClick={handleShowAddPermission}>Thoát</button>
                </div>                
            </div>
            
            <div className='edit-permission' style={{display: showEditPermission ? "block" : "none"}}>
                <h1>Sửa Chức Năng Nhóm Quyền</h1>
                <div className="edit-permission_content">
                    <div className="edit-permission_content__title">
                        Nhóm Quyền:
                        <input type="text" value={namePermission}/>
                    </div>
                    <table>
                        <tr>
                            <td>Chức Năng</td>
                            <td>Thao Tác</td>
                        </tr>
                        {dataFeature.FeaturePermissions && dataFeature.FeaturePermissions.length > 0 ? (      
                            dataFeature.FeaturePermissions.map(item => (
                                <tr>
                                    <td>{item.ten_chuc_nang}</td>
                                    <td><FaTrash className="delete"/></td>
                                </tr>
                            ) 
                            )) : null}
                    </table>
                    <div class="edit-permission_button">
                        <button onClick={handleShowAddFunctionPermission}>Thêm</button>
                        <button onClick={handleShowEditPermission2}>Thoát</button>
                    </div>
                </div>
            </div>

            <div className='add-function-permission' style={{display: showAddFunctionPermission ? "block" : "none"}}>
                <h1>Thêm Chức Năng</h1>
                Chức năng: <input type="text" placeholder="Nhập tên chức năng"/>
                <div className="add-function-permission_button">
                    <button>Lưu</button>
                    <button onClick={handleShowAddFunctionPermission}>Thoát</button>
                </div>
            </div>
        
        </div>
    );
};
export default Permission;