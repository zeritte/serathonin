import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import InitialScreen from "../components/InitialScreen";
import MyPortfolio from "../components/MyPortfolio";
import AddPortfolio from "../components/AddPortfolio";
import Dashboard from "../components/Dashboard";
import DemoScreen from "../components/DemoScreen";
import { Menu } from "../components/Menu";
import ProfilScreen from "../components/Profil";
import AyListesi from "../components/AyinListesi";
import PortfolioElement from "../components/PortfolioElement"

const RootNavigator = createSwitchNavigator({
  Dashboard: createDrawerNavigator(
    {
      Dasboard: createStackNavigator({
        Dashboard: Dashboard,
        Demo: DemoScreen,
        Profil: ProfilScreen,
        MyPortfolio: MyPortfolio,
        AddPortfolio: AddPortfolio,
        AyListesi: AyListesi,
        PortfolioElement: PortfolioElement
      })
    },
    Menu
  ),
  InitialScreen: InitialScreen,
  AddPortfolioScreenSwitch: createStackNavigator({ AddPortfolio: AddPortfolio }),
  MyPortfolioScreenSwitch: createStackNavigator({
    MyPortfolio: MyPortfolio,
    AddPortfolio: AddPortfolio
  })
});

export default AppNavigator = createAppContainer(RootNavigator);
