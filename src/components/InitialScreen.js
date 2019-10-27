import React from "react";
import { ImageBackground } from "react-native";
import { connect } from "react-redux";

class InitialScreen extends React.Component {
  componentDidMount() {
    if (this.props.portfolio.length > 0) this.props.navigation.navigate("MyPortfolioScreenSwitch");
    else this.props.navigation.navigate("AddPortfolioScreenSwitch");
  }
  render() {
    return (
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
}

const mapStateToProps = ({ main }) => {
  const { portfolio } = main;
  return { portfolio };
};

export default connect(mapStateToProps)(InitialScreen);
