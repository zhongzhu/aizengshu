'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, View, ListView, StyleSheet, TouchableHighlight, NavigatorIOS} from 'react-native';

class BookList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };	
  }

  render() {
    return (
      <View style={{paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
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
