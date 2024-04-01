import axios from "axios";
import { createAction, createReducer } from "@reduxjs/toolkit";

/*le state initial */
const initialState = {
  status: "void",
  error: null,
  isConnected: false,
  token: null,
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  createdAt: null,
  updatedAt: null,
};
/*les differentes actions creator */
const userFetchingAction = createAction("user/fetching");
const userResolvedAction = createAction("user/resolved");
const userRejectedAction = createAction("user/rejected");

export const isConnectedAction = createAction("user/isConnected");
export const userTokenAction = createAction("user/token");
export const userResetAction = createAction("user/reset");

//Mes a jour les donnees des utilisateurs
//action asynchrones 
//getsate et dispatch pour interagir avec redux 
export const fetchOrUpdateUser = ( token) => {
  return async (dispatch, getState) => {
    
    const selectUser = (state) => state.user;
    const status = selectUser(getState()).status;
    /* on vient verifier si le statut n'est pas pending ou updating */
    if (status === "pending" || status === "updating") {
      return;
    }
    //on indique que le user commence a etre charge
    dispatch(userFetchingAction());
    await axios({
      method: "POST",
      url: "http://localhost:3001/api/v1/user/profile",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        /*si ça fonctionne on fait un resolve */
        dispatch(userResolvedAction(response.data));
        dispatch(userTokenAction(token));
        dispatch(isConnectedAction(true));
      })
      .catch((error) => {
        /*si ça ne fonctionne pas on fait un rejected */
        dispatch(userRejectedAction(error));
      });
  };
};

//modifie le nom de l'utilisateur
export const modifyUserName = ( token, firstname, lastname) => {
  return async (dispatch, getState) => {
    
    const selectUser = (state) => state.user;
    const status = selectUser(getState()).status;
    if (status === "pending" || status === "updating") {
      return;
    }

    dispatch(userFetchingAction());
    axios({
      method: "PUT",
      url: "http://localhost:3001/api/v1/user/profile",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        firstName: firstname,
        lastName: lastname,
      },
    })
      .then((response) => {
        dispatch(userResolvedAction(response.data));
      })
      .catch((error) => {
        dispatch(userRejectedAction(error));
      });
  };
};
/* Creation du user reducer. */
/*le builder va nous permettre de construire notre reducer qui nous permettre de créer les differentes fonction de notre reducer */
export default createReducer(initialState, (builder) =>
  //builder.addCase pour ajouter different action qu'on veut gerer
  builder
    .addCase(userFetchingAction, (draft) => {
      //on verifie le statut de notre state
      if (draft.status === "void") {
        draft.status = "pending";
        return;
      }
      if (draft.status === "rejected") {
        draft.error = null;
        draft.status = "pending";
        return;
      }
      if (draft.status === "resolved") {
        draft.status = "updating";
        return;
      }
      return;
    })
    .addCase(userResolvedAction, (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.id = action.payload.body.id;
        draft.email = action.payload.body.email;
        draft.firstName = action.payload.body.firstName;   
        draft.lastName = action.payload.body.lastName;
        draft.createdAt = action.payload.body.createdAt;
        draft.updatedAt = action.payload.body.updatedAt;
        draft.status = "resolved";

        return;
      }
      return;
    })
    .addCase(userRejectedAction, (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.status = "rejected";
        draft.error = action.payload;
        draft.isConnected = initialState.isConnected;
        draft.token = initialState.token;
        draft.id = initialState.id;
        draft.email = initialState.email;
        draft.firstName = initialState.firstName;
        draft.lastName = initialState.lastName;
        draft.createdAt = initialState.createdAt;
        draft.updatedAt = initialState.updatedAt;

        return;
      }
      return;
    })
    .addCase(isConnectedAction, (draft, action) => {
      draft.isConnected = action.payload;
      return;
    })
    .addCase(userTokenAction, (draft, action) => {
      draft.token = action.payload;
      return;
    })
    .addCase(userResetAction, (draft) => {
      draft.status = initialState.status;
      draft.error = initialState.error;
      draft.isConnected = initialState.isConnected;
      draft.token = initialState.token;
      draft.id = initialState.id;
      draft.email = initialState.email;
      draft.firstName = initialState.firstName;
      draft.lastName = initialState.lastName;
      draft.createdAt = initialState.createdAt;
      draft.updatedAt = initialState.updatedAt;
      localStorage.removeItem("userToken");
      return;
    })
);
