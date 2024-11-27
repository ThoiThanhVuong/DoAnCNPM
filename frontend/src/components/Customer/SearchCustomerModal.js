import React from "react";

import axios from "axios";
const SearchCustomerModal = ({setSearch,setData,search}) =>{


    const searchData = async (e) => {
        const { name, value } = e.target;
        setSearch({
          ...search,
          [name]: value,
        });
        const response = (await axios.get(`http://localhost:5000/api/customers`))
          .data.filter((item)=> item.trang_thai == 1);
    
        if (value) {
          if (isNaN(value)) {
            const KH_search = response.filter((response) =>
              response.ten_kh.toLowerCase().includes(value.toLowerCase())
            );
            console.log(KH_search);
            setData(KH_search);
          } else {
            const KH_search = response.filter((response) =>
              response.ma_kh.toString().includes(value.toString())
            );
            setData(KH_search);
          }
        } else {
          const response = await axios.get(`http://localhost:5000/api/customers`);
          setData(response.data.filter((item)=> item.trang_thai==1));
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