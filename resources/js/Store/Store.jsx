import {configureStore} from "@reduxjs/toolkit";
// import slices
import AuthSlice from "./Slices/Auth/AuthSlice";
import ToggleSidebarSlice from "./Slices/Layout/ToggleSidebarSlice";
import {loadState, saveState} from "./LocalStorage/LocalStorage";
import {throttle} from "lodash";

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        toggleSidebar: ToggleSidebarSlice,
    },
    preloadedState: loadState(),
});

store.subscribe(
    throttle( () => saveState(store.getState()), 1000)
);

export default store;
