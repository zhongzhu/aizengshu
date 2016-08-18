/**
 * 爱赠书：断舍离的时候把旧书扔掉，倒不如看看或许别人正好需要这本书？
 *
 * https://github.com/zhongzhu/aizengshu
 *
 * @zhongzhu
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Book from './ios_views/bookList';

class aizengshu extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: '图书'};
  }

  _renderContent(text) {
    return (
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title='图书'
          selected={this.state.selectedTab === '图书'}
          onPress={() => {
            this.setState({ selectedTab: '图书' });
          }}>
          <Book title='爱赠书'/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='查找'
          selected={this.state.selectedTab === '查找'}
          onPress={() => {
            this.setState({ selectedTab: '查找' });
          }}>
          <Book title='爱查找'/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='我'
          selected={this.state.selectedTab === '我'}
          onPress={() => {
            this.setState({ selectedTab: '我' });
          }}>
          <Book title='爱我'/>
        </TabBarIOS.Item>                
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('aizengshu', () => aizengshu);
