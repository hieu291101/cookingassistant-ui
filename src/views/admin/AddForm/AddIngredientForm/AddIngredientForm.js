import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { addIngredient, setAddData } from '~/features/ingredientSlice';
import AddForm from '../AddForm';

const constraintsRequired = {
    name: 'required',
};

const constraintTypeInput = {
    name: 'text',
    calo: 'number',
    carb: 'number',
    fiber: 'number',
    protein: 'number',
};

const constraintsDisable = {};

const labels = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'calo',
        label: 'Calories',
    },
    {
        key: 'carb',
        label: 'Carb',
    },
    {
        key: 'fiber',
        label: 'Fiber',
    },
    {
        key: 'protein',
        label: 'Protein',
    },
];

const AddIngredientForm = () => {
    const { addData } = useSelector((state) => ({ ...state.ingredients }));
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleIngredientChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        console.log(addData)

        const newFormData = {
            ...addData,
        };

        newFormData[fieldName] = fieldValue;
        console.log(newFormData)
        dispatch(setAddData({ addData: newFormData }));
    };

    const onAddIngredientSubmit = (event) => {
        event.preventDefault();
        
        dispatch(addIngredient(addData));
        navigate('/admin/recipe-management/ingredient');
    };
    return (
        <form onSubmit={onAddIngredientSubmit}>
            <AddForm
                labels={labels}
                constraintTypeInput={constraintTypeInput}
                constraintsRequired={constraintsRequired}
                constraintsDisable={constraintsDisable}
                onChange={handleIngredientChange}
                stateName="ingredients"
            />
            <Button primary type="submit">
                Save
            </Button>
        </form>
    );
};

export default AddIngredientForm;
