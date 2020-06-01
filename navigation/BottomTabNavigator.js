import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import AuthenticatedTabs from "./AuthenticatedTabs";
import UnauthenticatedTabs from "./UnauthenticatedTabs";
import { useAuthState } from "../context/AuthContext";

const INITIAL_ROUTE_NAME = "Login";

export default function BottomTabNavigator({ navigation, route }) {
  const { user } = useAuthState();
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  return user ? <AuthenticatedTabs /> : <UnauthenticatedTabs />;
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "Links":
      return "Links to learn more";
    case "Login":
      return "Sign into your account";
  }
}
