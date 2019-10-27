import React from "react";
import { Dimensions, Text, SafeAreaView, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { fetchFirms } from "../config/db";
import { AntDesign } from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "BES+",
      headerStyle: { height: 70, backgroundColor: "#98E5FC" },
      headerTitleStyle: { fontSize: 30, letterSpacing: 5 },
      headerRight: (
        <View style={{ paddingRight: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Demo")}
            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 20, color: "red" }}>DEMO</Text>
            <AntDesign name="doubleright" size={24} color={"red"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: (
        <View style={{ paddingLeft: 15 }}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <AntDesign name="menuunfold" size={24} />
          </TouchableOpacity>
        </View>
      )
    };
  };
  state = { firms: [], selectedFirmId: [] };
  componentDidMount() {
    fetchFirms().then(r => this.setState({ firms: r.rows._array }));
  }
  selectFirm = selectedFirm => {
    this.setState({ selectedFirmId: selectedFirm });
  };
  renderFirmList = () => {
    return (
      <View style={{ width: "80%", alignSelf: "center" }}>
        <SectionedMultiSelect
          items={this.state.firms}
          uniqueKey="id"
          selectText="Firma seç"
          searchPlaceholderText="Firma seç"
          modalWithSafeAreaView
          single
          hideConfirm
          modalWithTouchable
          onSelectedItemsChange={this.selectFirm}
          selectedItems={this.state.selectedFirmId}
          colors={{ primary: "black" }}
          selectLabelNumberOfLines={3}
        />
      </View>
    );
  };
  renderDatePicker() {
    return (
      <View style={{ paddingVertical: 10, flexDirection: "row", alignItems: "center" }}>
        <DatePicker
          date={this.state.date1}
          mode="date"
          placeholder="Başlangıç tarihi"
          format="DD.MM.YYYY"
          confirmBtnText="Onayla"
          cancelBtnText="İptal"
          showIcon={false}
          onDateChange={date1 => this.setState({ date1 })}
        />
        <Text muted size={18} style={{ marginHorizontal: 5 }}>
          -
        </Text>
        <DatePicker
          date={this.state.date2}
          mode="date"
          placeholder="Bitiş tarihi"
          format="DD.MM.YYYY"
          confirmBtnText="Onayla"
          cancelBtnText="İptal"
          showIcon={false}
          onDateChange={date2 => this.setState({ date2 })}
        />
      </View>
    );
  }

  renderGraph() {
    const INITIAL = 100;
    const INITIAL2 = INITIAL + 300 * Math.random() - Math.random();
    const INITIAL3 = INITIAL2 + 100 + 2 * Math.random() - Math.random();
    const INITIAL4 = INITIAL3 + 100 + 2 * (2 * Math.random() - Math.random());
    const INITIAL5 = INITIAL4 + 100 + 3 * (2 * Math.random() - Math.random());
    const INITIAL6 = INITIAL5 + 100 + 4 * (3 * Math.random() - Math.random());
    const INITIAL_ = 100;
    const INITIAL2_ = INITIAL_ + Math.random() - Math.random();
    const INITIAL3_ = INITIAL2_ + 100 + 10 + Math.random() - Math.random();
    const INITIAL4_ = INITIAL3_ + 100 + 20 * (Math.random() - Math.random());
    const INITIAL5_ = INITIAL4_ + 100 + 30 * (Math.random() - Math.random());
    const INITIAL6_ = INITIAL5_ + 100 + 40 * (Math.random() - Math.random());
    const _INITIAL_ = 100;
    const _INITIAL2_ = _INITIAL_ - 2 * Math.random() + Math.random();
    const _INITIAL3_ = _INITIAL2_ + 100 - 10 * (2 * Math.random() + Math.random());
    const _INITIAL4_ = _INITIAL3_ + 100 - 20 * (2 * Math.random() + Math.random());
    const _INITIAL5_ = _INITIAL4_ + 100 - 30 * (2 * Math.random() + Math.random());
    const _INITIAL6_ = _INITIAL5_ + 100 - 40 * (2 * Math.random() + Math.random());
    return (
      <View>
        <LineChart
          data={{
            labels: ["Mart'19", "Nisan'19", "Mayıs'19", "Haz'19", "Tem'19", "Ağus'19"],
            datasets: [
              {
                data: [INITIAL, INITIAL2, INITIAL3, INITIAL4, INITIAL5, INITIAL6],
                color: () => "green"
              },
              {
                data: [INITIAL_, INITIAL2_, INITIAL3_, INITIAL4_, INITIAL5_, INITIAL6_],
                color: () => "darkgray"
              },
              {
                data: [_INITIAL_, _INITIAL2_, _INITIAL3_, _INITIAL4_, _INITIAL5_, _INITIAL6_],
                color: () => "red"
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisLabel={"₺"}
          yAxisSuffix={"k"}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#97EBF5",
            backgroundGradientTo: "#D8FCFF",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "4",
              strokeWidth: "1",
              stroke: "white"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  }

  renderSummary() {
    const INITIAL = 100;
    const INITIAL2 = INITIAL + 300 * Math.random() - Math.random();
    const INITIAL3 = INITIAL2 + 100 + 20 * Math.random() - Math.random();
    const INITIAL4 = INITIAL3 + 100 + 20 * (2 * Math.random() - Math.random());
    const INITIAL5 = INITIAL4 + 100 + 30 * (2 * Math.random() - Math.random());
    const INITIAL6 = INITIAL5 + 100 + 40 * (3 * Math.random() - Math.random());
    const INITIAL_ = 100;
    const INITIAL2_ = INITIAL_ + Math.random() - Math.random();
    const INITIAL3_ = INITIAL2_ + 100 + Math.random() - Math.random();
    const INITIAL4_ = INITIAL3_ + 100 + 2 * (Math.random() - Math.random());
    const INITIAL5_ = INITIAL4_ + 100 + 3 * (Math.random() - Math.random());
    const INITIAL6_ = INITIAL5_ + 100 + 4 * (Math.random() - Math.random());
    const _INITIAL_ = 100;
    const _INITIAL2_ = _INITIAL_ - 2 * Math.random() + Math.random();
    const _INITIAL3_ = _INITIAL2_ + 100 - 1 * (2 * Math.random() + Math.random());
    const _INITIAL4_ = _INITIAL3_ + 100 - 2 * (2 * Math.random() + Math.random());
    const _INITIAL5_ = _INITIAL4_ + 100 - 3 * (2 * Math.random() + Math.random());
    const _INITIAL6_ = _INITIAL5_ + 100 - 4 * (2 * Math.random() + Math.random());
    return (
      <View style={{ paddingTop: 10, width: "90%" }}>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <View style={{ borderWidth: 1, width: "60%" }}>
            <Text style={{ fontSize: 25, paddingLeft: 5, marginVertical: 10 }}>
              En yüksek getiri:
            </Text>
          </View>
          <View style={{ borderWidth: 1, width: "40%" }}>
            <Text style={{ fontSize: 25, paddingLeft: 10, marginVertical: 10 }}>
              {" "}
              {Math.round(INITIAL6 * 100) / 100}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <View style={{ borderWidth: 1, width: "60%" }}>
            <Text style={{ fontSize: 25, paddingLeft: 5, marginVertical: 10 }}>
              En düşük getiri:
            </Text>
          </View>
          <View style={{ borderWidth: 1, width: "40%" }}>
            <Text style={{ fontSize: 25, paddingLeft: 10, marginVertical: 10 }}>
              {" "}
              {Math.round(_INITIAL6_ * 100) / 100}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <View style={{ borderWidth: 1, width: "60%" }}>
            <Text style={{ fontSize: 25, paddingLeft: 5, marginVertical: 10 }}>
              Sizin getiriniz:
            </Text>
          </View>
          <View style={{ borderWidth: 1, width: "40%" }}>
            <Text style={{ fontSize: 25, paddingLeft: 10, marginVertical: 10 }}>
              {" "}
              {Math.round(INITIAL6_ * 100) / 100}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        {this.renderFirmList()}
        {this.renderDatePicker()}
        {this.renderGraph()}
        {this.renderSummary()}
      </SafeAreaView>
    );
  }
}
