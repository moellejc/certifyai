import { useOAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

const BUTTON_SIZE = 42;

const SocialLoginButton = ({
  strategy,
}: {
  strategy: "linkedin" | "google" | "apple";
}) => {
  const getStrategy = () => {
    if (strategy === "linkedin") {
      return "oauth_linkedin";
    } else if (strategy === "google") {
      return "oauth_google";
    } else if (strategy === "apple") {
      return "oauth_apple";
    }
    return "oauth_google";
  };

  const { startOAuthFlow } = useOAuth({ strategy: getStrategy() });
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  //   const router = useRouter();
  const buttonText = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (strategy === "linkedin") {
      return "Continue with LinkedIn";
    } else if (strategy === "google") {
      return "Continue with Google";
    } else if (strategy === "apple") {
      return "Continue with Apple";
    }
  };

  const buttonIcon = () => {
    if (strategy === "linkedin") {
      return (
        <AntDesign name="linkedin-square" size={BUTTON_SIZE} color="black" />
      );
    } else if (strategy === "google") {
      return <AntDesign name="google" size={BUTTON_SIZE} color="black" />;
    } else if (strategy === "apple") {
      return <AntDesign name="apple1" size={BUTTON_SIZE} color="black" />;
    }
  };

  const onSocialLoginPress = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        console.log("Session created", createdSessionId);
        setActive!({ session: createdSessionId });
        await user?.reload();
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={onSocialLoginPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={styles.loadingSpinner}
        />
      ) : (
        buttonIcon()
      )}
      <View />
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  container: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "medium",
  },
  loadingSpinner: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
});
