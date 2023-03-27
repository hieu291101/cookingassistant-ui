import { Typeahead } from 'react-bootstrap-typeahead';
import classNames from 'classnames/bind';
import styles from './FormTypeahead.module.scss';
import { Form } from 'react-bootstrap';

const cx = classNames.bind(styles);

const FormTypeahead = ({label, name, formik, labelKey, options, props}) => {
    return (
        <Form.Group className={cx('form-group', 'mb-3', 'form-group-main')}>
            <Form.Label>{label}</Form.Label>
            <Typeahead
                id={name}
                name={name}
                multiple={false}
                onChange={(selected) => {
                  const value = selected.length > 0 ? selected[0][labelKey]: "";
                  formik.values[name] = value;
                }}
                onInputChange={(text) => formik.values[name] = text}
                onBlur={() => formik.setTouched(true)}
                allowNew={true}
                labelKey={labelKey}
                options={options}
                {...(formik.touched.measure && formik.errors.measure
                  ? { isInvalid: true, className: "is-invalid" }
                  : { isValid: true})}
                {...props}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.measure}</Form.Control.Feedback>
        </Form.Group>
    );
}

export default FormTypeahead;
