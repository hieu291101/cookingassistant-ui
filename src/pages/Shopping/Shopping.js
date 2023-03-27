import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Shopping.module.scss';
import Button from '~/components/Button';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShopping, editShopping, getShopping, setDelete, deleteAllShopping } from '~/features/shoppingSlice';
import ModalCustom from '~/components/Modal';
import ReadOnlyRow from '~/components/ReadOnlyRow';
import EditableRow from '~/components/EditableRow';
import ReportApi from '~/api/reportApi';

const cx = classNames.bind(styles);

function Shopping() {
    const [buttonContent, setButtonContent] = useState('');
    const [ingredientName, setIngredientName] = useState('');
    const [editShoppingId, setEditShoppingID] = useState(null);
    const [editFormData, setEditFormData] = useState({
        ingredientName: '',
        quantity: 0,
        measure: '',
        note: '',
    });

    const dispatch = useDispatch();
    const { data: shoppinglist, showDelete } = useSelector((state) => ({ ...state.shoppings }));
    const { data: user } = useSelector((state) => ({ ...state.auth }));

    useEffect(() => {
        dispatch(getShopping(user.id));
    }, []);

    const handleDeleteClick = (event, info) => {
        event.preventDefault();
        setButtonContent('Delete');
        setIngredientName(info.ingredientName);
        handleShow();
    };

    const handleDeleteSubmit = (event) => {
        event.preventDefault();
        dispatch(deleteShopping({ id: user.id, ingredientName: ingredientName }));
        handleClose();
    };

    const handleEditClick = (event, info) => {
        event.preventDefault();
        setEditShoppingID(info.ingredientName);

        const formValues = {
            ingredientName: info.ingredientName,
            quantity: info.quantity,
            measure: info.measure,
            note: info.note,
        };
        setEditFormData(formValues);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {
            ...editFormData,
        };

        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedData = {
            accountId: user.id,
            ingredientName: editFormData.ingredientName,
            quantity: editFormData.quantity,
            measure: editFormData.measure,
            note: editFormData.note ? editFormData.note : '',
        };

        dispatch(editShopping({ accountId: user.id, ingredientName: editShoppingId, data: editedData }));
        setEditShoppingID(null);
    };

    const handleExportClick = (event) => {
        event.preventDefault();
        console.log('hello');
        try {
            ReportApi.exportExcelShopping(user.id);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleResetClick = (event) => {
        event.preventDefault();
        if (shoppinglist.length > 0) dispatch(deleteAllShopping(user.id));
    };

    const handleClose = () => dispatch(setDelete({ showDelete: false }));
    const handleShow = () => dispatch(setDelete({ showDelete: true }));

    const shoppingRows = shoppinglist
        ? shoppinglist.map((info, index) => {
              return (
                  <Fragment>
                      {editShoppingId === info.ingredientName ? (
                          <EditableRow
                              editFormData={editFormData}
                              index={index}
                              handleEditFormChange={handleEditFormChange}
                          />
                      ) : (
                          <ReadOnlyRow
                              info={info}
                              index={index}
                              handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick}
                          />
                      )}
                  </Fragment>
              );
          })
        : null;

    return (
        <>
            <form className={cx('storage-wrapper')} onSubmit={handleEditFormSubmit}>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ingredient</th>
                            <th>Unit</th>
                            <th>Note</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{shoppingRows}</tbody>
                </Table>
            </form>
            <div className={cx('wrapper')}>
                <div className={cx('shopping-export')}>
                    <Button primary onClick={handleExportClick}>
                        <FontAwesomeIcon icon={faFileExport} />
                        Export
                    </Button>
                </div>

                <div className={cx('shopping-button')}>
                    <Button primary>Invite people</Button>
                    <Button primary onClick={handleResetClick}>
                        Clear list
                    </Button>
                </div>
            </div>
            <ModalCustom
                show={showDelete}
                handleClose={() => handleClose()}
                handleAction={handleDeleteSubmit}
                buttonContent={buttonContent}
                message="Are you sure you want to delete"
                title="Delete"
            ></ModalCustom>
        </>
    );
}

export default Shopping;
