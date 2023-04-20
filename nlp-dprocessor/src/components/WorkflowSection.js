import React from 'react';
import { Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import mermaid from 'mermaid';


const WorkflowSection = ({ mermaidCode, generateWorkflow }) => { 

    const mermaidRef = React.useRef(null);

React.useEffect(() => {
    if (mermaidRef.current) {
    mermaidRef.current.removeAttribute("data-processed");
    }
    mermaid.initialize({
        startOnLoad: true,
        theme: "default",
        securityLevel: "loose",
        themeCSS: `
          g.classGroup rect {
            fill: #282a36;
            stroke: #6272a4;
          } 
          g.classGroup text {
            fill: #f8f8f2;
          }
          g.classGroup line {
            stroke: #f8f8f2;
            stroke-width: 0.5;
          }
          .classLabel .box {
            stroke: #21222c;
            stroke-width: 3;
            fill: #21222c;
            opacity: 1;
          }
          .classLabel .label {
            fill: #f1fa8c;
          }
          .relation {
            stroke: #ff79c6;
            stroke-width: 1;
          }
          #compositionStart, #compositionEnd {
            fill: #bd93f9;
            stroke: #bd93f9;
            stroke-width: 1;
          }
          #aggregationEnd, #aggregationStart {
            fill: #21222c;
            stroke: #50fa7b;
            stroke-width: 1;
          }
          #dependencyStart, #dependencyEnd {
            fill: #00bcd4;
            stroke: #00bcd4;
            stroke-width: 1;
          } 
          #extensionStart, #extensionEnd {
            fill: #f8f8f2;
            stroke: #f8f8f2;
            stroke-width: 1;
          }`,
        fontFamily: "Fira Code"
      });
    mermaid.contentLoaded();
}, [mermaidCode]);

  return (
    <Card style={{ backgroundColor: '#F0F8FF' }}>
      <Card.Header style={{ backgroundColor: '#333333' }}>
        <Col xs={12} md={3}>
          <h2>Data Convertor</h2>
        </Col>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={generateWorkflow}>
          <InputGroup>
            <FormControl
              placeholder="Enter workflow instruction. Example: Read data from AWS S3, then run it through a python script. Then write to AWS Redshift."
              name="instruction"
              as="textarea"
              rows={5}
            />
            <Button type="submit" variant="primary">
              Dataflow Generator
            </Button>
          </InputGroup>
        </Form>
        {mermaidCode !== null && ( 
          <div className="workflow-diagram">
            <div ref={mermaidRef} className="mermaid">
            {mermaidCode}
            </div>
          </div>
        )}
        {mermaidCode === null && <div style={{ height: '300px' }} />}
      </Card.Body>
    </Card>
  );
};

export default WorkflowSection;
