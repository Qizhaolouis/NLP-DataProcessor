import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';

const LandingSection = ({ handleTryNow }) => {
  return (
    <Container className="my-5 landing-section">
      <Row className="align-items-center" style={{ position: 'relative' }}>
        <Image
          src="dark.jpg"
          alt="Theme"
          style={{
            position: 'absolute',
            zIndex: -1,
            width: '110%',
            height: '110%',
            objectFit: 'cover',
            opacity: 1, // Adjust the opacity as needed
          }}
        />
        <Col>
          <h1 className="text-center">ConvoConver</h1>
          <h3 className="text-center mb-4">Transforming Data Through Engaging Conversations!</h3>
          <p className="text-center"  style={{"color":"white"}}>Discover the power of ConvoConver, a cutting-edge data transformation and visualization platform that can help harnesses
          the intuitiveness of natural language processing to revolutionize the way you analyze and present your data.</p>
          <div className="text-center mt-4">
            <Button variant="primary" size="lg" onClick={handleTryNow}>
              Try Now!
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-5 text-center">
        <Col md={6}>
          <ScrollAnimation animateIn="fadeIn">
            <div className="feature">
              <h4>Seamless Conversational Interface</h4>
              <p className="feature-text">
                Interact with your data in real-time using our intuitive conversational interface. Just type in your questions or commands and let Convo-Conver do the work for you.
              </p>
            </div>
          </ScrollAnimation>
        </Col>
        <Col md={6}>
          <ScrollAnimation animateIn="fadeIn">
            <div className="feature">
              <h4>Effortless Data Transformations</h4>
              <p className="feature-text">
                Simplify complex data manipulation tasks with Convo-Conver's powerful natural language processing capabilities. No more struggling with complicated formulas or coding languages.
              </p>
            </div>
          </ScrollAnimation>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col md={6}>
          <ScrollAnimation animateIn="fadeIn">
            <div className="feature">
              <h4>Stunning Visualizations</h4>
              <p className="feature-text">
                Transform your data into visually appealing and easy-to-understand plots and charts. Convo-Conver's advanced visualization engine will bring your data to life.
              </p>
            </div>
          </ScrollAnimation>
        </Col>
        <Col md={6}>
          <ScrollAnimation animateIn="fadeIn">
            <div className="feature">
              <h4>Downloadable Code</h4>
              <p className="feature-text">
                Need to share your work or replicate your results? Convo-Conver provides you with downloadable code snippets, making it easy to integrate your findings into your projects or share your insights with your team.
              </p>
            </div>
          </ScrollAnimation>
        </Col>
      </Row>
    </Container>
);
};

export default LandingSection;

