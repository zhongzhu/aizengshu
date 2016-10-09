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

import Utils from './utils';

export default class AddDonateBook extends Component {
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