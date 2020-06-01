import React from 'react';
import PropTypes from 'prop-types';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const initialState = {
  user: null,
};

function authReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'auth/SIGN_IN': {
      return {
        ...state,
        user: payload
      };
    }
    case 'auth/SIGN_OUT': {
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
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
}

function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
}

// HOC for components that can't use hooks
function withAuthContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthStateContext.Consumer>
        {state => <Component {...props} context={state} />}
      </AuthStateContext.Consumer>
    );
  };
}
export { AuthProvider, useAuthState, useAuthDispatch, withAuthContext };