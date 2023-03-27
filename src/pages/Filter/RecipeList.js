import { Col, Container, Row } from 'react-bootstrap';
import CustomPagination from '~/components/CustomPagination';
import RecipeCard from '~/components/RecipeCard';
import classNames from 'classnames/bind';
import styles from './RecipeList.module.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  getRecipe } from '~/features/recipeSlice';

const cx = classNames.bind(styles);

function RecipeList() {
    const dispatch = useDispatch();
    const { data: recipes, isSearch, pagination, loading } = useSelector((state) => ({ ...state.recipes }));

    console.log(recipes);

    useEffect(() => {
        const params = {
            limit: 12,
            page: 1,
        };

        if (isSearch === false) dispatch(getRecipe(params));
    }, []);

    const recipeCols = recipes.map((info, index) => {
        return (
        <Col sm={6} xl={4} key={index}>
                <Link to={`/recipes/${info.recipeId}`}>
                    <RecipeCard data={info} />
                </Link>
            </Col>
        );
    });

    function handlePageChange(newPage) {
        console.log('New page: ', newPage);
        dispatch(
            getRecipe({
                limit: pagination.limit,
                page: newPage,
            }),
        );
    }
    return (
        <Container>
            {loading ? (
                <span className="spinner-border "></span>
            ) : (
                <>
                    <Row>{recipeCols}</Row>
                    {recipes.length > 0 && <CustomPagination pagination={pagination} onPageChange={handlePageChange} />}
                </>
            )}
        </Container>
    );
}

export default RecipeList;
