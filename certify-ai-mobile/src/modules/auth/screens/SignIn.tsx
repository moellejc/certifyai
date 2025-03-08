import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import SocialLoginButton from "../components/SocialLoginButton";
import { Heading } from "@components/ui/heading";
import { Text } from "@components/ui/text";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  useWarmUpBrowser();

  return (
    <View style={styles.root}>
      <View style={styles.welcomeHeaderContainer}>
        <Heading size={"3xl"}>Welcome to</Heading>
        <Heading size={"5xl"}>Certify AI!</Heading>
      </View>
      <View style={styles.loginBtnContainer}>
        <Text size={"3xl"} bold={true} style={styles.txtGetStarted}>
          Get Started Now!
        </Text>
        <Text size={"xl"} style={styles.txtSignInWith}>
          Sign In with
        </Text>
        <View style={styles.loginBtnList}>
          <SocialLoginButton strategy="google" />
          <SocialLoginButton strategy="linkedin" />
          <SocialLoginButton strategy="apple" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  welcomeHeaderContainer: {
    alignSelf: "center",
    flex: 3,
    justifyContent: "center",
  },
  loginBtnContainer: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "flex-start",
    width: "60%",
    flex: 4,
  },
  txtGetStarted: {
    marginBottom: 10,
    alignSelf: "center",
  },
  txtSignInWith: {
    alignSelf: "center",
    marginBottom: 15,
  },
  loginBtnList: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
});
