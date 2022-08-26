import TabsBox from "./TabsBox";
import { Form, Modal, Button } from "react-bootstrap";
import { useRef } from "react";
import { useTabs } from "../../contexts/TabsContext";

export default function AddTabsBoxModal({ show, handleClose }) {
   const nameRef = useRef();
   const priceRef = useRef();
   const { addMenuTabs, menuTabs } = useTabs();
    function handleSubmit(e){
        e.preventDefault();
        addMenuTabs({
          name: nameRef.current.value,
          price: priceRef.current.value
        })
        handleClose();
    }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title> New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="itemName">
            <Form.Label>Name</Form.Label>
            <Form.Control autoComplete="off" ref={nameRef} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="itemPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" ref={priceRef} min={0} step={0.01} />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="sumbit">Add</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
