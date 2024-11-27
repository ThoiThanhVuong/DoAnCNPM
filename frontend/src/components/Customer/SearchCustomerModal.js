import React from "react";

import axios from "axios";
const SearchCustomerModal = ({setSearch,setData,search,isActive,setCustomerHidden}) =>{


    const searchData = async (e) => {
        const { name, value } = e.target;
        setSearch({
          ...search,
          [name]: value,
        });
      
        const response = (await axios.get(`http://localhost:5000/api/customers`)).data.filter((item)=> item.trang_thai === (isActive ? 1 : 0));


        if (value) {
          if (isNaN(value)) {
            const KH_search = response.filter((response) =>
              response.ten_kh.toLowerCase().includes(value.toLowerCase())
            );
            (isActive ? setData(KH_search) : setCustomerHidden(KH_search))
          } else {
            const KH_search = response.filter((response) =>
              response.ma_kh.toString().includes(value.toString())
            );
            (isActive ? setData(KH_search) : setCustomerHidden(KH_search))
          }
        } else {
          const response = await axios.get(`http://localhost:5000/api/customers`);
          (isActive ? setData(response.data.filter((item)=> item.trang_thai==1)) : setCustomerHidden(response.data.filter((item)=> item.trang_thai == 0)));
        }
      };

      return (
        <div class="input-search">
          <input
            onChange={searchData}
            name="MKH"
            type="text"
            value={search.MKH}
            placeholder="Search......"
          ></input>
        </div>
      )
}
export default SearchCustomerModal;