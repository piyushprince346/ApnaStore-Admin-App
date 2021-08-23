import React from 'react';
import { Modal, Button } from 'react-bootstrap';
function NewModal(props) {
    return (
        <div>
            <Modal size={props.size} show={props.show} onHide={props.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        props.buttons ? props.buttons.map((button, ind) =>
                            <Button key={ind} variant={button.color} onClick={button.onClick}>
                                {button.label}
                            </Button>
                        )
                            :
                            <Button variant="primary" onClick={props.handleClose}>
                                {props.buttonName ? props.buttonName : 'Create'}
                            </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NewModal;
