import Button from '~/components/Button';
import { SearchIcon } from '~/components/Icons';
import styles from './PlannerSidebar.module.scss';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeItem from '~/components/RecipeItem';
import config from '~/config';
import { searchRecipe } from '~/features/recipeSlice';
import PlannerModal from '~/components/Modal/PlannerModal';
import { addPlanner } from '~/features/plannerSlice';

const cx = classNames.bind(styles);

function PlannerSidebar() {
    const [searchValue, setSearchValue] = useState('');
    const [show, setShow] = useState(false);
    const [recipeId, setRecipeId] = useState(null);
    const dispatch = useDispatch();
    const { data: recipes, loading } = useSelector((state) => ({ ...state.recipes }));
    const { data: user } = useSelector((state) => ({ ...state.auth }));

    const inputRef = useRef();

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        const params = {
            title: inputRef.current.value,
            page: 1,
            limit: 20,
        };
        dispatch(searchRecipe(params));
    };

    const handleRecipeItemClick = (e, recipe) => {
        e.preventDefault();
        handleShow();
        setRecipeId(recipe.recipeId);
    };

    const handleAddPlannerClick = async (e, dayOfWeek, meal) => {
        e.preventDefault();
        const data = {
            accountId: user.id,
            recipeId: recipeId,
            dayOfWeek: dayOfWeek,
            meal: meal,
        };
        await dispatch(addPlanner(data));
        handleClose();
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const recipesResult = recipes.map((rec) => {
        return <RecipeItem data={rec} handleRecipeItemClick={handleRecipeItemClick} />;
    });

    return (
        <>
            <h2 className={cx('heading')}>Find recipe</h2>
            <form className={cx('search')} onSubmit={onSubmitSearch}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Enter recipe name"
                    spellCheck={false}
                    onChange={handleChange}
                />

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon />
                </button>
            </form>
            <div className={cx('result-search')}>
                {loading ? <span className="spinner-border m-3"></span> : <>{recipesResult}</>}
            </div>
            <div className={cx('search-suggest')}>
                <p>Click filter to choose recipe more easy</p>
                <Button to={config.routes.filter} primary className={cx('btn-more')}>
                    Filter
                </Button>
            </div>
            <PlannerModal
                show={show}
                handleClose={() => handleClose()}
                handleAction={handleAddPlannerClick}
                buttonContent="Submit"
                title="Choose your meal"
            ></PlannerModal>
        </>
    );
}

export default PlannerSidebar;
