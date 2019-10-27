import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Share
} from "react-native";

const MenuComponent = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.closeButton}>
      <TouchableOpacity
        onPress={() => navigation.closeDrawer()}
        hitSlop={{ top: 20, left: 30, bottom: 20, right: 20 }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10 }}
          source={require("../../assets/iconClose.png")}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.listStyle}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profil");
          navigation.closeDrawer();
        }}
      >
        <Text style={styles.menuText}>Profilim</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MyPortfolio");
          navigation.closeDrawer();
        }}
      >
        <Text style={styles.menuText}>Portföyüm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AyListesi");
          navigation.closeDrawer();
        }}
      >
        <Text style={styles.menuText}>Ayın Birincileri</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 30
  },
  closeButton: { alignSelf: "flex-end", marginRight: -30 },
  listStyle: { flex: 9, marginTop: 50 },
  menuText: {
    fontSize: 28,
    lineHeight: 48,
    paddingVertical: 8,
    letterSpacing: 0.5,
    color: "#354b73"
  },
  quoteContainer: {
    flex: 2,
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  quoteText: {
    opacity: 0.6,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: "#354b73"
  },
  quoteText2: {
    opacity: 0.6,
    paddingTop: 10,
    fontStyle: "italic",
    fontSize: 25,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center",
    color: "#354b73"
  },
  signatureContainer: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  signatureText: {
    opacity: 0.6,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 1.5,
    textAlign: "center",
    color: "#28a9c2"
  }
});

const { width } = Dimensions.get("window");
const Menu = {
  contentComponent: props => <MenuComponent {...props} />,
  drawerBackgroundColor: "white",
  shadowColor: "rgba(0, 0, 0, 0.3)",
  shadowOffset: {
    width: 4,
    height: 0
  },
  shadowRadius: 12,
  shadowOpacity: 1,
  drawerWidth: width * 0.72
};

export { Menu };
