import React from "react";
import { StatusBar } from "react-native";

import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./src/config/store";
import LoadingImageScreen from "./src/components/LoadingImage";
import AppNavigator from "./src/config/navigation";
import { init } from "./src/config/db";

export default class App extends React.Component {
  state = { appIsReady: false };

  _loadResourcesAsync = async () => {
    const cacheAssets = Asset.loadAsync([]);
    const cacheFonts = Font.loadAsync({});
    return Promise.all([cacheAssets, cacheFonts]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    init()
      .then(() => {
        this.setState({ appIsReady: true });
        console.log("Initialized database");
      })
      .catch(err => {
        this.setState({ appIsReady: true });
        console.log("Initializing db failed.");
        console.log(err);
      });
  };

  render() {
    const { appIsReady } = this.state;
    if (!appIsReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={<LoadingImageScreen />} persistor={persistor}>
            <StatusBar barStyle="dark-content" />
            <AppNavigator />
          </PersistGate>
        </Provider>
      );
    }
  }
}
