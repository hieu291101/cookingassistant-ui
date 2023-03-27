import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './ReadOnlyRow.module.scss';

const cx = classNames.bind(styles);

function ReadOnlyRowStorage({ info, index, handleEditClick, handleDeleteClick }) {
    return (
        <tr key={index} className={cx('tb-row')}>
            <td>{index + 1}</td>
            <td>{info.ingredientName}</td>
            <td>{info.quantity + ' ' + info.measure}</td>
            <td>{Intl.DateTimeFormat('sv-SE').format(info.bestBefore)}</td>
            <td className={cx('btn-wrapper')}>
                <div className={cx('btn-attach')}>
                    <Button className={cx('shopping-tb-button')} onClick={(event) => handleEditClick(event, info)}>
                        <FontAwesomeIcon icon={faPen} />
                    </Button>
                    <Button className={cx('shopping-tb-button')} onClick={(event) => handleDeleteClick(event, info)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}

export default ReadOnlyRowStorage;
