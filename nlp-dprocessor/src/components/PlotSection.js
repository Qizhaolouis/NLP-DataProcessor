import React from 'react';
import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const PlotSection = ({ plotUrl, handlePlotData }) => {
  return (
    <Card style={{ backgroundColor: '#333333'}}>
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
          <img src={plotUrl} alt="Generated plot" className="plot-image" />
        )}
      </Card.Body>
    </Card>
  );
};

export default PlotSection;
