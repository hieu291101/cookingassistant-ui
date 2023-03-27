import axiosClient from "./axiosClient";

const getReview = (id) => {
    const url = `/review/${id}`;
    return axiosClient.get(url);
};

const addReview = (data) => {
    const url ='/review/add';
    return axiosClient.post(url, data);
};

const ReviewApi = {
    getReview,
    addReview
};

export default ReviewApi;
