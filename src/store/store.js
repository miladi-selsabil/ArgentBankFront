import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login";
import userReducer from "./user";

/* Création d'un store on utilise configure store pour faire fonctionner plsrs reducer ensemble */
const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});

export default store;
