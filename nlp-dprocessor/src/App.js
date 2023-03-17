import React, { useState, useRef, useEffect } from 'react';
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
import LandingSection from './components/LandingSection';
import * as api from './api/api';

function App() {
  const [data, setData] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [plotUrl, setPlotUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [etlSectionWidth, setEtlSectionWidth] = useState('50%');
  const [plotSectionWidth, setPlotSectionWidth] = useState('50%');

  /* Handle the size of each section */
  const handleMouseEnter = (section) => {
    if (section === 'ETL') {
      setEtlSectionWidth('80%');
      setPlotSectionWidth('20%');
    } else {
      setEtlSectionWidth('20%');
      setPlotSectionWidth('80%');
    }
  };

  const handleMouseLeave = () => {
    setEtlSectionWidth('50%');
    setPlotSectionWidth('50%');
  };

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
        <LandingSection handleTryNow={scrollToUpload} />
        <div ref={uploadRef}></div>
        <UploadSection handleUpload={handleUpload} />
        <Row>
        <Col xs={12} md={6} style={{ width: etlSectionWidth }} className="section">
          {uploaded && (
            <div ref={etlRef} onMouseEnter={() => handleMouseEnter('ETL')} onMouseLeave={handleMouseLeave}>
              <ETLSection
                data={data}
                handleProcessData={handleProcessData}
                handleRevert={handleRevert}
              />
            </div>
          )}
        </Col>
        <Col xs={12} md={6} style={{ width: plotSectionWidth }} className="section">
          {uploaded && (
            <div onMouseEnter={() => handleMouseEnter('Plot')} onMouseLeave={handleMouseLeave}>
              <PlotSection plotUrl={plotUrl} handlePlotData={handlePlotData} />
            </div>
          )}
        </Col>
      </Row>
      </Container>
      <footer className="footer">Developed by Qi Zhao</footer>
    </div>
  );
}

export default App;