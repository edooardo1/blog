import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'https://blog-platform.kata.academy/api'

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
    if (!res.ok) throw new Error('Не удалось загрузить пользователя')
    const data = await res.json()
    return data.user
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

export const signIn = createAsyncThunk('auth/signIn', async (credentials, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: credentials }),
    })
    const data = await res.json()
    if (!res.ok) return thunkAPI.rejectWithValue(data.errors)
    localStorage.setItem('token', data.user.token)
    return data.user
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

export const signUp = createAsyncThunk('auth/signUp', async (credentials, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: credentials }),
    })
    const data = await res.json()
    if (!res.ok) return thunkAPI.rejectWithValue(data.errors)
    localStorage.setItem('token', data.user.token)
    return data.user
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

export const updateUser = createAsyncThunk('auth/updateUser', async (userData, thunkAPI) => {
  try {
    const res = await fetch(`${API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ user: userData }),
    })
    const data = await res.json()
    if (!res.ok) return thunkAPI.rejectWithValue(data.errors)
    return data.user
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      }))
      .addCase(signIn.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      }))
      .addCase(signUp.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      }))
      .addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload,
        error: null,
      }))
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => ({
          ...state,
          error: action.payload || 'Произошла ошибка',
        })
      )
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
