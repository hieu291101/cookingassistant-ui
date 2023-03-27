import { Form, Table } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from './Storage.module.scss';
import Button from '~/components/Button';
import { Fragment, useEffect, useState } from 'react';
import ModalCustom from '~/components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStorage, editStorage, getStorage, setDelete } from '~/features/storageSlice';
import { EditableRowStorage } from '~/components/EditableRow';
import { ReadOnlyRowStorage } from '~/components/ReadOnlyRow';
import SuggestApi from '~/api/suggestApi';

const cx = classNames.bind(styles);

function Storage() {
    const [buttonContent, setButtonContent] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [ingredientName, setIngredientName] = useState('');
    const [editStorageId, setEditStorageID] = useState(null);
    const [editFormData, setEditFormData] = useState({
        ingredientName: '',
        quantity: 0,
        measure: '',
        bestBefore: new Date(),
    });

    const dispatch = useDispatch();
    const { data: storages, showDelete } = useSelector((state) => ({ ...state.storages }));
    const { data: user } = useSelector((state) => ({ ...state.auth }));

    useEffect(() => {
        dispatch(getStorage(user.id));
    }, []);

    const handleDeleteClick = (event, info) => {
        event.preventDefault();
        setButtonContent('Delete');
        setIngredientName(info.ingredientName);
        handleShow();
    };

    const handleDeleteSubmit = (event) => {
        event.preventDefault();
        dispatch(deleteStorage({ id: user.id, ingredientName: ingredientName }));
        handleClose();
    };

    const handleEditClick = (event, info) => {
        event.preventDefault();
        setEditStorageID(info.ingredientName);

        const formValues = {
            ingredientName: info.ingredientName,
            quantity: info.quantity,
            measure: info.measure,
            bestBefore: info.bestBefore,
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
            bestBefore: editFormData.bestBefore ? editFormData.bestBefore : new Date(),
        };

        dispatch(editStorage({ accountId: user.id, ingredientName: editStorageId, data: editedData }));
        setEditStorageID(null);
    };

    const handleGenerateRecipe = (event) => {
        event.preventDefault();
        const ingredients = storages ? storages.map((info) => info.ingredientName) : null;
        const data = { ingredients: ingredients, maxCookingTime: minutes };
        SuggestApi.suggestIngredient(data).then((data) => console.log(data));
    };

    const handleClose = () => dispatch(setDelete({ showDelete: false }));
    const handleShow = () => dispatch(setDelete({ showDelete: true }));

    const storageRows = storages
        ? storages.map((info, index) => {
              return (
                  <Fragment>
                      {editStorageId === info.ingredientName ? (
                          <EditableRowStorage
                              editFormData={editFormData}
                              index={index}
                              handleEditFormChange={handleEditFormChange}
                          />
                      ) : (
                          <ReadOnlyRowStorage
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
                            <th>Best before</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{storageRows}</tbody>
                </Table>
            </form>
            <div className={cx('suggest-wrapper')}>
                <div className={cx('suggest-description')}>
                    <h2>Suggestion</h2>
                    <p>
                        Assistant will try to generate a list of recipes for each course by ingredients you already have
                        in your food storage. Please select the couses you want to have in your meal and then click
                        "Generate"
                    </p>
                </div>
                <Form.Group className={cx('form-group', 'mb-3')} controlId="formBasicEmail">
                    <span>How much time do you have?</span>
                    <div className={cx('form-input')}>
                        <Form.Control
                            type="number"
                            name="minutes"
                            placeholder="Enter minutes..."
                            min="0"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value)}
                        />
                        <span>minutes</span>
                    </div>

                    <Button primary onClick={handleGenerateRecipe}>
                        Generate
                    </Button>

                    {/* <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback> */}
                </Form.Group>
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

export default Storage;
