import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Modal = (props) =>{
    const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
return(
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
        <ModalBody>
        Are you sure you want to delete this?
        This action cannot be undone. The data is lost permanently.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
);
}
export default Modal;