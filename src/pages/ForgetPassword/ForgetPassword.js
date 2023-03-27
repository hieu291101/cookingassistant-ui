import classNames from 'classnames/bind';
import Button from '~/components/Button';
import FPasswordForm from '~/layouts/components/FPasswordForm';
import styles from './ForgetPassword.module.scss';

const cx = classNames.bind(styles);

function ForgetPassword() {
    return (
        <div className={cx('login')}>
            <div className={cx('login-top')}>
                <h2>Fogot password</h2>
                <FPasswordForm />
            </div>
        
        </div>
    );
}

export default ForgetPassword;
