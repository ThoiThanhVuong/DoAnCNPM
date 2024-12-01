import React, { useState } from "react";

import axios from "axios";

const AYSProviderModal = ({
  showAYS,
  handleAYS,
  formData,
  setform,
  setSuccessMessage,
  fetchProviders
}) => {
  const deleteProvider = async (MNCC) => {
    
    setSuccessMessage("Xóa thành công");
    await axios.delete(`http://localhost:5000/api/providers/${MNCC}`);
    setform({
      MNCC: " ",
      TNCC: "",
      DC: " ",
      Email: " ",
      SDT: " ",
    });
    
    setTimeout(() => {
      setSuccessMessage(""); // Ẩn thông báo
    }, 1500);
    fetchProviders();
    handleAYS("");
  };
  return (
    <div class="interface_ays" style={{ display: showAYS ? "block" : "none" }}>
      <div class="overlay " onClick={() => handleAYS("")}></div>
      <div class="form_interface">
        <form class="form_interface_ays">
          <h1>Are You Sure</h1>

          <div class="button-addCustomer-interface">
            <button type="button" onClick={() => handleAYS("")}>
              No
            </button>
            <button type="button" onClick={() => deleteProvider(formData.MNCC)}>
              Yes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AYSProviderModal;
