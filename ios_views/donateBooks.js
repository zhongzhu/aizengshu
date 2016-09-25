'use strict';

import React, { Component, PropTypes } from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity, 
  NavigatorIOS,
  AlertIOS
} from 'react-native';

// import ScanBarCode from './scanBarCode'
import QRCodeScanner from 'react-native-qrcode-scanner';


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
  // scanBarcode() {
  //   console.log('*******');
  //   this.refs.navi.push({
  //     component: ScanBarCode,
  //     title: '扫描图书条形码'
  //     });            
  // }

  onBarCodeRead(e) {
    AlertIOS.alert(
        "Barcode Found!",
        "Type: " + e.type + "\nData: " + e.data
    );
  }

  scanBarcode() {
    console.log('*******');
    this.refs.navi.push({
      component: QRCodeScanner,
      title: '扫描图书条形码',
      passProps: {
        onRead: this.onBarCodeRead.bind(this),
        topContent: <Text style={styles.centerText}>Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.</Text>,
        bottomContent: <TouchableOpacity style={styles.buttonTouchable}><Text style={styles.buttonText}>OK. Got it!</Text></TouchableOpacity>
      }
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