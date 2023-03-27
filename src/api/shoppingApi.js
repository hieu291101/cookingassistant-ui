import axiosClient from "./axiosClient";

const getAllShopping = (accountId) => {
    const url = `/shoppinglist/${accountId}`;
    return axiosClient.post(url);
};

const addShopping = (data) => {
    const url ='/shoppinglist/add';
    return axiosClient.post(url, data);
};

const addToShopping = (data) => {
    const url = '/shoppinglist/add/all';
    return axiosClient.post(url, data);
    // return axiosClient( {
    //     method: 'post',
    //     url: url,
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    //     data: data
    // });
}


const deleteShopping = (accountId, ingredientName) => {
    const url = `/shoppinglist/${accountId}`;
    return axiosClient.delete(url, {
        params: {ingredient_name: ingredientName},
    });
};

const deleteAllShopping = (accountId) => {
    const url = `/shoppinglist/all/${accountId}`;
    return axiosClient.delete(url);
};

const editShopping = (accountId, ingredientName, data) => {
    const url = `/shoppinglist/${accountId}`;
    console.log(accountId);
    return axiosClient( {
        method: 'put',
        url: url,
        params: {ingredient_name: ingredientName},
        data: data
    });
};

const ShoppingApi = {
    getAllShopping,
    addShopping,
    addToShopping,
    deleteShopping,
    deleteAllShopping,
    editShopping
};

export default ShoppingApi;
