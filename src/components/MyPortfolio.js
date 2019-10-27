import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { connect } from "react-redux";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { fetchValue } from "../config/db";

class MyPortfolio extends React.Component {
  static navigationOptions = {
    title: "Portföyüm",
    headerStyle: { height: 70, backgroundColor: "rgb(246,12,101)" },
    headerTitleStyle: { fontSize: 30, letterSpacing: 5, color: "white" },
    headerLeft: <View />
  };

  state = { fetched: false, calculatedValues: [] };

  componentDidMount() {
    this.props.navigation.addListener("willFocus", payload => {
      this.fetch();
    });
  }

  fetch = () => {
    this.props.portfolio.forEach(element => {
      fetchValue("25.10.2019", element.fon_kod).then(r => {
        this.setState({
          calculatedValues: [
            ...this.state.calculatedValues,
            {
              fon_kod: element.fon_kod,
              deger: element.adet * parseFloat(r.rows._array[0]["deger"].replace(/,/g, "."))
            }
          ]
        });
      });
    });
  };

  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("PortfolioElement", {
            firm_name: item.firm_name,
            fon_name: item.fon_name
          })
        }
        style={{ flexDirection: "row", width: "85%" }}
      >
        <View style={{ width: "75%" }}>
          <Text style={{ fontSize: 16 }}>{item.fon_name}</Text>
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ fontSize: 16 }}>
            {this.state.calculatedValues.find(x => x.fon_kod === item.fon_kod)
              ? Math.round(
                  this.state.calculatedValues.find(x => x.fon_kod === item.fon_kod).deger * 100
                ) / 100
              : null}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { portfolio } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          style={{ paddingTop: 30 }}
          data={portfolio}
          renderItem={this.renderListItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "gray",
                  marginVertical: 10
                }}
              />
            );
          }}
          keyExtractor={item => item.adet.toString()}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("AddPortfolio")}
          style={{
            paddingBottom: 100
          }}
        >
          <Text
            style={{
              fontSize: 40,
              width: 250,
              padding: 20,
              textAlign: "center",
              fontWeight: "normal",
              borderWidth: 1,
              borderRadius: 20,
              borderColor: "rgb(246,12,101)"
            }}
          >
            Fon Ekle +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  }
});

const mapStateToProps = ({ main }) => {
  const { portfolio } = main;
  return { portfolio };
};

export default connect(mapStateToProps)(MyPortfolio);
