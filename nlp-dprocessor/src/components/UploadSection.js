import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const UploadSection = ({ handleUpload }) => {
  return (
    <Row className="justify-content-center align-items-center min-vh-100">
      <Col md={6}>
        <h1>ConvoConver Data Processor</h1>
        <Form onSubmit={handleUpload}>
          <div className="mb-3">
            <Form.Group controlId="formFile">
              <Form.Label>Please upload a csv file smaller than 1 MB. If no file uploaded, sample data will be used.</Form.Label>
              <Form.Control type="file" name="file" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Start
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default UploadSection;
