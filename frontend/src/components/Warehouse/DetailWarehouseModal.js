import React from 'react';

const DetailWarehouseModal = ({filterDataDetailWarehouse,setShowDetailWarehouse}) => {
    return (
        <div className='overlay'>
            <div className='warehouse-area__detail'>
                <div className='warehouse-area__detail-content'>
                <table className='warehouse-area__container__table'>
                    <thead>
                        <tr>
                            <th className='warehouse-area__header-cell'>Tên sản phẩm</th>
                            <th className='warehouse-area__header-cell'>Số lượng tồn</th>
                            {/* <th className='warehouse-area__header-cell'>Chuyển kho</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filterDataDetailWarehouse.map(product=>(
                            <tr key={product.ma_sp}>
                                <td className='warehouse-area__data-cell'>{product.ten_sp}</td>
                                <td className='warehouse-area__data-cell'>{product.so_luong_ton}</td>
                                {/* <td className='warehouse-area__data-cell'><button className=''>Chuyển kho</button></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                <div className='warehouse-area__form-buttons'>
                <button className='warehouse-button exit' onClick={()=>{setShowDetailWarehouse(false)}}>Thoát</button>
                </div>
            </div>
        </div>
    );
};

export default DetailWarehouseModal;