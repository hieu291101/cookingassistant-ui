import { CSpinner } from '@coreui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomPagination from '~/components/CustomPagination';
import {
    deleteIngredient,
    editDataByIngredient,
    editIngredient,
    getIngredient,
    setDelete,
    setEdit,
    setEditData,
    setEditId,
    setIngredientId,
} from '~/features/ingredientSlice';
import Table from './Table';

const constraintTypeInput = {
    name: 'text',
    calo: 'number',
    carb: 'number',
    fiber: 'number',
    protein: 'number',
};

const IngredientTable = () => {
    const {
        data: ingredients,
        pagination,
        loading,
        editData,
        ingredientId,
        editId,
    } = useSelector((state) => ({ ...state.ingredients }));
    const dispatch = useDispatch();

    useEffect(() => {
        getDefaultIngredient();
    }, []);

    function handlePageChange(newPage) {
        console.log('New page: ', newPage);
        dispatch(
            getIngredient({
                limit: pagination.limit,
                page: newPage,
            }),
        );
    }

    //default
    const getDefaultIngredient = () => {
        const params = {
            limit: 2,
            page: 1,
        };
        dispatch(getIngredient(params));
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
        const data = {
            ingredientId: item.ingredientId,
            name: item.name,
            calo: item.calo,
            carb: item.carb,
            fiber: item.fiber,
            protein: item.protein,
        };
        console.log(editData);
        dispatch(setEditData({ editData: data }));
        editAction(item.ingredientId);
    };

    const handleSaveClick = (event) => {
        event.preventDefault();

        dispatch(editIngredient({ id: editId, data: editData }));
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
        dispatch(editDataByIngredient(newFormData));
    };

    const handleDeleteClick = (event, item) => {
        event.preventDefault();
        dispatch(setIngredientId({ ingredientId: item.ingredientId }));
    };

    const handleDeleteSubmit = (event) => {
        event.preventDefault();

        dispatch(deleteIngredient(ingredientId));
        getDefaultIngredient();
    };

    const handleClose = () => dispatch(setDelete({ showDelete: false }));
    const handleShow = () => dispatch(setDelete({ showDelete: true }));

    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' },
        },
        {
            key: 'ingredientId',
            label: 'ID',
            _props: { scope: 'col' },
        },
        {
            key: 'name',
            label: 'Name',
            _props: { scope: 'col' },
        },
        {
            key: 'calo',
            label: 'Calo',
            _props: { scope: 'col' },
        },
        {
            key: 'carb',
            label: 'Carb',
            _props: { scope: 'col' },
        },
        {
            key: 'fiber',
            label: 'Fiber',
            _props: { scope: 'col' },
        },
        {
            key: 'protein',
            label: 'Protein',
            _props: { scope: 'col' },
        },
    ];
    const items = ingredients.map((info, index) => {
        return {
            id: index + 1,
            ingredientId: info.ingredientId,
            name: info.name,
            calo: info.calo,
            carb: info.carb,
            fiber: info.fiber,
            protein: info.protein,
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
                        constraintTypeInput={constraintTypeInput}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        handleEditFormChange={handleEditFormChange}
                        handleDeleteClick={handleDeleteClick}
                        handleDeleteSubmit={handleDeleteSubmit}
                        handleShow={handleShow}
                        handleClose={handleClose}
                        stateName="ingredients"
                        keyIdName="ingredientId"
                    />

                    {ingredients.length > 0 && (
                        <CustomPagination pagination={pagination} onPageChange={handlePageChange} />
                    )}
                </>
            )}
        </>
    );
};

export default IngredientTable;
