import React, { useState} from "react";

const AYSCustomerModal = ({showAYS,handleAYS,deleteData,formData}) =>{

    return(
        <div
        class="interface_ays"
        style={{ display: showAYS ? "block" : "none" }}
      >
        <div class="overlay " onClick={() => handleAYS("")}></div>
        <div class="form_interface">
          <form class="form_interface_ays">
            <h1>Are You Sure</h1>
            
            <div class="button-addCustomer-interface">
            <button type="button" onClick={() => handleAYS("")}>No</button>
            <button type="button" onClick={() => deleteData(formData.MKH)}>Yes</button>
            </div>
          </form>
        </div>
      </div>
    )
}
export default AYSCustomerModal;