import { Button, Modal } from 'react-bootstrap';

function ModalCustom({ show = false, handleClose, handleAction, buttonContent, message, title }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={(event) => handleAction(event)}>
                    {buttonContent}
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCustom;
