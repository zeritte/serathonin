import React from "react";
import { ImageBackground } from "react-native";

export default class JustLoadingImageScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}
