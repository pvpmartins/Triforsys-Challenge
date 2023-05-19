import axios from "axios";

const api = axios.create({
  baseURL: "http://backend:3333/api/", // replace with your base URL
});

export const createProduct = async (
  nome: string,
  preco: number,
  qtd: number
) => {
  try {
    // Make the POST request to create the product
    const response = await api.post("/products", {
      nome,
      preco,
      qtd,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  nome: string,
  preco: number,
  qtd: number,
  id: number
) => {
  console.log("api", { nome, preco, qtd, id });
  try {
    // Make the POST request to create the product
    const response = await api.put("/products/" + id, {
      nome,
      preco,
      qtd,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete("/products/" + id);
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
