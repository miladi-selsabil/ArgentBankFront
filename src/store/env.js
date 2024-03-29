import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
  backendUrl: "http://localhost:3001/api/v1/user",
};
export default createReducer(initialState, (builder) => builder);
