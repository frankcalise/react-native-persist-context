import * as React from "react";
import {

  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuthDispatch } from "../context/AuthContext";

export default function SignInScreen() {
  const authDispatch = useAuthDispatch();
  
  function handleSignInPress() {
    authDispatch({ type: 'auth/SIGN_IN', payload: 'frank' });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignInPress} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

SignInScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  signInButton: {
    paddingVertical: 15,
  },
  signInButtonText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
