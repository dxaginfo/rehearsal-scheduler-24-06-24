import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  notification: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
  sidebarOpen: boolean;
  darkMode: boolean;
}

const initialState: UIState = {
  isLoading: false,
  notification: {
    open: false,
    message: '',
    type: 'info',
  },
  sidebarOpen: false,
  darkMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showNotification: (state, action: PayloadAction<Omit<UIState['notification'], 'open'>>) => {
      state.notification = {
        open: true,
        ...action.payload,
      };
    },
    hideNotification: (state) => {
      state.notification.open = false;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const {
  setLoading,
  showNotification,
  hideNotification,
  toggleSidebar,
  setSidebarOpen,
  toggleDarkMode,
  setDarkMode,
} = uiSlice.actions;

export default uiSlice.reducer;