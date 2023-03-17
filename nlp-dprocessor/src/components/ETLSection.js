import React from 'react';
import { Row, Col, Button, Card, Form, InputGroup, FormControl, Table } from 'react-bootstrap';
import * as api from '../api/api'; // Import the API functions

const ETLSection = ({ data, handleProcessData, handleRevert}) => {

  const formatDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}_${month}_${day}`;
  };
  
  const handleDownloadCSV = async () => {
    const csvData = await api.getCSV();
    const url = URL.createObjectURL(csvData);
    const date = formatDate();
    const link = document.createElement('a');
    link.href = url;
    link.download = `data-${date}.csv`
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  const handleDownloadCode = async () => {
    const codeData = await api.getCode();
    const url = URL.createObjectURL(codeData);
    const date = formatDate();
    const link = document.createElement('a');
    link.href = url;
    link.download = `code-${date}.py`
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };
  

  return (
    <Row>
      <Col>
        <Card style={{ backgroundColor: '#333333'}}>
          <Card.Header>
            <Row>
              <Col xs={12} md={6}>
                <h2>ETL</h2>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="success"
                    onClick={handleDownloadCSV}
                    className="mr-2"
                  >
                    Download CSV
                  </Button>
                  <Button
                    variant="info"
                    onClick={handleDownloadCode}
                    className="mr-2"
                  >
                    Download Code
                  </Button>
                  <Button variant="danger" 
                    onClick={handleRevert}
                    className="mr-2">
                    Revert
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleProcessData}>
              <InputGroup>
                <FormControl
                  placeholder="Enter ETL instruction. Example: Add a new column called rownum which is the row number."
                  name="instruction"
                  as="textarea"
                  rows={5}
                />
                <Button 
                  type="submit" 
                  variant="primary">
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
