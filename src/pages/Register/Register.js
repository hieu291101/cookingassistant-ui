import classNames from 'classnames/bind';
import RegisterForm from '~/layouts/components/RegisterForm';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('login')}>
            <div className={cx('login-top')}>
                <h2>Join for free</h2>
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;
