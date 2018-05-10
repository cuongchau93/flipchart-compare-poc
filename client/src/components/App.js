import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import { Container, Row, Col } from 'reactstrap';
import ComparisonComponent from './ComparisonComponent';

class App extends Component {
  render() {
    return (
        <Container>
            <Row>
                <Col>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">This application is built by Cuong Chau <br/>
                                https://www.linkedin.com/in/cuong-chau-03356394/</h1>
                        </header>
                        <p className="App-intro">
                            This application is to compare two lazada products.
                            <br />
                            You can input value in the form below
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ComparisonComponent />
                </Col>
            </Row>
        </Container>
    );
  }
}

export default App;
