import { Card } from 'react-bootstrap';
import classNames from 'classnames/bind';
import images from '~/assets/images/';
import styles from './RecipeCard.module.scss';
import Image from '~/components/Image';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '~/features/recipeSlice';
import { addToShopping } from '~/features/shoppingSlice';
import { useEffect, useState } from 'react';
import ModalCustom from '~/components/Modal';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function RecipeCard({ data }) {
    const { data: user } = useSelector((state) => ({ ...state.auth }));
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowShoppingCart = (event) => {
        event.preventDefault();
        handleShow();
    };

    const handleShoppingCartClick = (event) => {
        event.preventDefault();
        if (data && data.recipeId) {
            dispatch(getRecipeDetail(data.recipeId));

            const addData = {
                accountId: user.id,
                recipeId: data.recipeId,
            };
            dispatch(addToShopping(addData));
        } else {
            alert('Fail to get ingredients');
        }
        navigate('/shopping');
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card className={cx('recipe-card')}>
                <Card.Img variant="top" src={images.noImage} />
                <Card.Body>
                    <Card.Title className={cx('recipe-card-title')}>{'title' && data.title}</Card.Title>
                    <Card.Text className={cx('recipe-card-description')}>
                        {'description' && data.briefDescription}
                    </Card.Text>
                    <div className={cx('recipe-card-bottom')}>
                        <div className={cx('recipe-card-owner')}>
                            <Image src={images.noImage} />
                            <span className={cx('owner-name')}>owner name</span>
                        </div>

                        <div className={cx('recipe-card-button')}>
                            <Button rounded>
                                <FontAwesomeIcon icon={faKitchenSet} />
                            </Button>
                            <Button rounded onClick={handleShowShoppingCart}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            <ModalCustom
                show={show}
                handleClose={() => handleClose()}
                handleAction={handleShoppingCartClick}
                buttonContent="Add"
                message="Are you sure you want to add ingredients of this recipe"
                title="Add to shopping"
            ></ModalCustom>
        </>
    );
}

export default RecipeCard;
