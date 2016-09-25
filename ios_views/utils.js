'use strict';

import React, { Component, PropTypes } from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity, 
  NavigatorIOS,
  AlertIOS
} from 'react-native';

module.exports = {
  getBookByID: function(id, successCallback, failCallback){
    let query = 'https://api.douban.com/v2/book/' + id;

    fetch(query)
      .then((response) => response.json())
      .then((json) => successCallback(json))
      .catch((err) => failCallback(err));
  },

  getBookByISBN: function(isbn, successCallback, failCallback){
    let query = 'https://api.douban.com/v2/book/isbn/' + isbn;

    fetch(query)
      .then((response) => response.json())
      .then((json) => successCallback(json))
      .catch((err) => failCallback(err));
  },

};