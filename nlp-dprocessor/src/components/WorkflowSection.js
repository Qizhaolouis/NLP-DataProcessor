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
        theme: "forest", // default, dark, forest, neutral, base
        securityLevel: "loose"
      });
    mermaid.contentLoaded();
}, [mermaidCode]);

  return (
    <Card style={{ backgroundColor: '#F0F8FF' }}>
      <Card.Header style={{ backgroundColor: '#333333' }}>
        <Col xs={12} md={3}>
          <h2>DataFlow Generator</h2>
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
