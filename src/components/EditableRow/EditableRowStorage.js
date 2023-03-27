
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './EditableRow.module.scss';

const cx = classNames.bind(styles);

function EditableRowStorage({ editFormData, index, handleEditFormChange }) {
    return (
        <tr key={index} className={cx("tb-row")}>
            <td>{index}</td>
            <td>
                {editFormData.ingredientName}
            </td>
            <td className={cx("unit-tbd")}>
                <input
                    type="number"
                    className={cx("quantity-input", "edit-input")}
                    required="required"
                    placeholder="Enter amount..."
                    name="quantity"
                    value={editFormData.quantity}
                    onChange={handleEditFormChange}
                >
                    
                </input>
                <input 
                    type="text"
                    className={cx("measure-input", "edit-input")}
                    required="required"
                    placeholder="Enter measure..."
                    name="measure"
                    value={editFormData.measure}
                    onChange={handleEditFormChange}
                >
                    
                </input>
            </td>
            <td>
                <input
                    type="date"
                    className={cx("edit-input")}
                    placeholder="Enter bb..."
                    name="bestBefore"
                    value={editFormData.bestBefore}
                    onChange={handleEditFormChange}
                >
                    
                </input>
            </td>
            <td className={cx('btn-wrapper')}>
                <div className={cx('btn-attach')}>
                    <Button className={cx('shopping-tb-button')}>
                        Save
                    </Button>
                </div>
            </td>
        </tr>
    );
}

export default EditableRowStorage;
