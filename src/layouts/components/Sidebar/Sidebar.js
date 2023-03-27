import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import config from '~/config';
import Search from '../Search';
import Button from '~/components/Button';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import RecipeApi from '~/api/recipesApi';
import { useDispatch } from 'react-redux';
import { filterRecipe, getRecipe } from '~/features/recipeSlice';


const cx = classNames.bind(styles);

function Sidebar() {
    const [totaltime, setTotaltime] = useState(0);
    const [cuisine, setCuisine] = useState('');

    const dispatch = useDispatch();

    const onChangeTotaltime = (event) => {
        setTotaltime(event.target.value);
    };

    const onChangeCuisine = (event) => {
        setCuisine(event.target.value);
    };

    const onClickfilterRecipe = (event) => {
        event.preventDefault();
        const params = {
            limit: 10,
            page: 1,
            total_time: totaltime,
            cuisine: cuisine,
        }
        dispatch(filterRecipe(params));
        handleReset();
    };

    const handleReset = (event) => {
        event.preventDefault();
        const params = {
            limit: 10,
            page: 1,
        }
        dispatch(getRecipe(params));
        setTotaltime(0);
        setCuisine('');
    };
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="My recipes"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
            </Menu>
            <h2 className={cx('heading-filter')}>Filter recipes</h2>
            <p>Fill mulltiple condition below to narrow recipe search results:</p>
            <Form>
                <Form.Group className={cx('filter-condition', 'mb-3')} controlId="formBasicEmail">
                    <Form.Label>Total time</Form.Label>
                    <Form.Control
                        type="number"
                        min="0"
                        max="24"
                        placeholder="Enter time to cook.."
                        value={totaltime}
                        onChange={onChangeTotaltime}
                    />
                    <Form.Text className="text-muted">Fill time to cook</Form.Text>
                </Form.Group>

                <Form.Group className={cx('filter-condition', 'mb-3')} controlId="formBasicPassword">
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter cuisine..."
                        value={cuisine}
                        onChange={onChangeCuisine}
                    />
                </Form.Group>
                <div className={cx('btn-filter')}>
                    <Button primary onClick={handleReset}>
                        Reset
                    </Button>
                    <Button primary type="submit" onClick={onClickfilterRecipe}>
                        Apply
                    </Button>
                </div>
            </Form>
        </aside>
    );
}

export default Sidebar;
