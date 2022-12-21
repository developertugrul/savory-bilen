import {createSlice} from "@reduxjs/toolkit";

const ToggleSidebarSlice = createSlice({
    name: 'toggleSidebar',
    initialState: {
        sidebar: false,
    },
    reducers: {
        setSidebar: (state, action) => {
            state.sidebar = !state.sidebar;
        },
    },
});

export const {setSidebar} = ToggleSidebarSlice.actions;

export const SideBarActions = ToggleSidebarSlice.actions;
export default ToggleSidebarSlice.reducer;
