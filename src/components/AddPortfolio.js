import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { fetchFirms, fetchFons, fetchValue } from "../config/db";
import DatePicker from "react-native-datepicker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addItemToPortfolio } from "../actions/MainActions";

class AddPortfolio extends React.Component {
  static navigationOptions = {
    title: "Fon Ekle",
    headerStyle: { height: 70, backgroundColor: "white" },
    headerTitleStyle: { fontSize: 20 }
  };
  state = {
    firms: [],
    selectedFirmId: [],
    fons: [],
    selectedFons: [],
    price: null,
    selectedDate: null,
    valueFetched: null
  };

  componentDidMount() {
    fetchFirms().then(r => this.setState({ firms: r.rows._array }));
  }

  selectFirm = selectedFirm => {
    this.setState({ selectedFirmId: selectedFirm, selectedFons: [] });
    fetchFons(selectedFirm[0]).then(r => this.setState({ fons: r.rows._array }));
  };

  goToNext = () => {
    const {
      selectedDate,
      selectedFons,
      price,
      valueFetched,
      firms,
      fons,
      selectedFirmId
    } = this.state;
    if (!!selectedDate & (selectedFons.length > 0) & !!price) {
      const adet = parseFloat(price) / parseFloat(valueFetched.replace(/,/g, "."));
      this.props.addItemToPortfolio({
        adet: adet,
        firm_name: firms.find(firm => firm.id === selectedFirmId[0]).name, //
        firm_id: selectedFirmId[0],
        fon_name: fons.find(fon => fon.kod === selectedFons[0]).name, //
        fon_kod: selectedFons[0],
        date: selectedDate
      });
      this.props.navigation.navigate("MyPortfolio");
    } else alert("Lütfen tüm alanları doldurunuz!");
  };

  calculate = () => {
    const { selectedDate, selectedFons } = this.state;
    if (selectedDate && selectedFons.length) {
      fetchValue(selectedDate, selectedFons[0]).then(r => {
        if (r.rows.length > 0) {
          this.setState({ valueFetched: r.rows._array[0]["deger"] });
          this.goToNext();
        } else alert("Lütfen iş günü seçiniz!");
      });
    } else alert("Lütfen tüm alanları doldurunuz!");
  };

  selectFon = selectedFon => {
    this.setState({ selectedFons: selectedFon });
  };

  renderFirmList = () => {
    return (
      <View style={{ width: "105%", alignSelf: "center" }}>
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

  renderFonList = () => {
    return (
      <View style={{ width: "105%", alignSelf: "center" }}>
        <SectionedMultiSelect
          items={this.state.fons}
          uniqueKey="kod"
          selectText="Fon seç"
          searchPlaceholderText="Fon seç"
          modalWithSafeAreaView
          modalWithTouchable
          hideConfirm
          single
          selectLabelNumberOfLines={3}
          noItemsComponent={() => (
            <Text style={{ paddingTop: 20, alignSelf: "center", fontWeight: "bold" }}>
              Önce firma seçiniz.
            </Text>
          )}
          onSelectedItemsChange={this.selectFon}
          selectedItems={this.state.selectedFons}
          colors={{ primary: "black" }}
        />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {this.renderFirmList()}
        {this.renderFonList()}
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <TextInput
            ref="price"
            value={this.state.price}
            onChangeText={price => this.setState({ price })}
            placeholder="Yatırdığınız miktar"
            keyboardType="decimal-pad"
            style={{ width: "80%" }}
          />
          <TouchableOpacity
            onPress={() => this.refs.price.blur()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AntDesign name="check" size={24} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <DatePicker
            date={this.state.selectedDate}
            mode="date"
            placeholder="Tarih seçin"
            format="DD.MM.YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={selectedDate => this.setState({ selectedDate })}
          />
        </View>
        <View style={{ paddingTop: 20, alignSelf: "center" }}>
          <TouchableOpacity onPress={this.calculate}>
            <Text
              style={{
                fontSize: 30,
                width: 200,
                padding: 10,
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "center"
  }
});

export default connect(
  null,
  { addItemToPortfolio }
)(AddPortfolio);
