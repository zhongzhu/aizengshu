'use strict';

import BookDetails from './bookDetails';

import React, { Component, PropTypes } from 'react';
import { 
  ScrollView, 
  Text, 
  View, 
  Image, 
  ListView, 
  StyleSheet, 
  TouchableHighlight, 
  TextInput,
  ActivityIndicator, 
  NavigatorIOS } from 'react-native';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchString: '绘本'
    };    
  }

  onSearchPressed() {
    this.getData();
  }  

  getData() {
    this.setState({ isLoading: true });

    let query = 'https://api.douban.com/v2/book/search?count=5&q=' + this.state.searchString + '&fields=title,image,author,isbn13,id';
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
    console.log(this.state);
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

  onBookDetails(id) {
    this.props.navigator.push({
      component: BookDetails,
      title: '详情',
      passProps:{
        id: id
      }
    });
  }

  onSearchTextChanged(event) {
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  render() {
    return (
      <View style={{flex:1}}>
        {
          this.state.isLoading?
          (<ActivityIndicator
            animating={true}
            style={[styles.centering, {height: 80}]}
            size="large"
          />)
          :
          (
          <View style={{marginTop: 70}}>
          <View style={styles.flowRight}>
            <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='用书名搜索'/>
            <TouchableHighlight style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onSearchPressed.bind(this)}
              >
              <Text style={styles.buttonText}>Go</Text>
            </TouchableHighlight>
          </View>
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
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }    
});