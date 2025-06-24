import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface BandMember {
  id: string;
  userId: string;
  bandId: string;
  role: 'ADMIN' | 'MEMBER';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  joinDate: string;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureUrl?: string;
    instrument?: string;
  };
}

export interface Band {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  members?: BandMember[];
}

interface BandState {
  bands: Band[];
  currentBand: Band | null;
  userBands: Band[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BandState = {
  bands: [],
  currentBand: null,
  userBands: [],
  isLoading: false,
  error: null,
};

// Async thunks would go here in a real implementation
// For example:
// export const fetchUserBands = createAsyncThunk(
//   'bands/fetchUserBands',
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/users/${userId}/bands`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Error fetching bands');
//     }
//   }
// );

const bandSlice = createSlice({
  name: 'bands',
  initialState,
  reducers: {
    setBands: (state, action: PayloadAction<Band[]>) => {
      state.bands = action.payload;
    },
    setCurrentBand: (state, action: PayloadAction<Band>) => {
      state.currentBand = action.payload;
    },
    clearCurrentBand: (state) => {
      state.currentBand = null;
    },
    setUserBands: (state, action: PayloadAction<Band[]>) => {
      state.userBands = action.payload;
    },
    addBand: (state, action: PayloadAction<Band>) => {
      state.bands.push(action.payload);
      state.userBands.push(action.payload);
    },
    updateBand: (state, action: PayloadAction<Band>) => {
      const index = state.bands.findIndex(band => band.id === action.payload.id);
      if (index !== -1) {
        state.bands[index] = action.payload;
      }
      
      const userBandIndex = state.userBands.findIndex(band => band.id === action.payload.id);
      if (userBandIndex !== -1) {
        state.userBands[userBandIndex] = action.payload;
      }
      
      if (state.currentBand?.id === action.payload.id) {
        state.currentBand = action.payload;
      }
    },
    removeBand: (state, action: PayloadAction<string>) => {
      state.bands = state.bands.filter(band => band.id !== action.payload);
      state.userBands = state.userBands.filter(band => band.id !== action.payload);
      
      if (state.currentBand?.id === action.payload) {
        state.currentBand = null;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  // Extra reducers would be added here for async thunks
});

export const {
  setBands,
  setCurrentBand,
  clearCurrentBand,
  setUserBands,
  addBand,
  updateBand,
  removeBand,
  setError,
  setLoading
} = bandSlice.actions;

export default bandSlice.reducer;