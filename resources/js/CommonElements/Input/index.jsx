import React from 'react';
import { Input } from 'reactstrap';

const Inp = (props) =>{
    return <Input {...props.attrBtn}>{props.children}</Input>;
};

export default Inp;
