import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "certify-ai-mobile",
  description: "CertifyAI Mobile App",
  slug: "certify-ai-mobile",
  scheme: "com.certifyai",
  version: "1.0.0",
  sdkVersion: "52.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "automatic",
  runtimeVersion: {
    policy: "sdkVersion",
  },
  newArchEnabled: true,
  assetBundlePatterns: ["./src/assets/images/*"],
  locales: {
    tr: "./src/assets/languages/turkish.json",
    en: "./src/assets/languages/english.json",
  },
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: "com.certifyai",
    buildNumber: "1.0.0",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  web: {
    bundler: "metro",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.certifyai",
    versionCode: 1,
  },
  updates: {
    enabled: true,
    url: "https://u.expo.dev/49e4e24d-c928-4ff1-815d-f1a58ca580bd",
  },
  extra: {
    eas: {
      projectId: "49e4e24d-c928-4ff1-815d-f1a58ca580bd",
    },
  },
  plugins: ["expo-font", "expo-localization"],
});
