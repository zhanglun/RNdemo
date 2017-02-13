import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  NavigatorIOS,
  Navigator,
  Text,
  View,
  Button,
  TouchableHighlight,
} from 'react-native';

import ListViewBasics from './components/scenes/List';
import DetailView from './components/scenes/Detail';

export default class RNdemo extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    let _navigator = navigator;
    switch(route.type) {
      case 'list':
        return (<ListViewBasics navigator={navigator} route={route} />);
      case 'detail':
        return (<DetailView navigator={navigator} route={route} />);
    }
  }

  render() {
    let NavigationBarRouteMapper = {
      LeftButton: function (route, navigator, index, navState) {
        if (route.index > 0) {
          return <Button
            title="返回"
            style={styles.navigatorButton}
            onPress={() => {
            navigator.pop();
          }}>返回</Button>;
        } else {
          return null;
        }
      },

      RightButton: function (route, navigator, index, navState) {
        return null;
      },

      Title: function (route, navigator, index, navState) {
        return (
          <Text style={[styles.navBarText, styles.navBarTitleText]}>
            {route.title}
          </Text>
        );
      },
    };

    return (
        <Navigator
          style={styles.navigator}
          initialRoute={{ type: 'list', title: '电影列表', index: 0 }}
          renderScene={this.renderScene}
          navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navigatorBar}
            automaticallyAdjustContentInsets={false}
          />
        }
      />
    );
  }
}

const styles = {
  navigator: {
    backgroundColor: '#fff',
  },
  navigatorBar: {
    marginTop: 20,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  navigatorButton: {
    backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  navBarText: {
    fontSize: 16,
    marginTop: 2,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};

// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('RNdemo', () => RNdemo);
