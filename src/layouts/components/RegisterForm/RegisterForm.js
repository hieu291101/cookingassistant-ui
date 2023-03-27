import classNames from 'classnames/bind';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import config from '~/config';
import AuthApi from '~/api/authApi';

import styles from './RegisterForm.module.scss';
import { useForm } from 'react-hook-form';

const cx = classNames.bind(styles);

function RegisterForm() {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setSuccessful(false);

        AuthApi.register(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            },
        );
        
        setTimeout(function() {
            navigate('/login');
        },
            3000
        )
        
    };

    return (
        <Form
            className={cx('container')}
            onSubmit={(e) => {
                handleSubmit(handleRegister(e))(e);
            }}
        >
            {!successful && (
                <>
                    <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            {...register('email')}
                            className={`${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Enter email"
                            value={email}
                            onChange={onChangeEmail}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            {...register('username')}
                            className={`${errors.username ? 'is-invalid' : ''}`}
                            placeholder="Enter username"
                            value={username}
                            onChange={onChangeUsername}
                        />
                        <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            {...register('password')}
                            className={`${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Password"
                            value={password}
                            onChange={onChangePassword}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Button primary type="submit">
                        Get started
                    </Button>
                </>
            )}

            {message && (
                <div className="form-group">
                    <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
}

export default RegisterForm;
