'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, View, ListView, StyleSheet, TouchableHighlight, NavigatorIOS} from 'react-native';

class BookList extends Component {
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
    //   dataSource: ds.cloneWithRows([
    //     'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
    //   ]),
      isLoading: true
    };    
  }

  getData() {
    let query = 'https://api.douban.com/v2/book/search?count=3&q=旅游&fields=title,image,author,isbn13,id';
    console.log(query);
    // this.setState({ isLoading: true });

    fetch(query)
    .then((response) => response.json())
    .then((json) => this.handleResponse(json.books))
    .catch((error) => { 
       this.setState({
        isLoading: true,
        message: 'Something bad happened ' + error
        });
     });
  }

  componentDidMount(){
    this.getData();
  }

  handleResponse(response) {
    console.log(response);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    // this.state = {
    //   dataSource: ds.cloneWithRows([
    //     'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
    //   ]),
    //   isLoading: false
    // };    

    this.setState({
        dataSource: ds.cloneWithRows(response),
        isLoading: false
    });
  }

  render() {
    return (
      <View style={{paddingTop: 22}}>
        {
          this.state.isLoading?
          <Text>loading...</Text>
          :
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.title}</Text>}
          />
        }
      </View>      
    )
  }
}

export default class AllBooks extends Component {
  render() {
    return (
      <NavigatorIOS
        style={{flex:1}}
        initialRoute={{ title: '领取一本书', component: BookList, passProps: {} }}
      />
    );
  }
}
