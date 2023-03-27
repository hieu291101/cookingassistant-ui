import { Button, Dropdown, DropdownButton, Modal, Table } from 'react-bootstrap';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PlannerDetailModal.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function PlannerDetailModal({ show = false, handleClose, handleAction, buttonContent, message, title }) {
    const dayOfWeek = [
        { key: 'monday', value: 'Monday' },
        { key: 'tuesday', value: 'Tuesday' },
        { key: 'wednesday', value: 'Wednesday' },
        { key: 'thusday', value: 'Thusday' },
        { key: 'friday', value: 'Friday' },
        { key: 'saturday', value: 'Saturday' },
        { key: 'sunday', value: 'Sunday' },
    ];

    const meal = [
        { key: 'breakfast', value: 'Breakfast' },
        { key: 'lunch', value: 'Lunch' },
        { key: 'dinner', value: 'Dinner' },
    ];

    const [dayValue, setDayValue] = useState('Monday');
    const [mealValue, setMealValue] = useState('Breakfast');

    const { data: planner } = useSelector((state) => ({ ...state.planner }));

    const handleDaySelect = (e) => {
        setDayValue(dayOfWeek[e]);
    };

    const handleMealSelect = (e) => {
        setMealValue(meal[e]);
    };

    const tableDeatailPlanner = () => {};

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {tableDeatailPlanner}
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            {dayOfWeek.map((day) => (
                                <th key={day.key}>{day.value}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={cx('button', 'btn-action')}
                    onClick={(event) => handleAction(event, dayValue, mealValue)}
                >
                    {buttonContent}
                </Button>
                <Button variant="secondary" className={cx('button')} onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PlannerDetailModal;
