import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { addRecipe, setAddData } from '~/features/recipeSlice';
import AddForm from '../AddForm';

const constraintsRequired = {
    title: 'required',
    accessModifier: 'required',
    activeTime: 'required',
    briefDescription: 'required',
    cuisine: 'required',
    mainIngredient: 'required',
    preparation: 'required',
    totalTime: 'required',
    yields: 'required',
    accountId: 'required',
    categoriesSubId:'required',
};

const constraintTypeInput = {
    title: 'text',
    accessModifier: 'number',
    activeTime: 'number',
    briefDescription: 'text',
    cuisine: 'text',
    mainIngredient: 'text',
    preparation: 'text',
    totalTime: 'number',
    yields: 'number',
    accountId: 'number',
    categoriesSubId:'number',
};

const constraintsDisable = {};

const labels = [
    {
        key: 'title',
        label: 'Title',
    },
    {
        key: 'accessModifier',
        label: 'Access modifier',
    },
    {
        key: 'activeTime',
        label: 'Active time',
    },
    {
        key: 'briefDescription',
        label: 'Brief Description',
    },
    {
        key: 'cuisine',
        label: 'Cuisine',
    },
    {
        key: 'mainIngredient',
        label: 'Main ingredient',
    },
    {
        key: 'photoPath',
        label: 'Photo path',
    },
    {
        key: 'preparation',
        label: 'Preparation',
    },
    {
        key: 'totalTime',
        label: 'Total time',
    },
    {
        key: 'yields',
        label: 'Yields',
    },
    {
        key: 'accountId',
        label: 'Account ID',
    },
    {
        key: 'categoriesSubId',
        label: 'Catagory Sub ID',
    },
];

const AddRecipeForm = () => {
    const { addData } = useSelector((state) => ({ ...state.recipes }));
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleRecipeChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {
            ...addData,
        };

        newFormData[fieldName] = fieldValue;
        dispatch(setAddData({ addData: newFormData }));
    };

    const onAddRecipeSubmit = (event) => {
        event.preventDefault();
        console.log(addData);
        dispatch(addRecipe(addData));
        navigate('/admin/recipe-management/recipe');
    };
    return (
        <form onSubmit={onAddRecipeSubmit}>
            <AddForm
                labels={labels}
                constraintTypeInput={constraintTypeInput}
                constraintsRequired={constraintsRequired}
                constraintsDisable={constraintsDisable}
                onChange={handleRecipeChange}
                stateName="recipes"
            />
            <Button primary type="submit">
                Save
            </Button>
        </form>
    );
};

export default AddRecipeForm;
