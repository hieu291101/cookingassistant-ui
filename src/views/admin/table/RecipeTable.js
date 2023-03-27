import { CSpinner } from '@coreui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomPagination from '~/components/CustomPagination';
import { deleteRecipe, getRecipe, setDelete, setEdit, setRecipeId } from '~/features/recipeSlice';
import Table from './Table';

const TableRecipe = () => {
    const { data: recipes, pagination, loading, recipeId } = useSelector((state) => ({ ...state.recipes }));
    const dispatch = useDispatch();

    useEffect(() => {
        getDefaultRecipe();
        dispatch(setEdit({ edit: true }));
    }, []);

    function handlePageChange(newPage) {
        console.log('New page: ', newPage);
        dispatch(
            getRecipe({
                limit: pagination.limit,
                page: newPage,
            }),
        );
    }

    const getDefaultRecipe = () => {
        const params = {
            limit: 2,
            page: 1,
        };
        dispatch(getRecipe(params));
    };

    const columns = [
        {
            key: 'id',
            label: '#',
            _props: { scope: 'col' },
        },
        {
            key: 'recipeId',
            label: 'ID',
            _props: { scope: 'col' },
        },
        {
            key: 'title',
            label: 'Title',
            _props: { scope: 'col' },
        },
        {
            key: 'accessModifier',
            label: 'Ac Modifier',
            _props: { scope: 'col' },
        },
        {
            key: 'createdDate',
            label: 'Cre date',
            _props: { scope: 'col' },
        },
        {
            key: 'cuisine',
            label: 'Cuisine',
            _props: { scope: 'col' },
        },

        {
            key: 'category',
            label: 'Category',
            _props: { scope: 'col' },
        },
    ];

    const handleDeleteClick = (event, item) => {
        event.preventDefault();
        dispatch(setRecipeId({ recipeId: item.recipeId }));
    };

    const handleDeleteSubmit = (event) => {
        event.preventDefault();

        dispatch(deleteRecipe(recipeId));
        getDefaultRecipe();
    };

    const handleClose = () => dispatch(setDelete({ showDelete: false }));
    const handleShow = () => dispatch(setDelete({ showDelete: true }));

    const items = recipes.map((info, index) => {
        return {
            id: index + 1,
            recipeId: info.recipeId,
            title: info.title,
            accessModifier: info.accessModifier === 1 ? 'Public' : 'Private',
            createdDate: Intl.DateTimeFormat('sv-SE').format(new Date(info.createdDate)),
            cuisine: info.cuisine,
            category: info.category,
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
                        isDetail={true}
                        handleDeleteClick={handleDeleteClick}
                        handleDeleteSubmit={handleDeleteSubmit}
                        handleShow={handleShow}
                        handleClose={handleClose}
                        stateName="recipes"
                    />

                    {recipes.length > 0 && <CustomPagination pagination={pagination} onPageChange={handlePageChange} />}
                </>
            )}
        </>
    );
};

export default TableRecipe;
