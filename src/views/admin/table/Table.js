import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { setDelete } from '~/features/measureSlice';
import ModalCustom from '~/components/Modal';
import styles from './Table.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Table = ({
    columns,
    items,
    isDetail,
    constraintTypeInput,
    handleEditClick,
    handleSaveClick,
    handleEditFormChange,
    handleDeleteClick,
    handleDeleteSubmit,
    handleShow,
    handleClose,
    stateName,
    keyIdName,
}) => {
    const { edit, editId, del, showDelete } = useSelector((state) => ({ ...state[stateName] }));
    const tableHeading = columns.map((column, index) => (
        <th key={index} scope={column._props.scope}>
            {column.label}
        </th>
    ));

    let tableData = [];

    tableData.push(
        items.map((item) => (
            <tr>
                {columns.map((column) => {
                    if (column.key === 'id') return <th scope={item._cellProps.id.scope}>{item[column.key]}</th>;
                    else
                        return !edit ? (
                            editId === item[keyIdName] ? (
                                <td>
                                    <input
                                        className={cx('input-' + column.key)}
                                        type={constraintTypeInput ? constraintTypeInput[column.key] : 'text'}
                                        // className={cx('detail-content', 'detail-input')}
                                        required="required"
                                        placeholder={'Enter ' + column.label.toLowerCase() + '.....'}
                                        name={column.key}
                                        value={item[column.key]}
                                        // value={editFormData.measure}
                                        min="0"
                                        onChange={handleEditFormChange}
                                        disabled={column.key.includes('Id') ? 'disabled' : null}
                                    />
                                </td>
                            ) : (
                                <td>{item[column.key]}</td>
                            )
                        ) : (
                            <td>{item[column.key]}</td>
                        );
                })}

                <td>
                    {isDetail ? <Button to={`/admin/recipe-management/recipe/${item.id}`}>Detail</Button> : null}
                    {!edit ? (
                        editId === item[keyIdName] ? (
                            <Button className="m-2" onClick={(event) => handleSaveClick(event)}>
                                Save
                            </Button>
                        ) : (
                            <Button className="m-2" onClick={(event) => handleEditClick(event, item)}>
                                <FontAwesomeIcon icon={faPen} />
                            </Button>
                        )
                    ) : null}
                    {!del ? (
                        <Button className="m-2" onClick={(event) => handleDeleteTClick(event, item)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    ) : null}
                </td>
            </tr>
        )),
    );

    const handleDeleteTClick = (event, item) => {
        handleDeleteClick(event, item);
        handleShow();
    };

    const handleDeleteTSubmit = (event) => {
        handleDeleteSubmit(event);
        handleClose();
    };

    return (
        <>
            <Button to="create" primary>
                Create
            </Button>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        {tableHeading}
                        <th></th>
                    </tr>
                </thead>
                <tbody>{tableData}</tbody>
            </table>
            <ModalCustom
                show={showDelete}
                handleClose={() => handleClose()}
                handleAction={handleDeleteTSubmit}
                buttonContent="Delete"
                message="Are you sure you want to delete"
                title="Delete"
            ></ModalCustom>
        </>
    );
};

export default Table;
