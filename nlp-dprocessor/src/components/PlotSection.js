import React from 'react';
import { Col, Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const PlotSection = ({ plotUrl, handlePlotData }) => {
  return (
    <Card style={{ backgroundColor: '#333333'}}>
      <Card.Header>
        <Col  xs={12} md={3}>
        <h2>Plot</h2>
        </Col>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handlePlotData}>
          <InputGroup>
            <FormControl
              placeholder="Enter plot instruction. Example: Plot a pie chart of the count for each ethnicity group"
              name="instruction"
              as="textarea"
              rows={5}
            />
            <Button 
              type="submit" 
              variant="primary">
              Plot Data
            </Button>
          </InputGroup>
        </Form>
        {plotUrl && (
          <img src={plotUrl} alt="Generated plot" className="plot-image" />
        )}
      </Card.Body>
    </Card>
  );
};

export default PlotSection;
