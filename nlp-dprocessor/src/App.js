import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Alert
} from 'react-bootstrap';
import { Resizable } from 're-resizable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import UploadSection from './components/UploadSection';
import ETLSection from './components/ETLSection';
import PlotSection from './components/PlotSection';
import LandingSection from './components/LandingSection';
import * as api from './api/api';

function App() {
  const [data, setData] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [plotUrl, setPlotUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  {/* Handle Scrolling */}
  const uploadRef = useRef(null);
  const etlRef = useRef(null);

  const scrollToUpload = () => {
    uploadRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (uploaded) {
      etlRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [uploaded]);

  const handleUpload = async (event) => {
    event.preventDefault();
    const file = event.target.elements.file.files[0];
  
    setLoading(true);
  
    try {
      if (file) {
        await api.uploadData(file);
      } else {
        await api.getSampleData();
      }
  
      fetchData();
      setUploaded(true);
      setUploadError(false);
    } catch (error) {
      setUploadError(true);
    } finally {
      setLoading(false);
    }
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
      {/* ProgressBar and Alert components */}
      <Container fluid>
        <LandingSection handleTryNow={scrollToUpload} />
        <div ref={uploadRef}></div>
        <UploadSection handleUpload={handleUpload} />

        {uploaded && (
          <Row>
            <Resizable
              defaultSize={{ width: '50%', height: 'auto' }}
              minWidth="20%"
              maxWidth="80%"
              enable={{ top: false, right: true, bottom: false, left: false, 
                topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
            >
              <div ref={etlRef}>
                <ETLSection
                  data={data}
                  handleProcessData={handleProcessData}
                  handleRevert={handleRevert}
                />
              </div>
            </Resizable>
            <Col className="section">
              <PlotSection
                plotUrl={plotUrl}
                handlePlotData={handlePlotData}
              />
            </Col>
          </Row>
        )}
      </Container>
      <footer className="footer">Developed by Qi Zhao</footer>
    </div>
  );
}

export default App;