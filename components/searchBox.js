import {
    Component,
    Image,
    TextInput,
    View,
    Platform,
    StyleSheet
  } from 'react-native';
  
  import * as React from 'react';
  import { List, Card, Title, Divider, Appbar } from 'react-native-paper';
  
  
  //样式
  const style = StyleSheet.create({

    searchBox: {//搜索框
      height: 30,
      flexDirection: 'row',   // 水平排布  
      flex: 1,
      borderRadius: 5,  // 设置圆角边  
      backgroundColor: 'white',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 8,
    },
    searchIcon: {//搜索图标  
      height: 20,
      width: 20,
      marginLeft: 5,
      marginRight: 8,
      resizeMode: 'stretch'
    },
    inputText: {
      flex: 1,
      backgroundColor: 'transparent',
      fontSize: 15,
    },
  
  });
  

  export default function SearchBox() {

    return (
      <View >
        <Appbar.Header>
          {/* <Appbar.Content /> */}
          <View style={style.searchBox}>
            <TextInput style={style.inputText}
              keyboardType='web-search'
              placeholder='  输入关键字' />
            <Image source={require('../assets/search_icon.png')} style={style.searchIcon} />
          </View>
        </Appbar.Header>
      </View>
    );
  };
  
  
  
  
  