import classNames from 'classnames/bind';
import ChangePassword from '~/layouts/components/ChangePassword';
import styles from './ChangePasswordP.module.scss';

const cx = classNames.bind(styles);

function ChangePasswordP() {
    return (
        <div className={cx('login')}>
            <div className={cx('login-top')}>
                <h2>Change Password</h2>
                <ChangePassword />
            </div>
        </div>
    );
}

export default ChangePasswordP;
