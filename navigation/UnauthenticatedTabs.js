import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import SignInScreen from '../screens/SignInScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Sign In";

export default function AuthenticatedTabs({}) {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Sign In"
        component={SignInScreen}
        options={{
          title: "Sign In",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-key" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
