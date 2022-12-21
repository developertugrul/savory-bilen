import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Footer, P } from '../../AbstractElements';
const FooterClass = () => {
    return (
        <Fragment>
            <Footer attrFooter={{ className: `footer footer-dark` }} >
                <Container fluid={true}>
                    <Row>
                        <Col md="6" className="footer-copyright">
                            <P attrPara={{ className: 'mb-0' }} >{'Copyright 2023 © Savory All rights reserved.'}</P>
                        </Col>
                        <Col md="6">
                            <P attrPara={{ className: 'pull-right mb-0' }} >Hand crafted & made with <i className="fa fa-heart font-secondary"></i></P>
                        </Col>
                    </Row>
                </Container>
            </Footer>
        </Fragment>
    );
};

export default FooterClass;
