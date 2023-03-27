import { useEffect, useState } from 'react';
import { Accordion, Tab, Tabs } from 'react-bootstrap';
import styles from './Planner.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlanner, getPlanner } from '~/features/plannerSlice';
import TabItem from '~/components/TabItem/TabItem';
import PlannerDetailModal from '~/components/Modal/PlannerDetailModal/PlannerDetailModal';

const cx = classNames.bind(styles);

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

function Planner() {
    const [key, setKey] = useState('monday');

    const { data: user } = useSelector((state) => ({ ...state.auth }));
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlanner(user.id));
    }, []);

    const handleDeleteClick = (event, data) => {
        event.preventDefault();
        const plannerData = {
            accountId: user.id,
            dayOfWeek: data.dayOfWeek,
            meal: data.meal,
            recipeId: data.recipe.recipeId,
        };
        dispatch(deletePlanner({ data: plannerData }));
        console.log(plannerData);
    };

    const handleShowDetailClick = (event) => {
        event.preventDefault();
        handleShow();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true );
    return (
        <>
            <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                {dayOfWeek.map((day) => (
                    <Tab eventKey={day.key} title={day.value}>
                        <Accordion
                            className={cx('accourdion')}
                            alwaysOpen
                            defaultActiveKey={meal.map((m) => {
                                return m.key;
                            })}
                        >
                            {meal.map((m) => (
                                <Accordion.Item eventKey={m.key}>
                                    <Accordion.Header>{m.value}</Accordion.Header>
                                    <Accordion.Body>
                                        <TabItem
                                            dayOfWeek={day.key}
                                            meal={m.key}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Tab>
                ))}
            </Tabs>
            <div className={cx('btn-group')}>
                <Button primary>Auto complete</Button>
                <Button primary onClick={handleShowDetailClick}>
                    Show detail
                </Button>
            </div>
            <PlannerDetailModal
                show={show}
                handleClose={() => handleClose()}
                
                buttonContent="Submit"
                title="Show detail planner"
            ></PlannerDetailModal>
        </>
    );
}

export default Planner;
