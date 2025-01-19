// import openWeather from "@/lib/openWeather";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isAxiosError } from "axios";

const loadTasksFromLocalStorage = () => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return Array.isArray(tasks) ? tasks : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
  weather: {},
  loading: false,
  error: false,
};

export const fetchWeather = createAsyncThunk(
  "tasks/fetchWeather",
  async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }&units=metric`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      if (isAxiosError(error) && error?.response?.status === 404) {
        throw new Error(
          "Weather data not found with the provided coordinates."
        );
      } else {
        throw new Error("Failed to fetch weather data.");
      }
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weather data.";
      });
  },
});

export const { addTask, deleteTask, toggleTaskCompletion } = taskSlice.actions;
export default taskSlice.reducer;
