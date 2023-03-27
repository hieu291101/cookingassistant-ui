import classNames from 'classnames/bind';
import {  useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import config from '~/config';

import styles from './LoginForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '~/features/authSlice';
import { useFormik } from 'formik';

const cx = classNames.bind(styles);

function LoginForm() {
    let navigate = useNavigate();
    const { loading, isSuccess } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Email/ Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            // acceptTerms: false,
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: (data) => {
            const loginData = {
                username: data.username,
                password: data.password
            }
        
            dispatch(loginAccount(loginData));
            if(!loading && isSuccess) {
                navigate('/');
            }
            formik.resetForm();
        },
    });

    

    // const handleLogin = (e) => {
    //     e.preventDefault();

    //     setMessage('');
    //     try {
    //         const data = {
    //             username: username,
    //             password: password
    //         }
    //         dispatch(loginAccount(data));
    //         navigate('/');
    //     } catch(error) {
    //         const resMessage =
    //         (error.response && error.response.data && error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    //         setMessage(resMessage);
    //     }
    // };

    return (
        <Form
            className={cx('container')}
            onSubmit={formik.handleSubmit}
        >
            <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicEmail">
                <Form.Label>Email/ Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    className={formik.errors.username && formik.touched.username? 'is-invalid' : ''}
                    placeholder="Enter email"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={cx('form-group', 'mb-3', 'form-group-option')} controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out"/>
                <Link to={config.routes.forgotpassword} className={cx('sign-up-link')}>
                    Trouble singing in?
                </Link>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                <span>Sign in</span>
            </Button>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
}

export default LoginForm;
