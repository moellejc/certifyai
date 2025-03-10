/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
 */
import React, { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { Platform } from "react-native";
import Store from "./src/store";
import RootNavigation from "./src/routers";
import CustomProvider from "./src/providers";
import ErrorBoundary from "./src/providers/ErrorBoundary";
import "./global.css";
import { GluestackUIProvider } from "./src/components/ui/gluestack-ui-provider";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "./src/store/cache";

/** Clerk authentication setup */
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

enableScreens();

function App() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      // TODO: Orientation Congihuration
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={Store}>
        <CustomProvider>
          <GluestackUIProvider>
            <ClerkProvider
              tokenCache={tokenCache}
              publishableKey={publishableKey}
            >
              <ClerkLoaded>
                <RootNavigation />
              </ClerkLoaded>
            </ClerkProvider>
          </GluestackUIProvider>
        </CustomProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
