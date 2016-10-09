'use strict';

import React, { Component, PropTypes } from 'react';
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity, 
  NavigatorIOS,
  AlertIOS,
  AsyncStorage
} from 'react-native';

module.exports = {
  searchBooks: function(searchString, successCallback, failCallback) {
    let query = 'https://api.douban.com/v2/book/search?count=5&q=' + searchString + '&fields=title,image,author,isbn13,id';

    fetch(query)
    .then((response) => response.json())
    .then((json) => successCallback(json.books))
    .catch((err) => failCallback(err))
    .done();
  },

  getBookByID: function(id, successCallback, failCallback) {
    let query = 'https://api.douban.com/v2/book/' + id;

    fetch(query)
      .then((response) => response.json())
      .then((json) => successCallback(json))
      .catch((err) => failCallback(err))
      done();
  },

  getBookByISBN: function(isbn, successCallback, failCallback) {
    let query = 'https://api.douban.com/v2/book/isbn/' + isbn;

    fetch(query)
      .then((response) => response.json())
      .then((json) => successCallback(json))
      .catch((err) => failCallback(err))
      .done();
  },

  getMyDonateBooks: function(successCallback, failCallback) {
    AsyncStorage.getItem('myDonateBooks')
    .then((response) => JSON.parse(response))
    .then((json) => successCallback(json.books))
    .catch((err) => failCallback(err))
    .done();
  },

  initMyDonateBooksForTesting: function() {
    let myDonateBooks = {"total":459,"books":[{"image":"https://img1.doubanio.com\/mpic\/s4356378.jpg","isbn13":"9789866244087","title":"三京畫本"},{"image":"https://img3.doubanio.com\/mpic\/s3909231.jpg","isbn13":"9784336050557","title":"妖怪画本・狂歌百物語"},{"image":"https://img1.doubanio.com\/mpic\/s27311818.jpg","isbn13":"9787115341273","title":"水色滋味：让你恋上水彩的美食画本"},{"image":"https://img1.doubanio.com\/mpic\/s27394328.jpg","isbn13":"9784887414198","title":"(企画本)もっと!!困った時には星に聞け!"},{"image":"https://img3.doubanio.com\/mpic\/s1105031.jpg","isbn13":"9787530516461","title":"枕中记 中国古典名著画本"}]};

    AsyncStorage.setItem('myDonateBooks', JSON.stringify(myDonateBooks));
  }

};