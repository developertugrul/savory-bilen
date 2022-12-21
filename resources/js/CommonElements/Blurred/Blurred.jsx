import classes from './Blurred.module.css';
import Blur from 'react-blur'
const Blurred = () => {
    return (
        <Blur blurRadius={5} img={'images/blurred1.jpg'} />
    );
}

export default Blurred;
