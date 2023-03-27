import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CustomPagination from '~/components/CustomPagination';
import { findRecipeById, setEdit, setRecipe, updateRecipe } from '~/features/recipeSlice';
import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const constraintsRequired = {
    accessModifier: 'required',
    activeTime: 'required',
    briefDescription: 'required',
    cuisine: 'required',
    mainIngredient: 'required',
    preparation: 'required',
    title: 'required',
    totalTime: 'required',
    yields: 'required',
    category: 'required',
};

const constraintTypeInput = {
    accessModifier: 'number',
    activeTime: 'number',
    briefDescription: 'text',
    cuisine: 'text',
    mainIngredient: 'text',
    preparation: 'text',
    title: 'text',
    totalTime: 'number',
    yields: 'number',
    category: 'text',
};

const constraintsDisable = {
    recipeId: 'disabled',
    username: 'disabled',
    createdDate: 'disabled',
};

const Detail = () => {
    const { id } = useParams();
    const columns = [];
    const { recipe, edit } = useSelector((state) => ({ ...state.recipes }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findRecipeById(id));
    }, []);

    for (const [key, value] of Object.entries(recipe)) {
        const column = {
            key: key,
            label: key.toUpperCase(),
            value: key === 'createdDate' ? Intl.DateTimeFormat('sv-SE').format(new Date(value)) : value,
        };
        columns.push(column);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {
            ...recipe,
        };

        newFormData[fieldName] = fieldValue;

        dispatch(setRecipe({ recipe: newFormData }));
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        console.log(recipe);
        dispatch(setEdit({ edit: true }));
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        const data = {
            recipeId: recipe.recipeId,
            accessModifier: recipe.accessModifier,
            activeTime: recipe.activeTime,
            briefDescription: recipe.briefDescription,
            cuisine: recipe.cuisine,
            mainIngredient: recipe.mainIngredient,
            photoPath: recipe.photoPath,
            preparation: recipe.preparation,
            title: recipe.title,
            totalTime: recipe.totalTime,
            yields: recipe.yields,
            categoriesSubId: 1,
        };
        dispatch(updateRecipe({ id: id, data: data }));
        dispatch(setEdit({ edit: false }));
    };

    const detailData = columns.map((column) => (
        <div className={cx('detail')} key={column.key}>
            <div className={cx('detail-heading')}>{column.label}:</div>
            {edit ? (
                <input
                    type={constraintTypeInput[column.key]}
                    className={cx('detail-content', 'detail-input')}
                    required={constraintsRequired[column.key]}
                    placeholder={'Enter ' + column.label.toLowerCase() + '.....'}
                    name={column.key}
                    value={column.value}
                    // value={editFormData.measure}
                    onChange={handleEditFormChange}
                    disabled={constraintsDisable[column.key]}
                />
            ) : (
                <div className={cx('detail-content')}>{column.value}&nbsp;</div>
            )}
        </div>
    ));

    return (
        <>
            <h2>Detail</h2>
            <div className={cx('detail-wrapper')}>{detailData}</div>
            {edit ? (
                <Button onClick={handleSaveClick}>Save</Button>
            ) : (
                <Button primary onClick={handleEditClick}>
                    Edit
                </Button>
            )}
        </>
    );
};

export default Detail;
