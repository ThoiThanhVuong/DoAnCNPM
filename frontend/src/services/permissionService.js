import axios from "axios";

const permissionService = {
  showAllPermission: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/permission/show"
      );
      return response.data;
    } catch (error) {
      console.error("Error creating permission:", error);
      throw error;
    }
  },
  updateRole: async (maNvID, roleID) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/permission/update_role/${maNvID}`,
        roleID
      );
      return response.data;
    } catch (error) {
      console.log("error updating role: ", error);
      throw error;
    }
  },
  deleteRole: async (maNvID) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/permission/delete_role/${maNvID}`
      );
      return response.data;
    } catch (error) {
      console.log("Loi khi xoa nhan vien:", error);
      throw error;
    }
  },
};

export default permissionService;
