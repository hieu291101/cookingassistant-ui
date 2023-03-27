import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { addMeasure, setAddData } from '~/features/measureSlice';
import AddForm from '../AddForm';

const constraintsRequired = {
    name: 'required',
};

const constraintTypeInput = {
    name: 'text',
};

const constraintsDisable = {};

const labels = [
    {
        key: 'name',
        label: 'Name',
    },
];

const AddMeasureForm = () => {
    const { addData } = useSelector((state) => ({ ...state.measures }));
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleMeasureChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {
            ...addData,
        };

        newFormData[fieldName] = fieldValue;
        dispatch(setAddData({ addData: newFormData }));
    };

    const onAddMeasureSubmit = (event) => {
        event.preventDefault();
        
        dispatch(addMeasure(addData));
        navigate('/admin/recipe-management/measure');
    };
    return (
        <form onSubmit={onAddMeasureSubmit}>
            <AddForm
                labels={labels}
                constraintTypeInput={constraintTypeInput}
                constraintsRequired={constraintsRequired}
                constraintsDisable={constraintsDisable}
                onChange={handleMeasureChange}
                stateName="measures"
            />
            <Button primary type="submit">
                Save
            </Button>
        </form>
    );
};

export default AddMeasureForm;
