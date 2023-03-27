import axiosClient from "./axiosClient";

const exportExcelShopping = (accountId) => {
    const url = `/excel/export/${accountId}`;
    return axiosClient.get(url);
};

const ReportApi = {
    exportExcelShopping
};

export default ReportApi;
