import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { LoggedOut } from "@modules/app/redux/appSlice";
import { Text, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigate } from "@helpers/router";
import Routes, { ProfileStackParams } from "@src/utils/Routes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";

function Profile() {
  const { signOut, user } = useClerk();
  const dispatch = useDispatch();

  const navigation = useNavigation<StackNavigationProp<ProfileStackParams>>();

  const goToSettings = useCallback(() => navigate(Routes.Settings), []);

  const goToPost = useCallback(
    () => navigation.navigate(Routes.Post, { id: "1", username: "Milvasoft" }),
    [navigation]
  );

  const logout = useCallback(async () => {
    await signOut();
    await dispatch(LoggedOut());
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.root}>
        <Text style={styles.fontBlack}>{user?.fullName}</Text>
        <Text style={styles.fontBlack}>
          {user?.emailAddresses[0].emailAddress}
        </Text>
        <View style={styles.siginButton}>
          <Button onPress={goToPost} title="Go To Post" />
        </View>
        <View style={styles.siginButton}>
          <Button onPress={goToSettings} title=" Go To Settings" />
        </View>
        <View style={styles.siginButton}>
          <Button onPress={logout} title="logout" />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  fontBlack: {
    fontFamily: "Black",
  },

  counter: {
    marginTop: 30,
    fontSize: 30,
    color: "red",
  },

  button: {
    marginTop: 20,
  },

  siginButton: {
    marginTop: 50,
  },
});
