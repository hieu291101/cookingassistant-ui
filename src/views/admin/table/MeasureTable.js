import { CSpinner } from '@coreui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomPagination from '~/components/CustomPagination';
import {
    deleteMeasure,
    editDataByMeasure,
    editMeasure,
    getMeasure,
    setDelete,
    setEdit,
    setEditData,
    setEditId,
    setMeasureId,
} from '~/features/measureSlice';
import Table from './Table';

const MeasureTable = () => {
    const {
        data: measures,
        pagination,
        loading,
        editData,
        editId,
        measureId,
    } = useSelector((state) => ({ ...state.measures }));
    const dispatch = useDispatch();

    useEffect(() => {
        getDefaultMeasure();
    }, []);

    function handlePageChange(newPage) {
        console.log('New page: ', newPage);
        dispatch(
            getMeasure({
                limit: pagination.limit,
                page: newPage,
            }),
        );
    }

    //default
    const getDefaultMeasure = () => {
        const params = {
            limit: 2,
            page: 1,
        };
        dispatch(getMeasure(params));
    };

    //Common action
    const editAction = (id) => {
        dispatch(setEditId({ editId: id }));
    };

    const saveAction = () => {
        dispatch(setEditId({ editId: 0 }));
    };

    //Handle Event **********************************
    const handleEditClick = (event, item) => {
        event.preventDefault();
        const data = { measureId: item.measureId, name: item.name };
        console.log(editData);
        dispatch(setEditData({ editData: data }));
        editAction(item.measureId);
    };

    const handleSaveClick = (event) => {
        event.preventDefault();

        dispatch(editMeasure({ id: editId, data: editData }));
        saveAction();
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        console.log(fieldName);
        console.log(fieldValue);
        const newFormData = {
            ...editData,
        };

        newFormData[fieldName] = fieldValue;

        // Set edit data
        dispatch(setEditData({ editData: newFormData }));
        // Change UI information
        dispatch(editDataByMeasure(newFormData));
    };

    const handleDeleteClick = (event, item) => {
        event.preventDefault();
        dispatch(setMeasureId({ measureId: item.measureId }));
    };

    const handleDeleteSubmit = (event) => {
        event.preventDefault();

        dispatch(deleteMeasure(measureId));
        getDefaultMeasure();
    };

    const handleClose = () => dispatch(setDelete({ showDelete: false }));
    const handleShow = () => dispatch(setDelete({ showDelete: true }));

    //Data Table************************
    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' },
        },
        {
            key: 'measureId',
            label: 'ID',
            _props: { scope: 'col' },
        },
        {
            key: 'name',
            label: 'Name',
            _props: { scope: 'col' },
        },
    ];
    const items = measures.map((info, index) => {
        return {
            id: index + 1,
            measureId: info.measureId,
            name: info.name,
            _cellProps: { id: { scope: 'row' } },
        };
    });

    return (
        <>
            {loading ? (
                <CSpinner component="span" aria-hidden="true" />
            ) : (
                <>
                    <Table
                        columns={columns}
                        items={items}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        handleEditFormChange={handleEditFormChange}
                        handleDeleteClick={handleDeleteClick}
                        handleDeleteSubmit={handleDeleteSubmit}
                        handleShow={handleShow}
                        handleClose={handleClose}
                        stateName="measures"
                        keyIdName="measureId"
                    />

                    {measures.length > 0 && (
                        <CustomPagination pagination={pagination} onPageChange={handlePageChange} />
                    )}
                </>
            )}
        </>
    );
};

export default MeasureTable;
