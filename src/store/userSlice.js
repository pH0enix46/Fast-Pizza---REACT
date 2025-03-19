// // //
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../api/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  // ⏺ createAsyncThunk() is a Redux Toolkit function/method that handles asynchronous logic (like API calls) and automatically manages loading, success and error states. Think about thunk logic
  "user/fetchAddress", // ⏺ action type
  async function () {
    // ⏺ 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // ⏺ 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong. A Reverse Geocoding API converts latitude and longitude coordinates into a human-readable address
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // ⏺ 3) Then we return an object with the data that we are interested in
    return { position, address }; // ⏺ the return will be payload of the fullfilled state
  }
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },

  // ⏺ extraReducers in Redux Toolkit handles additional actions. addCase() in Redux Toolkit method/function handles specific action states (pending, fulfilled, rejected) to manage API call status
  extraReducers: (builder) => {
    return builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem to getting your address!! Make sure to turn on your location, or just fill the feild with your own!";
      });
  },
});

export const getUserName = (state) => state.user.username;

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
