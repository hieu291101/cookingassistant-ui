import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '~/constants';
import LoginForm from '~/layouts/components/LoginForm';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('login')}>
            <div className={cx('login-top')}>
                <h2>Sign In</h2>
                <LoginForm />
            </div>
            <div className={cx('login-bottom')}>
                <Button primary href={FACEBOOK_AUTH_URL}>Continue with Facebook</Button>
                <Button primary href={GOOGLE_AUTH_URL}>Continue with Google</Button>
            </div>
        </div>
    );
}

export default Login;
