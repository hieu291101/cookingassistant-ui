import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from '~/components/Button';
import * as Yup from 'yup';
import config from '~/config';
// import styles from './StorageForm.module.scss';
import FormControl from '../FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { addShopping } from '~/features/shoppingSlice';
import { useFormik } from 'formik';
import FormTypeahead from '~/components/FormTypeahead';
import { getAllMeasure } from '~/features/measureSlice';

// const cx = classNames.bind(styles);

function ShoppingForm() {
    const validationSchema = Yup.object().shape({
        food: Yup.string()
            .required('field is required')
            .min(2, 'At least 2 characters')
            .max(20, 'Not exceed 20 characters'),
        measure: Yup.string().required('field is required'),
    });

    const formik = useFormik({
        initialValues: {
            food: '',
            note: '',
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
                note: data.note,
            };

            dispatch(addShopping(addData));
            formik.resetForm();
        },
    });

    // const { data: measures } = useSelector((state) => ({ ...state.measures }));
    const { data: user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMeasure());
    }, []);

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
    return (
        <Container>
            <Form onSubmit={formik.handleSubmit}>
                <FormControl
                    type="text"
                    name="food"
                    label="Food"
                    className={formik.errors.food && formik.touched.food ? 'is-invalid' : ''}
                    placeholder="Enter food"
                    value={formik.values.food}
                    onChange={formik.handleChange}
                    error={formik.errors.food}
                />

                <Row>
                    <Col>
                        <FormControl
                            name="amount"
                            label="Amount"
                            type="number"
                            placeholder="Enter amount"
                            value={formik.values.amount}
                            min="0"
                            onChange={formik.handleChange}
                        />
                    </Col>

                    <Col>
                        <FormTypeahead
                            label="Measure"
                            name="measure"
                            formik={formik}
                            labelKey="name"
                            options={measures}
                        />
                    </Col>
                </Row>

                <FormControl
                    type="text"
                    name="note"
                    label="Note"
                    className={formik.errors.note && formik.touched.note ? 'is-invalid' : ''}
                    placeholder="Enter food"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    error={formik.errors.note}
                />

                <Row>
                    <Button primary type="submit" className="m-2">
                        Add
                    </Button>
                    <Button primary to={config.routes.filter} className="m-2">
                        Choose recipe
                    </Button>
                </Row>
                {/* {message && (
                <div className="form-group">
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                </div>
            )} */}
            </Form>
        </Container>
    );
}

export default ShoppingForm;
