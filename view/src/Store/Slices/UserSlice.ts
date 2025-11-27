import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getUser } from '../../Service/UserService'; // Adjust path as necessary
import type { Iuser as User } from '../../Types/Iuser';

interface UserState {
  user: User | null;
  error: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

// Initial state
const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  isLoggedIn: false,
};

// Async thunk
export const fetchUser = createAsyncThunk<{ user: User }>(
  'user/fetchUser',
  async () => {
    const user = await getUser();
    if (!user) throw new Error('User not found');
    return { user };
  }
);

// Slice
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User | null }>) {
      if(action.payload.user == null){
        state.user = null;
        state.error = null;
        state.loading = false;
        state.isLoggedIn = false;
        return;
      }
      state.user = action.payload.user;
      state.error = null;
      state.loading = false;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
