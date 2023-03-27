import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from '~/components/Button';
import * as Yup from 'yup';
import styles from './StorageForm.module.scss';
import FormControl from '../FormControl';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addStorage } from '~/features/storageSlice';
import { useFormik } from 'formik';
import { getAllMeasure } from '~/features/measureSlice';
import FormTypeahead from '~/components/FormTypeahead';

const cx = classNames.bind(styles);

function StorageForm() {
    const validationSchema = Yup.object().shape({
        food: Yup.string()
            .required('field is required')
            .min(2, 'At least 2 characters')
            .max(20, 'Not exceed 20 characters'),
        bestbefore: Yup.date().typeError('field is required').min(new Date(), 'must be after current date'),
        measure: Yup.string().required('field is required'),
    });

    const formik = useFormik({
        initialValues: {
            food: '',
            bestBefore: Intl.DateTimeFormat('sv-SE').format(new Date()),
            amount: 0,
            measure: '',
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: (data) => {
            const addData = {
                accountId: user.id,
                ingredientName: data.food,
                quantity: data.amount,
                measure: data.measure,
                bestBefore: new Date(data.bestBefore).toJSON(),
            };

            dispatch(addStorage(addData));
            formik.resetForm();
        },
    });
    const [message, setMessage] = useState('');

    const formikValues = formik.values;
    // const { data: measures } = useSelector((state) => ({ ...state.measures }));
    const { data: user } = useSelector((state) => ({ ...state.auth }));
    const measures = [
        {
            measureId: 2,
            name: 'cans',
        },
        {
            measureId: 3,
            name: 'gram',
        },
        {
            measureId: 4,
            name: 'kg',
        },
        {
            measureId: 105,
            name: 'cup',
        },
    ];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMeasure());
    }, []);

    return (
        <Form className={cx('container')} onSubmit={formik.handleSubmit}>
            <FormControl
                name="food"
                label="Food"
                className={formik.errors.food && formik.touched.food ? 'is-invalid' : ''}
                placeholder="Enter food"
                value={formikValues.food}
                onChange={formik.handleChange}
                error={formik.errors.food}
            />
            <FormControl
                name="bestBefore"
                label="Best before"
                type="date"
                className={formik.errors.bestBefore && formik.touched.bestBefore ? 'is-invalid' : ''}
                placeholder="Enter username"
                value={formikValues.bestBefore}
                onChange={formik.handleChange}
                error={formik.errors.bestbefore}
            />

            <Row>
                <Col>
                    <FormControl
                        name="amount"
                        label="Amount"
                        type="number"
                        placeholder="Enter amount"
                        value={formikValues.amount}
                        min="0"
                        onChange={formik.handleChange}
                    />
                </Col>

                <Col>
                    <FormTypeahead label="Measure" name="measure" formik={formik} labelKey="name" options={measures} />
                </Col>
            </Row>

            <Button primary type="submit">
                Add
            </Button>

            {message && (
                <div className="form-group">
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </Form>
    );
}

StorageForm.propTypes = {};

export default StorageForm;
