import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function ModalWindow(){
    return(
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          
            <Modal.Header closeButton>
              <Modal.Title>Add new coffee flavour</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
              
                <Form.Group>
                  <Form.Label>Coffee name</Form.Label>
                  <Form.Control type='textarea' />

                  <Form.Label>Coffee price</Form.Label>
                  <Form.Control type='input' />

                  <Form.Label>Add picture</Form.Label>
                  <Form.Control type='file' onChange={this.handleImageClick.bind(this)}/>



                </Form.Group>
                <Form.Group>
                  <Form.Control type='image' alt='Selected Picture' />
                </Form.Group>
              
            </Modal.Body>

            <Modal.Footer>
              <Button variant='secondary' onClick={this.handleClose}>Close</Button>
              <Button variant='primary' onClick={this.createCoffee}>Save</Button>
            </Modal.Footer>
            
          

        </Modal>
    );

}