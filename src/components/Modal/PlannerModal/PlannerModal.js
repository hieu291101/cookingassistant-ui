import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PlannerModal.module.scss';

const cx = classNames.bind(styles);

function PlannerModal({ show = false, handleClose, handleAction, buttonContent, message, title }) {
    const dayOfWeek = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thusday: 'Thusday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
    };

    const meal = {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
    };

    const [dayValue, setDayValue] = useState('Monday');
    const [mealValue, setMealValue] = useState('Breakfast');

    const handleDaySelect = (e) => {
        setDayValue(dayOfWeek[e]);
    };

    const handleMealSelect = (e) => {
        setMealValue(meal[e]);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title={dayValue}
                    className={cx('dropdown', 'mt-2')}
                    onSelect={handleDaySelect}
                >
                    {Object.keys(dayOfWeek).map((key) => (
                        <Dropdown.Item key={key} eventKey={key} className={cx('dropdown-item')}>
                            {dayOfWeek[key]}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                <DropdownButton
                    id="dropdown-button-dark-example2"
                    variant="secondary"
                    menuVariant="dark"
                    title={mealValue}
                    className={cx('dropdown', 'mt-2')}
                    onSelect={handleMealSelect}
                >
                    {Object.keys(meal).map((key) => (
                        <Dropdown.Item key={key} eventKey={key} className={cx('dropdown-item')}>
                            {meal[key]}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
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

export default PlannerModal;
