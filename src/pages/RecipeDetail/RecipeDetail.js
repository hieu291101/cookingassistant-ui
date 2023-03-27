import { faClock, faPeopleGroup, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Table } from 'react-bootstrap';
import Button from '~/components/Button';
import styles from './RecipeDetail.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/images';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findRecipeById, getRecipeDetail, setServing, setDetails } from '~/features/recipeSlice';
import { addReview, getReview } from '~/features/reviewSlide';
import ReviewItem from '~/components/ReviewItem';

const cx = classNames.bind(styles);

function RecipeDetail() {
    const { id } = useParams();
    const { data: recipes, details: ingredient, prevData } = useSelector((state) => ({ ...state.recipes }));
    const { data: reviews } = useSelector((state) => ({ ...state.reviews }));
    const inputReviewRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findRecipeById(id));
        dispatch(getRecipeDetail(id));
        dispatch(getReview(id));
    }, []);

    // useEffect(() => {}, [ingredient]);

    // useEffect(() => {}, [serving]);
    const ingredientData = ingredient.map((ingre, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
            <td>{ingre.id.ingredientName}</td>
                <td>{ingre.heading ? null : ingre.quantity + ' ' + ingre.measure}</td>
                <td></td>
            </tr>
        );
    });

    const reviewShow = () => {
        let reviewShowResult = null;
        if (reviews) reviewShowResult = reviews.map((rv) => <ReviewItem data={rv} />);
        return reviewShowResult;
    };

    //****************** */
    const onChangeServing = (e) => {
        dispatch(setServing({ serving: e.target.value }));
    };

    const onClickEdit = (e) => {
        e.preventDefault();
        const value = document.getElementById('serving').value;
        const details = prevData.details;
        const math = value / prevData.serving;
        const newDetails = details.map((detail) => {
            return {
                ...detail,
                quantity: detail.quantity * math,
            };
        });
        dispatch(setDetails({ details: newDetails }));
    };

    const handleAddReviewSubmit = (event) => {
        event.preventDefault();
        const data = {
            accountId: 39,
            recipeId: Number(id),
            reviewText: inputReviewRef.current.value,
        };
        dispatch(addReview(data));
    };

    return (
        <>
            <Card className={cx('recipe-detail-card')}>
                <Card.Header>
                    <Row>
                        <Col className={cx('recipe-detail-heading')}>{recipes.title}</Col>
                    </Row>
                    <Row className={cx('recipe-content')}>
                        <Col>
                            <Button primary href="#review">
                                Review this recipe
                            </Button>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faStar} />
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faClock} />
                            <span> Ready {recipes.totalTime} min</span>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faPeopleGroup} />

                            <span> {recipes.yields} Serving</span>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className={cx('recipe-image')}>
                    <Image src={images.noImage} />
                </Card.Body>
                <Card.Footer className="text-muted">
                    <Row className={cx('recipe-more')}>
                        <Col md={6}>
                            <Image src={images.noImage} />
                            <span>Ready </span>
                        </Col>

                        <Col className={cx('recipe-more-item')}>
                            <FontAwesomeIcon icon={faClock} />
                            <FontAwesomeIcon icon={faPeopleGroup} />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
            <form className={cx('recipe-detail-wrapper')} onSubmit={onClickEdit}>
                <div className={cx('recipe-detail-container')}>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ingredient</th>
                                <th>Unit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{ingredientData}</tbody>
                    </Table>
                </div>

                <div className={cx('serving')}>
                    <div className={cx('serving-input')}>
                        <input
                            type="number"
                            id="serving"
                            min="1"
                            value={recipes.yields}
                            onChange={onChangeServing}
                        ></input>
                        <span> Serving</span>
                    </div>
                    <Button primary type="submit">
                        Edit
                    </Button>
                </div>
            </form>
            <div className={cx('recipe-instruction')}>
                <div className={cx('recipe-instruction-heading')}>
                    <h2>Instructrions</h2>
                </div>
                <div className={cx('recipe-instruction-content')}>{recipes.briefDescription}</div>
            </div>

            <form className={cx('recipe-instruction', 'recipe-review')} id="review" onSubmit={handleAddReviewSubmit}>
                <div className={cx('recipe-instruction-heading')}>
                    <h2>Review this recipe</h2>
                </div>
                <textarea ref={inputReviewRef}></textarea>
                <div className={cx('recipe-instruction-button')}>
                    <Button primary type="submit">
                        Add my review
                    </Button>
                </div>
            </form>
            <div className={cx('recipe-instruction')}>
                <div className={cx('recipe-instruction-heading')}>
                    <h2>Reviews</h2>
                </div>
                <div className={cx('recipe-addreview')}>{reviewShow()}</div>
            </div>
        </>
    );
}

export default RecipeDetail;
