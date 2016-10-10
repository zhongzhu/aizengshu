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
    let myDonateBooks = {"count":5,"start":0,"total":14836,"books":[{"image":"https://img1.doubanio.com\/mpic\/s8472038.jpg","title":"绘画","id":"6802150","isbn13":"9787121142512","author":["彼得·库克"]},{"image":"https://img3.doubanio.com\/mpic\/s3720211.jpg","title":"一词一画","id":"1789397","isbn13":"9787541700750","author":["杨恩成注泽"]},{"image":"https://img1.doubanio.com\/mpic\/s6125528.jpg","title":"说唐连环画收藏本（套装全6册）","id":"3374912","isbn13":"9787535629555","author":["文昊 改编"]},{"image":"https://img1.doubanio.com\/mpic\/s1728449.jpg","title":"动物知识翻翻书--在海滩上（注音版）","id":"1102928","isbn13":"9787754142064","author":[]},{"image":"https://img3.doubanio.com\/mpic\/s27217975.jpg","title":"全译绘画圣经故事","id":"25826844","isbn13":"9787303019106","author":[]}]};

    AsyncStorage.setItem('myDonateBooks', JSON.stringify(myDonateBooks));
  }

};