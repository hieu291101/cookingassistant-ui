import axiosClient from './axiosClient';

const getAllStorage = (accountId) => {
    const url = `/storage/${accountId}`;
    return axiosClient.post(url);
};

const addStorage = (data) => {
    return axiosClient({
        method: 'post',
        url: '/storage/add',
        data: data,
    });
};

const deleteStorage = (accountId, ingredientName) => {
    return axiosClient.delete(`/storage/${accountId}`, {
        params: {
            ingredient_name: ingredientName,
        },
    });
};

const editStorage = (accountId, ingredientName, data) => {
    const url = `/storage/${accountId}`;
    
    return axiosClient( {
        method: 'put',
        url: url,
        params: {ingredient_name: ingredientName},
        data: data
    });
};

const StorageApi = {
    getAllStorage,
    addStorage,
    deleteStorage,
    editStorage
};

export default StorageApi;
