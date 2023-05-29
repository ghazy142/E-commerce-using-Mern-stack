import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'
export default function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        E-commerce, Team 6, Faculty of Engineering Tanta University.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
