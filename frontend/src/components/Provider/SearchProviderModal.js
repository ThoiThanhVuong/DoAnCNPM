import React, { useState} from "react";

import axios from "axios";
const SearchProviderModal = ({setSearch,search,setData}) =>{

      //tìm kiếm nhà cung cấp
  const searchProvider = async (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
    const response = (
      await axios.get(`http://localhost:5000/api/providers`)
    ).data.filter((item) => item.trang_thai ===  1 );

    if (value) {
      if (isNaN(value)) {
        const NCC_search = response.filter((response) =>
          response.ten_ncc.toLowerCase().includes(value.toLowerCase())
        );
       setData(NCC_search);
      } else {
        const NCC_search = response.filter((response) =>
          response.ma_ncc.toString().includes(value.toString())
        );
       setData(NCC_search);
      }
    } else {
      const response = await axios.get(`http://localhost:5000/api/providers`);
      setData(response.data.filter((item) => item.trang_thai == 1))
    }
  };
    return (
        <div class="input-search">
          <input value={search.MNCC} name="MNCC" type="text" onChange={searchProvider} placeholder="Search......"></input>
        </div>

    )
}
export default SearchProviderModal;