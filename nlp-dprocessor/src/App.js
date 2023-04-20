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
import mermaid from 'mermaid';
import * as d3 from 'd3';
import './styles/Background.css';
import './styles/App.css';
import UploadSection from './components/UploadSection';
import ETLSection from './components/ETLSection';
import PlotSection from './components/PlotSection';
import LandingSection from './components/LandingSection';
import WorkflowSection from './components/WorkflowSection';
import * as api from './api/api';

function App() {
  const [data, setData] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [plotUrl, setPlotUrl] = useState(null);
  const [mermaidCode, setMermaidCode] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [uploadError, setUploadError] = useState(false);
  const [scroll, setScroll] = useState(false);
  const uploadRef = useRef(null);
  const etlRef = useRef(null);
  const workflowRef = useRef(null);

  const createBackground = () => {
    const container = d3.select('.App').append('div').attr('class', 'background');
  
    // Add dark green stripes
    for (let i = 0; i < 10; i++) {
      container
        .append('div')
        .attr('class', 'square')
        .style('background-color', 'rgba(0, 0, 139, 0.5)')
        .style('width', '100px')
        .style('height', '100px')
        .style('position', 'absolute')
        .style('top', `${Math.random() * 100}vh`)
        .style('left', `${Math.random() * 100}vw`);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
  
    d3.selectAll('.square')
      .style('transform', (d, i) => `translateY(${scrollY * (i % 5) * 0.1}px)`);
  
    d3.selectAll('.stripe')
      .style('transform', (d, i) => `translateY(${scrollY * (i % 5) * 0.05}px)`);
  };


  useEffect(() => {
    createBackground();
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToUpload = () => {
    uploadRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWorkflow = () => {
    workflowRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const CustomHandle = (props) => {
    const { className, ...restProps } = props;
    return <div className={`${className} resize-handle`} {...restProps} />;
  };

  useEffect(() => {
    if (scroll) {
      etlRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setScroll(false)
  }, [scroll]);

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
      setScroll(true)
      setUploadError(false);
    } catch (error) {
      alert("Instruction failed!");
      setUploadError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
    const fetchedData = await api.fetchData();
    setData(fetchedData);
    } catch (error) {
    alert("Instruction failed!");
    } finally {
    setLoading(false);
    }
    };
    
  const handleProcessData = async (event) => {
    event.preventDefault();
    const input = event.target.elements.instruction.value;
    setLoading(true);
    try {
      await api.processData(input);
      fetchData();
    } catch (error) {
      alert("Instruction failed!");
    } finally {
      setLoading(false);
    }
    };

const handleRevert = async () => {
setLoading(true);
try {
await api.revertData();
fetchData();
} catch (error) {
alert("Instruction failed!");
} finally {
setLoading(false);
}
};

const handlePlotData = async (event) => {
event.preventDefault();
const input = event.target.elements.instruction.value;
setLoading(true);
try {
  const imageData = await api.plotData(input);
  const url = URL.createObjectURL(new Blob([imageData], { type: 'image/png' }));
  setPlotUrl(url);
} catch (error) {
  alert("Instruction failed!");
} finally {
  setLoading(false);
}
};

const handleGenerateWorkflow = async (event) => {
event.preventDefault();
const input = event.target.elements.instruction.value;
setLoading(true);
try {
  const code = await api.generateWorkflow(input);
  setMermaidCode(code);
} catch (error) {
  alert("Instruction failed!");
} finally {
  setLoading(false);
  
}
}

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
{uploadError && (
<Alert
variant="danger"
onClose={() => setUploadError(false)}
dismissible
style={{ position: 'fixed', zIndex: 1050, width: '100%', textAlign: 'center' }}
>
Upload Failed
</Alert>
)}
{/* ProgressBar and Alert components */}
<Container fluid>
<LandingSection handleTryETL={scrollToUpload} 
handleTryWorkflow={scrollToWorkflow} />
<div ref={uploadRef}></div>
<UploadSection handleUpload={handleUpload} />
{uploaded && (
      <Row>
        <Resizable
          defaultSize={{ width: '50%', height: 'auto' }}
          minWidth="20%"
          maxWidth="80%"
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          handleComponent={{ right: CustomHandle }}
        >
          <div ref={etlRef}>
            <ETLSection
              data={data}
              handleProcessData={handleProcessData}
              handleRevert={handleRevert}
            />
          </div>
        </Resizable>
        <Col className="section resize-container">
          <PlotSection
            plotUrl={plotUrl}
            handlePlotData={handlePlotData}
          />
        </Col>
      </Row>
    )}
  </Container>

<Container fluid>
  <div ref={workflowRef}></div>
  <WorkflowSection 
    mermaidCode={mermaidCode}
    generateWorkflow={handleGenerateWorkflow}/>
</Container>
  <footer className="footer">Developed by Qi Zhao</footer>
</div>
);
}

export default App;