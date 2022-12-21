import React, {Fragment, useState, useEffect} from 'react';


const Loader = () => {

    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 300);

        return () => {
            clearTimeout(timeout);
        };

    }, [show]);

    return (
        <div>
            {show && (
                <div className={`loader-wrapper`}>
                    <div className="theme-loader">
                        <div className="loader-p"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Loader;
