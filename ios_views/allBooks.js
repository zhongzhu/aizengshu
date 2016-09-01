'use strict';

import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, View, Image, ListView, StyleSheet, TouchableHighlight, NavigatorIOS} from 'react-native';

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
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

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };    
  }

  getData() {
    this.setState({ isLoading: true });

    let query = 'https://api.douban.com/v2/book/search?count=3&q=流行&fields=title,image,author,isbn13,id';
    console.log(query);
   
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

    this.setState({
        dataSource: ds.cloneWithRows(response),
        isLoading: false
    });
  }

  renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    return (
      <TouchableHighlight underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: rowData.image }} />
            <View  style={styles.textContainer}>              
              <Text style={styles.title}>{rowData.title}</Text>
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
          <Text>loading...</Text>
          :
          <ListView style={{marginTop: 60}}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
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
