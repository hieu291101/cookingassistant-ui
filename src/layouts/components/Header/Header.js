import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCircleQuestion,
    faEarthAsia,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import config from '~/config';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '~/features/authSlice';
import { useState } from 'react';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const location = useLocation();
    const { data: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(true);

    const logout = () => {
        // dispatch(logoutAccount());
        dispatch(logoutUser());
    };

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            default:
        }
    };

    const handleShowBars = (event) => {
        event.preventDefault();
        const value = toggle ? false : true;
        value
            ? (document.getElementById('toggle').style.display = 'flex')
            : (document.getElementById('toggle').style.display = 'none');
        setToggle(value);
    };

    const setActiveClass = (to) => {
        if (location.pathname === to) return 'active';
        return '';
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/',
            onClick: () => logout(),
            separate: true,
        },
    ];

    return (
        <Container fluid className={cx('wrapper')}>
            <Row className={[cx('inner'), 'inner-layout'].join(' ')}>
                <Col className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt="Logo" />
                    </Link>
                </Col>

                <Col className="d-none d-md-block">
                    <Search placeholder="Search recipe.." />
                </Col>

                <Col className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Your recipe" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    {/* <span className={cx('badge')}>12</span> */}
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text to={config.routes.register}>
                                Sign up
                            </Button>
                            <Button primary to={config.routes.login}>
                                Log in
                            </Button>
                        </>
                    )}

                    <Menu items={userMenu} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image className={cx('user-avatar')} src={currentUser.email} alt="Nguyen Van A" />
                        ) : null}
                    </Menu>
                    <button className={cx('btn-bars') + ' d-block d-md-none'} onClick={(e) => handleShowBars(e)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </Col>
            </Row>
            <div id="toggle" className={cx('inner-bottom')}>
                <Nav className={cx('inner-bottom-nav') + ' flex-column flex-sm-row'}>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.home} className={cx(setActiveClass(config.routes.home))}>
                            Home
                        </Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.filter} className={cx(setActiveClass(config.routes.filter))}>
                            Recipes
                        </Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.planner} className={cx(setActiveClass(config.routes.planner))}>
                            Planner
                        </Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.storage} className={cx(setActiveClass(config.routes.storage))}>
                            Storage
                        </Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link to={config.routes.shopping} className={cx(setActiveClass(config.routes.shopping))}>
                            Shopping
                        </Link>
                    </Nav.Item>
                    <Nav.Item className={cx('nav-item')}>
                        <Link
                            to={config.routes.home}
                            className={cx(setActiveClass(config.routes.recipedetail))}
                        >
                            About
                        </Link>
                    </Nav.Item>
                </Nav>
                <div className={cx('social-link') + ' d-none d-md-block'}>
                    <Link to={config.routes.login} className={cx('logo-link')}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link to={config.routes.login} className={cx('logo-link')}>
                        <FontAwesomeIcon icon={faGoogle} />
                    </Link>
                </div>
            </div>
        </Container>
    );
}
export default Header;
