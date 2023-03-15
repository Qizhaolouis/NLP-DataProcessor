import React from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

const UploadSection = ({ handleUpload }) => {
  return (
    <Row className="justify-content-center align-items-center h-100">
      <Col md={6}>
        <h1>Upload CSV or Use Sample Data</h1>
        <Form onSubmit={handleUpload}>
          <div className="mb-3">
            <Form.Group controlId="formFile">
              <Form.Label>Upload CSV</Form.Label>
              <Form.Control type="file" name="file" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </div>
          <div className="mb-3">
            <Button variant="secondary" type="submit">
              Use Sample Data
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default UploadSection;
