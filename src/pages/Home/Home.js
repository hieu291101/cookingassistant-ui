import classNames from 'classnames/bind';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import Image from '~/components/Image';
import images from '~/assets/images/';
import styles from './Home.module.scss';
import './Home.css';
import { useEffect, useState } from 'react';
import RecipeCard from '~/components/RecipeCard';
import Button from '~/components/Button';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { filterRecipe, getRecipe } from '~/features/recipeSlice';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => ({...state.recipes}));

    useEffect(() => {
        const params = {
            limit: 8,
            page: 1
        }
        dispatch(getRecipe(params));
    }, []);

    const recipeCols = recipes.data.map((info, index) => {
        return ( 
            <Col md={4} xl={3} key={index}>
                <Link to={`/recipes/${info.recipeId}`}>
                    <RecipeCard data={info} />
                </Link>
            </Col>
        );
    });

    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <Image className="d-block w-100" src={images.carousel1} alt="First slide" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src={images.carousel2} alt="First slide" />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image className="d-block w-100" src={images.carousel3} alt="First slide" />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container>
                <Row>
                    {recipeCols}
                </Row>
                <Row>
                    <Col className={cx('btn-wrapper')}>
                        <Button to="/filter" primary className={cx('btn-more')}>
                            More
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home;
