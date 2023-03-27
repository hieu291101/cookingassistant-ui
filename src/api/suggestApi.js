import axiosClient from "./axiosClient";

const suggestIngredient = (data) => {
    return axiosClient({
        method: 'post',
        url: '/suggestRecipe',
        data: data,
    });
};


const SuggestApi = {
    suggestIngredient
};

export default SuggestApi;
