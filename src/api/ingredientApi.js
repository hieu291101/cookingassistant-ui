import axiosClient from "./axiosClient";

const getIngredient = (params) => {
    const url = '/ingredient/pagination';
    return axiosClient.get(url, {params});
};

const addIngredient = (data) => {
    const url ='/ingredient/create';
    return axiosClient.post(url, data);
};

const addAllIngredient = (id, data) => {
    const url =`/ingredient/create/all/${id}`;
    return axiosClient.post(url, data);
};

const deleteIngredient = (id) => {
    const url = `/ingredient/delete/${id}`;
    return axiosClient.delete(url);
};

const editIngredient = (id, data) => {
    const url = `/ingredient/edit/${id}`;
    
    return axiosClient( {
        method: 'put',
        url: url,
        data: data
    });
};

const getByIngredient = (keyword) => {
    return axiosClient.get('ingredient/getIngredientBy', {
        params: {
            keyword,
        },
    }).then((response) => {
        return response.data.ingredient;
    });
};

const IngredientService = {
    getByIngredient,
    getIngredient,
    addIngredient,
    deleteIngredient,
    editIngredient,
    addAllIngredient
};

export default IngredientService;