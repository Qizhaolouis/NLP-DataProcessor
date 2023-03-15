import React, { useState, useEffect} from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  ProgressBar,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import UploadSection from './components/UploadSection';
import ETLSection from './components/ETLSection';
import PlotSection from './components/PlotSection';
import * as api from './api/api';

function App() {
  const [data, setData] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [plotUrl, setPlotUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target.elements.file.files[0];

    setLoading(true);

    if (file) {
      await api.uploadData(file);
    } else {
      await api.getSampleData();
    }

    fetchData();
    setUploaded(true);
    setLoading(false);
  };

  const reloadData = () => {
    setUploaded(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const fetchedData = await api.fetchData();
    setLoading(false);
    setData(fetchedData);
  };

  const handleProcessData = async (event) => {
    event.preventDefault();
    const input = event.target.elements.instruction.value;

    setLoading(true);
    await api.processData(input);
    setLoading(false);

    fetchData();
  };

  const handleRevert = async () => {
    setLoading(true);
    await api.revertData();
    setLoading(false);

    fetchData();
  };

  const handlePlotData = async (event) => {
    event.preventDefault();
    const input = event.target.elements.instruction.value;

    setLoading(true);
    const imageData = await api.plotData(input);
    const url = URL.createObjectURL(new Blob([imageData], { type: 'image/png' }));
    setLoading(false);

    setPlotUrl(url);
  };

  return (
    <div className="App">
      {loading && (
        <ProgressBar
          now={100}
          animated
          label="Loading..."
          style={{ position: 'fixed' }}
        />
      )}
      <Container fluid>
        {!uploaded ? (
          <UploadSection handleUpload={handleUpload} />
        ) : (
          <>
            <Row className="mb-3">
              <Col>
                <div className="mt-3">
                  <Button variant="primary" onClick={reloadData}>
                    Upload Data
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
            <ETLSection
              data={data}
              handleProcessData={handleProcessData}
              handleRevert={handleRevert}
            /></Col>
            <Col xs={12} md={6}>
            <PlotSection 
            plotUrl={plotUrl} 
            handlePlotData={handlePlotData} />
            </Col>
          </Row>
          </>
        )}
      </Container>
      <footer className="footer">Developed by Qi Zhao</footer>
    </div>
  );
}

export default App;
