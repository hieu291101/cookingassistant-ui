import axiosClient from "./axiosClient";

const getAllPlanner = (id) => {
    const url = `/plannermeal/all/${id}`;
    return axiosClient.get(url);
};

const addPlanner = (data) => {
    const url ='/planner/create';
    return axiosClient.post(url, data);
};

const deletePlanner = (data) => {
    const url = '/plannermeal/delete';
    return axiosClient.delete(url, data);
};

const editPlanner = (accountId, ingredientName, data) => {
    const url = `/planner/${accountId}`;
    console.log(accountId);
    return axiosClient( {
        method: 'put',
        url: url,
        params: {ingredient_name: ingredientName},
        data: data
    });
};

const PlannerApi = {
    getAllPlanner,
    addPlanner,
    deletePlanner,
    editPlanner
};

export default PlannerApi;
