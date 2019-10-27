import React from "react";
import { ImageBackground } from "react-native";

export default class JustLoadingImageScreen extends React.Component {
  static navigationOptions = { header: null };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/profil.png")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}
