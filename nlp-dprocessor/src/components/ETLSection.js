import React from 'react';
import { Row, Col, Button, Card, Form, InputGroup, FormControl, Table } from 'react-bootstrap';

const ETLSection = ({ data, handleProcessData, handleRevert }) => {
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col xs={12} md={10}>
        <h2>ETL</h2></Col>
      <Col>
      <div className="d-flex justify-content-end">
        <Button variant="danger" onClick={handleRevert}>
          Revert
        </Button>
        </div></Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleProcessData}>
              <InputGroup>
                <FormControl
                  placeholder="Enter ETL instruction"
                  name="instruction"
                  as="textarea"
                  rows={5}
                />
                <Button type="submit" variant="primary">
                  Process Data
                </Button>
              </InputGroup>
            </Form>
            <div className="table-container">
              <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {data &&
                    Object.keys(data[0]).map((key) => (
                      <th key={key}>
                        <div style={{ color: '#999999' }}>
                          {typeof data[0][key] === 'number'
                            ? 'number'
                            : 'string'}
                        </div>
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, i) => (
                        <td key={i}>{value}</td>
                      ))}
                    </tr>
                  ))}
              </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ETLSection;
