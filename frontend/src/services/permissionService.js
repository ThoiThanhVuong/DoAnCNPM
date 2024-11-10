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
};

export default permissionService;
