import React, {Fragment} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import H3 from '../Headings/H3Element';
import {useTranslation} from "react-i18next";

const Breadcrumbs = (props) => {
    const {t} = useTranslation([
        "common"
    ]);
    return (
        <Fragment>
            <Container fluid={true}>
                <div className="page-header">
                    <Row>
                        <Col sm="6">
                            <H3>{props.mainTitle}</H3>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={`/dashboard`}>{t("common:dashboard")}</Link></li>
                                {props.parent ? <li className="breadcrumb-item"><Link to={props.parentUrl}>{props.parent}</Link></li> : null}
                                {props.subParent ? <li className="breadcrumb-item"><Link to={props.subParentUrl}>{props.subParent}</Link></li> : ''}
                                <li className="breadcrumb-item active">{props.title}</li>
                            </ol>
                        </Col>
                        <Col sm="6" className={"text-end"}>
                            {props.children}
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    );
};

export default Breadcrumbs;
