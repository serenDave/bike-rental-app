import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const CreateRent = (props) => {
    return (
        <Form className="create-rent" onSubmit={(e) => props.handleSubmit(e)}>
            <Form.Row>
                <Col>
                    <Form.Control placeholder="Ex.Cannondale S6" ref={props.nameInput} />
                </Col>
                <Col>
                    <Form.Control as="select" custom id="type" ref={props.typeSelect}>
                        <option>road</option>
                        <option>mountain</option>
                        <option>city</option>
                        <option>custom</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control placeholder={99.0} id="price" ref={props.priceInput} type="number" step="any" min={0} />
                </Col>
                <Col>
                    <Button variant="success" type="submit" className="submit-btn">
                        Submit rent
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default CreateRent;
