'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, StyleSheet, TouchableHighlight, NavigatorIOS} from 'react-native';
import ScanBarCode from './scanBarCode'

// var QRCodeScreen = require('./QRCodeScreen');


class FirstPage extends Component {
  render() {
    return (
      <ScrollView style={{flex:1}}>
        <Text onPress={this.goTo.bind(this)}>haha</Text>
        <Text onPress={this.goTo.bind(this)}>hello world</Text>
        <Text onPress={this.goTo.bind(this)}>hey Jue</Text>
      </ScrollView>
    )
  }

  goTo() {
    this.props.navigator.push({
      component: SecondPage,
      title: '详情',
      rightButtonTitle: '购物车',
      onRightButtonPress: () => { alert('进入我的购物车'); }
    });
  }
}

class SecondPage extends Component {
  render() {
    return (
      <ScrollView>
      <Text>this is the Second page</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default class DonateBookNavigator extends Component {
  scanBarcode() {
    console.log('*******');
    this.refs.navi.push({
      component: ScanBarCode,
      title: '扫描图书条形码'
      });            
  }

  render() {
    return (
      <NavigatorIOS
        style={{flex:1}}
        ref= "navi"
        initialRoute={{
          title: '我捐赠的书', 
          component: FirstPage, 
          passProps: {},
          rightButtonTitle: '扫码加书',
          onRightButtonPress: () => this.scanBarcode()
        }}
      />
    );
  }
}