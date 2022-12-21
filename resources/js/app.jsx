import './bootstrap';
import '../css/app.css'
import React, {Component, Suspense} from "react";
import {createRoot} from 'react-dom/client';
import MyRoutes from './Routes';
import "./i18n";
import {Provider} from "react-redux";

import Store from "./Store/Store";
import Loader from "@/Layouts/Loader/Loader";
import reportWebVitals from './_helper/reportWebVitals';

class Main extends Component {
    render() {
        return (
            <Suspense fallback={<Loader/>}>
                <Provider store={Store}>
                    <MyRoutes/>
                </Provider>
            </Suspense>
        );
    }
}

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Main tab="home"/>);

reportWebVitals(console.log);
