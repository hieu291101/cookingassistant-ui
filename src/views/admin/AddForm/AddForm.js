import { useSelector } from 'react-redux';
import styles from './AddForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AddForm = ({ labels, constraintsRequired, constraintsDisable, constraintTypeInput, onChange, stateName }) => {
    const { addData } = useSelector((state) => ({ ...state[stateName] }));

    const addForm = labels.map((column) => (
        <div className={cx('add-form')} key={column.key}>
            <div className={cx('add-form-heading')}>{column.label}:</div>

            <input
                type={constraintTypeInput ? constraintTypeInput[column.key] : null}
                className={cx('add-form-content', 'add-form-input')}
                required={constraintsRequired ? constraintsRequired[column.key] : null}
                placeholder={'Enter ' + column.label.toLowerCase() + '.....'}
                name={column.key}
                value={addData ? addData[column.key] : null}
                onChange={(event) => onChange(event)}
                disabled={constraintsDisable ? constraintsDisable[column.key] : null}
            />
        </div>
    ));

    return (
        <>
            <h2>Add</h2>
            <div className={cx('add-form-wrapper')}>{addForm}</div>
        </>
    );
};

export default AddForm;
