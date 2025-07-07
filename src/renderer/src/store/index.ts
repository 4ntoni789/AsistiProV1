import accesoLogin from "@renderer/reducers/reducerLogin";
import activeMenu from "@renderer/reducers/reducerMenu";
import { legacy_createStore as createStore, combineReducers } from "redux";



const reducer = combineReducers({
    loginAccess: accesoLogin,
    menuAccions: activeMenu
});

const store = createStore(reducer);

export default store;