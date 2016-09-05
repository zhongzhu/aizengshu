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

export default class BookDetails extends Component {
  getInitialState() {
    return({
      data: null,
      isLoading: true
    });
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
          <Text>{this.state.data.summary}</Text>
        }
      </View>      
    )
  }
}
