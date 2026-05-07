//-Path: "\src\configs\env.js"

const env = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
  apiTokenKey: import.meta.env.VITE_API_TOKEN_KEY,
};

export default env;
