import * as React from "react";
import {

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthDispatch } from "../context/AuthContext";

export default function SignOutScreen() {
  const authDispatch = useAuthDispatch();
  
  function handleSignOutScreen() {
    authDispatch({ type: 'auth/SIGN_OUT' });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOutScreen} style={styles.signInButton}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

SignOutScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  signOutButton: {
    paddingVertical: 15,
  },
  signOutButtonText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
