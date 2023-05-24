import { API_KEY, BASE_URL, RAPID_API_HOST } from "../environment.js"; // impordime sisse failist tundlikud andmed, et saakisme kasutada

const settings = {
  'X-RapidAPI-Key': API_KEY,
  "X-RapidAPI-Host": RAPID_API_HOST,
}

export const getCoins = async () => {
  try {
    const response = await fetch(`${BASE_URL}/coins`, { headers: settings });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export const getCoin = async (uuid) => { // uuid on placeholder ja võib olla tegelt, mis iganes
  try {
    const response = await fetch(`${BASE_URL}/coin/${uuid}`, {
      headers: settings,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export const getCoinHistory = async (uuid) => {
  try {
    const response = await fetch(`${BASE_URL}/coin/${uuid}/history`, {
      headers: settings,
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}