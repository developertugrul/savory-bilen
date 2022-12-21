import React from 'react';
import {Card, CardBody, CardFooter, CardHeader, Container} from 'reactstrap';
import Btn from '../Button';

const Cards = (props) => {
    const {title, subTitle, children, btnContent = null, attrBtn = null} = props;
    return (
        <Container fluid={true}>
            <div className="row">
                <div className="col-sm-12">
                    <Card>
                        <CardHeader className={"card-header pb-0"}>
                            <h5>{title}</h5>
                            {subTitle ? <span>{subTitle}</span> : null}
                        </CardHeader>
                        <CardBody>
                            {children}
                        </CardBody>
                        {btnContent ? <CardFooter>
                            <Btn attrBtn={attrBtn}>{btnContent}</Btn>
                        </CardFooter> : null}
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default Cards;
