import axios from "axios";

// Set default config when creating instance
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Alter defaults after instance has been created and Integrate default header for auth
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
