import React from "react";
import { Dimensions, Text, SafeAreaView, View, Alert, StatusBar } from "react-native";
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
      title: "Portföy Detay",
      headerStyle: { height: 70, backgroundColor: "rgb(246,245,101)" },
      headerTitleStyle: { fontSize: 25, letterSpacing: 5, color: "black" },
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
    const INITIAL2 = INITIAL + 30 * Math.random() - Math.random();
    const INITIAL3 = INITIAL2 + 100 + Math.random() - Math.random();
    const INITIAL4 = INITIAL3 + 100 + 2 * (Math.random() - Math.random());
    const INITIAL5 = INITIAL4 + 100 + 3 * (2 * Math.random() - Math.random());
    const INITIAL6 = INITIAL5 + 100 + 4 * (Math.random() - Math.random());
    return (
      <View>
        <LineChart
          data={{
            labels: ["Mart'19", "Nisan'19", "Mayıs'19", "Haz'19", "Tem'19", "Ağus'19"],
            datasets: [
              {
                data: [INITIAL, INITIAL2, INITIAL3, INITIAL4, INITIAL5, INITIAL6],
                color: () => "green"
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={250}
          yAxisLabel={"₺"}
          yAxisSuffix={"k"}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "rgb(246,205,101)",
            backgroundGradientTo: "rgba(246,205,101, 0.45)",
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
        <View style={{ paddingTop: 10, width: "90%" }}>
          <Text style={{ fontSize: 20, paddingLeft: 5, marginVertical: 10 }}>
            Şu ana kadarki getiriniz: {Math.round(INITIAL6 * 100) / 100}
          </Text>
        </View>
      </View>
    );
  }

  renderFirmName() {
    const firm_name = this.props.navigation.getParam("firm_name");
    const fon_name = this.props.navigation.getParam("fon_name");
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>{firm_name}</Text>
        <Text style={{ paddingTop: 5, fontSize: 20, textAlign: "center", fontStyle: "italic" }}>
          {fon_name}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <StatusBar barStyle="dark-content" />
        {this.renderFirmName()}
        {this.renderDatePicker()}
        {this.renderGraph()}
      </SafeAreaView>
    );
  }
}
