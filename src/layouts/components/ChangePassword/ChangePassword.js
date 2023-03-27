import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import config from '~/config';

import styles from './ChangePassword.module.scss';
import AuthApi from '~/api/authApi';
import { useStore } from 'react-redux';

const cx = classNames.bind(styles);

function ChangePassword() {
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(1, "Current password is required")
            .max(40, 'Password must not exceed 40 characters'),
        passwordConfirm: Yup.string()
            .required('Password is required')
            .min(1, "Please confirm your password")
            .max(40, 'Password must not exceed 40 characters'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const store = useStore();
    const { resetCode } = useParams();
    const query = new URLSearchParams(this.props.location.search);
    const token = query.get('token')
console.log(token)//123
    let navigate = useNavigate();

    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        AuthApi.changePassword(password, resetCode).then(
            () => {
                navigate('/login');
                window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            },
        );
    };

    return (
        <Form
            className={cx('container')}
            onSubmit={(e) => {
                handleSubmit(handleLogin(e));
            }}
        >


            <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    {...register('password')}
                    className={`${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type="password"
                    {...register('passwordConfirm')}
                    className={`${errors.passwordConfirm ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
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

export default ChangePassword;
