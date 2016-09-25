'use strict';

import React, { Component, PropTypes } from 'react';
import { 
  ScrollView, 
  Text,
  View,
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity, 
  NavigatorIOS,
  AlertIOS,
  Image,
  ActivityIndicator
} from 'react-native';

// import ScanBarCode from './scanBarCode'
import QRCodeScanner from 'react-native-qrcode-scanner';
import Utils from './utils';


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

class AddDonateBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true
    };      
  }

  componentDidMount() {
    let me = this;
    console.log(me.props.bookISBN);
    Utils.getBookByISBN(me.props.bookISBN, me.handleResponse.bind(me), me.handleErr.bind(me));
  }

  handleResponse(json) {
    // console.log(json);
    this.setState({
      data: json,
      isLoading: false
    });
  }

  handleErr(err) {
    console.log(err)
   this.setState({
    data: null,
    isLoading: true,
    message: 'Something bad happened ' + err
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        {
          this.state.isLoading?
          <ActivityIndicator
            animating={true}
            style={{height: 80}}
            size="large"
          />
          :
          <ScrollView style={{marginTop: 65}}>
            <View>
              <View style={styles.rowContainer}>
                <Image style={styles.thumb} source={{ uri: this.state.data.images.large }} />
                <View  style={styles.textContainer}>              
                  <Text style={styles.title} numberOfLines={1}>{this.state.data.title}</Text>
                  <Text style={{marginTop: 10}} numberOfLines={1}>{this.state.data.author}</Text>
                  <Text>{this.state.data.publisher}</Text>
                  <Text>{this.state.data.pubdate}</Text>
                  <Text>{this.state.data.price}</Text>
                </View>
              </View>
              <View style={styles.separator}/>
              <Text style={{margin: 10}}>{this.state.data.summary}</Text>

            </View>

          </ScrollView>
        }
      </View>      
    )
  }
}

export default class DonateBookNavigator extends Component {
  onBarCodeRead(e) {
    // console.log("Type: " + e.type + " Data: " + e.data);
    this.refs.navi.replace({
      component: AddDonateBook,
      title: '图书信息',
      passProps: {
        bookISBN: e.data
      }
    });
  }

  scanBarcode() {
    this.refs.navi.push({
      component: QRCodeScanner,
      title: '扫码加书',
      passProps: {
        fadeIn: false,
        onRead: this.onBarCodeRead.bind(this),
        topContent: <Text>扫描书背后的条形码，把书加入你的赠书列表</Text>,
        bottomContent: <TouchableOpacity><Text></Text></TouchableOpacity>
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

var styles = StyleSheet.create({
  thumb: {
    width: 120,
    height: 150,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});