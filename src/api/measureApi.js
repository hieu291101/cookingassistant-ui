import axiosClient from "./axiosClient";


const getAllMeasures = () => {
    const url = '/measure/getAll';
    console.log(url)
    return axiosClient.get(url);
};

const getMeasure = (params) => {
    const url = '/measure/pagination';
    return axiosClient.get(url, {params});
};

const addMeasure = (data) => {
    const url ='/measure/create';
    return axiosClient.post(url, data);
};

const deleteMeasure = (id) => {
    const url = `/measure/delete/${id}`;
    return axiosClient.delete(url);
};

const editMeasure = (id, data) => {
    console.log(data)
    const url = `/measure/edit/${id}`;
    return axiosClient( {
        method: 'put',
        url: url,
        data: data
    });
};

const getByMeasure = (keyword) => {
    return axiosClient.get('measure/getMeasureBy', {
        params: {
            keyword,
        },
    }).then((response) => {
        return response.data.Measure;
    });
};

const MeasureApi = {
    getByMeasure,
    getAllMeasures,
    getMeasure,
    editMeasure,
    deleteMeasure,
    addMeasure
};

export default MeasureApi;