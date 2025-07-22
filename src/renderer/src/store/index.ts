import accesoLogin from "@renderer/reducers/reducerLogin";
import activeMenu from "@renderer/reducers/reducerMenu";
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const reducer = combineReducers({
    loginAccess: accesoLogin,
    menuAccions: activeMenu
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;
