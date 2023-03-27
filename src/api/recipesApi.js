import axiosClient from "./axiosClient";


class RecipeApi {
    recipes = (params) => {
        const url = '/recipes/pagination';
        return axiosClient.get(url, {
            params,
        });
    };

    search = (params) => {
        const url = '/recipes/search';
        return axiosClient.get(url, {
            params,
        });
    };
    
    filter = (params) => {
        const url = '/recipes/filter';
        return axiosClient.get(url, {
            params,
        });
    };

    get = (id) => {
        const url = `/recipes/${id}`;
        return axiosClient.get(url);
    }

    add = (data) => {
        const url ='/recipes/create';
        return axiosClient.post(url, data);
    }

    getDetail = (id) => {
        const url = `/recipe_detail/${id}`;
        return axiosClient.get(url);
    }
    
    update = (id, data) => {
        const url =`/recipes/${id}`;
        return axiosClient.put(url, data);
    }
    delete = (id) => {
        const url = `/recipes/delete/${id}`;
        return axiosClient.delete(url);
    }
};

const recipeApi = new RecipeApi();
export default recipeApi;
