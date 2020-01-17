import * as Expo from "expo";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";
import material from "./native-base-theme/variables/material";
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";
import ProfileScreen from "./screens/profile";
import TweetDetailsScreen from "./screens/tweetDetails";
import { Root } from "native-base";
import { createStackNavigator } from 'react-navigation-stack';
import * as Font from "expo-font"
import { Provider } from "react-redux";
import store from "./store";
import "regenerator-runtime/runtime";
import { createAppContainer } from 'react-navigation';
console.disableYellowBox = true;
const RootStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
    TweetDetails: { screen: TweetDetailsScreen }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);
const AppContainer = createAppContainer(RootStack);


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <Expo.AppLoading />;
    } else
      return (
        <Provider store={store}>
          <AppContainer/>
        </Provider>
      );
  }
}
