import React ,{useState} from 'react'
import '../style/Statistics.css';
import TabChilden from '../components/ChildTab';
const Statistics=()=>{
    const [activeTab, setActiveTab] = useState('TongQuan');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    return (
        <div className="tabs-container">
            <div className="tab-buttons">
                {/* tab 1 */}
                <button
                    className={activeTab === 'TongQuan' ? 'active' : ''}
                    onClick={() => handleTabClick('TongQuan')}
                >
                    Tổng quan
                </button>

                {/* tab 2 */}
                <button
                    className={activeTab === 'TonKho' ? 'active' : ''}
                    onClick={() => handleTabClick('TonKho')}
                >
                    Tồn kho
                </button>

                {/* tab 3 */}
                <button
                    className={activeTab === 'DoanhThu' ? 'active' : ''}
                    onClick={() => handleTabClick('DoanhThu')}
                >
                    Doanh thu
                </button>

                {/* tab 4 */}
                <button className={activeTab === 'KhachHang' ? 'active' : ''}
                        onClick={() => handleTabClick('KhachHang')}
                >
                    Khách hàng
                </button>

                    {/* tab 5 */}
                <button className={activeTab === 'NhaCungCap' ? 'active' : ''}
                        onClick={() => handleTabClick('NhaCungCap')}
                >
                    Nhà cung cấp
                </button>
            </div>
  
            <div className="tab-content">
                {activeTab === 'TongQuan' && <div><h3>Tab Tổng quan</h3></div>}
                {activeTab === 'TonKho' && <div><h3>Tab Tồn kho</h3></div>}
                {activeTab === 'DoanhThu' && <div><TabChilden/></div>}
                {activeTab === 'KhachHang' && <div><h3>Tab khách hàng</h3></div>}
                {activeTab === 'NhaCungCap' && <div><h3>Tab nhà cung cấp</h3></div>}
            </div>
      </div>
    );
};
export default Statistics;