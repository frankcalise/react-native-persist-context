import React from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const initialState = {
  user: null,
};

function authReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "auth/REHYDRATE": {
      return {
        ...state,
        ...payload,
      };
    }
    case "auth/SIGN_IN": {
      return {
        ...state,
        user: payload,
      };
    }
    case "auth/SIGN_OUT": {
      return {
        ...initialState,
      };
    }
    default:
      throw new Error(`authReducer unhandled action type: ${type}`);
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  // rehydrate context from async storage
  React.useEffect(() => {
    getData("auth").then((data) => {
      if (data) {
        dispatch({ type: "auth/REHYDRATE", payload: data });
      }
    });
  }, []);

  // persist to async storage
  React.useEffect(() => {
    storeData('auth', state);
  }, [state]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
}

// HOC for components that can't use hooks
function withAuthContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthStateContext.Consumer>
        {(state) => <Component {...props} context={state} />}
      </AuthStateContext.Consumer>
    );
  };
}
export { AuthProvider, useAuthState, useAuthDispatch, withAuthContext };

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
    console.log(e);
  }
};

getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : initialState;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};
