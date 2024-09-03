import axios from './axiosConfig';

export const createSale = async (saleData) => {
    return await axios
      .post('/sales/create/', saleData)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
};

export const getSales = async (params) => {
    return await axios
      .get('/sales/', { params })
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
};