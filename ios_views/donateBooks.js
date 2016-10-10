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
  ActivityIndicator,
  ListView
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import AddDonateBook from './addDonateBook';
import Utils from './utils'; 
import BookDetails from './bookDetails';

class DonateBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };    
  }

  componentDidMount(){
    this.setState({ isLoading: true });

    Utils.getMyDonateBooks(      
      this.handleResponse.bind(this), 
      (err) => { 
        console.error(err.message);
        this.setState({
          isLoading: true,
        });
      }
    );    
  }  

  handleResponse(response) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

    this.setState({
        dataSource: ds.cloneWithRows(response),
        isLoading: false
    });
  }

  onBookDetails(id) {
    this.props.navigator.push({
      component: BookDetails,
      title: '详情',
      passProps:{
        id: id
      }
    });
  }  

  renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    return (
      <TouchableHighlight onPress={this.onBookDetails.bind(this, rowData.id)}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.image }} />
            <View  style={styles.textContainer}>     
              <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }  

  render() {
    return (
      <View style={{flex:1}}>
        {
          this.state.isLoading?
          (<ActivityIndicator animating={true} style={[styles.centering, {height: 80}]} size="large" />)
          :
          (
          <View style={{marginTop: 70}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
          )
        }
      </View>  
    )
  }
}


export default class DonateBookNavigator extends Component {
  onBarCodeRead(e) {
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
          component: DonateBookList, 
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