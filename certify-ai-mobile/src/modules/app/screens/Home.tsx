/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
 */
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import translate from "@helpers/localization";
import { showToast } from "@helpers/toast/showToast";
import {
  Button,
  ButtonText,
  ButtonSpinner,
  ButtonIcon,
  ButtonGroup,
} from "@components/ui/button";

function Home() {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.root}>
        <View style={styles.container}>
          <Text style={styles.fontBlack}></Text>
        </View>
        <Button>
          <ButtonText>Hello World!</ButtonText>
        </Button>
        <Text style={styles.fontBlack}>{translate("name")}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  root: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  fontBlack: {
    fontFamily: "Black",
    marginTop: 20,
    fontSize: 20,
  },
});

export default Home;
