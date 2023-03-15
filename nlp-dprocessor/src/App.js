import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  InputGroup,
  FormControl,
  Card,
  ProgressBar,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS file

function App() {
  const [data, setData] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [plotUrl, setPlotUrl] = useState(null);
  const [loading, setLoading] = useState(false); // State for progress bar

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target.elements.file.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      setLoading(true); // Start progress bar

      await axios.post('http://localhost:5000/user_data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setLoading(false); // Stop progress bar
    } else {
      await axios.post('http://localhost:5000/sample_data', {}, {
        withCredentials: true,
      });
    }
    fetchData();
    setUploaded(true);
  };

  const reloadData = () => {
    setUploaded(false);
  };

  const fetchData = async () => {
    setLoading(true); // Start progress bar

    const { data } = await axios.get('http://localhost:5000/show', {
      withCredentials: true,
    });

    setLoading(false); // Stop progress bar

    setData(data);
  };

  const handleProcessData = async (event) => {
    event.preventDefault();
    const input = event.target.elements.instruction.value;

    setLoading(true); // Start progress bar

    await axios.post(
      'http://localhost:5000/process_data',
      { instruction: input },
      { withCredentials: true }
    );

    setLoading(false); // Stop progress bar

    fetchData();
  };

  const handleRevert = async () => {
    setLoading(true); // Start progress bar

    await axios.post('http://localhost:5000/revert', {}, {
      withCredentials: true,
    });

    setLoading(false); // Stop progress bar

    fetchData();
  };

  const handlePlotData = async (event) => {
    event.preventDefault();
    const input = event.target.elements.instruction.value;

    setLoading(true); // Start progress bar

    const { data } = await axios.post(
      'http://localhost:5000/plot_data',
      { instruction: input },
      { responseType: 'blob', withCredentials: true }
    );
    const url = URL.createObjectURL(new Blob([data], { type: 'image/png' }));

    setLoading(false); // Stop progress bar

    setPlotUrl(url);
  };

  return (
    <div className="App">
      {loading && <ProgressBar now={100} animated label="Loading..." style={{ position: 'fixed' }} />}
      <Container fluid>
        {!uploaded ? (
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
        ) : (
          <>
            <Row className="mb-3">
              <Col>
                <div className="mt-3">
                  <Button variant="info" onClick={reloadData}>
                    Reload Data
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <h2>ETL</h2>
                    <Button variant="danger" onClick={handleRevert}>
                      Go Back
                    </Button>
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
                    <div
                      className="table-container"
                      style={{
                        border: '1px solid #dee2e6',
                        borderRadius: '0.25rem',
                        padding: '1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        marginTop: '1rem', 
                        height: '400px', 
                        width: '800px',
                        overflow: 'scroll',
                        overflowX: 'scroll',
                      }}
                    >
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
              <Col>
                <Card>
                  <Card.Header>
                    <h2>Plot</h2>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handlePlotData}>
                      <InputGroup>
                        <FormControl
                          placeholder="Enter plot instruction"
                          name="instruction"
                          as="textarea"
                          rows={5}
                        />
                        <Button type="submit" variant="primary">
                          Plot Data
                        </Button>
                      </InputGroup>
                    </Form>
                    {plotUrl && (
                      <img
                        src={plotUrl}
                        alt="Generated plot"
                        style={{
                          width: '100%',
                          height: '100%',
                          marginTop: '1rem',
                          zIndex: 9999,
                        }}
                      />
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
      <footer className="footer">
        Developed by Qi Zhao
      </footer>
    </div>
  );
}

export default App;
