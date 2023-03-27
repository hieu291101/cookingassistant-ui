import { Form } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './FormControl.module.scss';

const cx = classNames.bind(styles);

function FormControl({ type = 'text', label, placeholder, register, className, value, onChange, error, ...props }) {
    return (
        <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')} controlId="formBasicUsername">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                {...register}
                className={className}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormControl;
