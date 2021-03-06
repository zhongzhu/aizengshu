'use strict';

import React, { Component, PropTypes } from 'react';
import { 
  ScrollView, 
  Text, 
  View, 
  Image, 
  ListView, 
  StyleSheet, 
  TouchableHighlight, 
  ActivityIndicator, 
  NavigatorIOS
} from 'react-native';

import Utils from './utils'; 

export default class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true
    };
  }

  getData() {    
    let query = 'https://api.douban.com/v2/book/' + this.props.id;
    console.log(query);
   
    fetch(query)
    .then((response) => response.json())
    .then((json) => this.handleResponse(json))
    .catch((error) => { 
       this.setState({
        data: null,
        isLoading: true,
        message: 'Something bad happened ' + error
        });
     });
  }

  handleResponse(json) {
    console.log(json);
    this.setState({
      data: json,
      isLoading: false
    });
  }

  componentDidMount() {
    var id = this.props.id;
    var me = this;
    console.log(id);
    me.getData(id);
  }

  donateThisBook(data) {
    console.log('to donate this book');
    console.log(data);
    let aBook = {
      image: data.image,
      title: data.title,
      id: data.id,
      isbn13: data.isbn13,
      author: data.author
    };

    Utils.donateOneBook(
      aBook,
      () => {
        console.log('done');
      },
      (err) => console.error(err.message)
    );
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
              <TouchableHighlight style={styles.button}
                underlayColor='#99d9f4'
                onPress={this.donateThisBook.bind(this, this.state.data)}
              >
                <Text style={styles.buttonText}>Donate this book</Text>
              </TouchableHighlight>
            </View>

          </ScrollView>
        }
      </View>      
    )
  }
}

var styles = StyleSheet.create({
  thumb: {
    width: 120,
    height: 150,
    marginRight: 10
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
    // alignSelf: 'stretch',
    justifyContent: 'center'
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },  
});
