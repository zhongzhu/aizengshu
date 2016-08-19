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
  TabBarIOS,
  WebView
} from 'react-native';

import Book from './ios_views/bookList';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <TabBarIOS
        >
        <Icon.TabBarItemIOS
          title='找本书看'
          selected={this.state.selectedTab === '找本书看'}
          iconName="ios-book-outline"
          selectedIconName="ios-book"
          onPress={() => {
            this.setState({ selectedTab: '找本书看' });
          }}>
          <WebView
            source={{uri: 'https://m.douban.com/book/travel'}}
            style={{marginTop: 20}}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title='赠书'
          iconName="ios-send-outline"
          selectedIconName="ios-send"          
          selected={this.state.selectedTab === '赠书'}
          onPress={() => {
            this.setState({ selectedTab: '赠书' });
          }}>
          <Book title='爱查找'/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title='书信'
          iconName="ios-chatbubbles-outline"
          selectedIconName="ios-chatbubbles"          
          selected={this.state.selectedTab === '书信'}
          onPress={() => {
            this.setState({ selectedTab: '书信' });
          }}>
          <Book title='爱查找'/>
        </Icon.TabBarItemIOS>        
        <Icon.TabBarItemIOS
          title='我'
          iconName="ios-person-outline"
          selectedIconName="ios-person"          
          selected={this.state.selectedTab === '我'}
          onPress={() => {
            this.setState({ selectedTab: '我' });
          }}>
          <Book title='爱我'/>
        </Icon.TabBarItemIOS>                
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
