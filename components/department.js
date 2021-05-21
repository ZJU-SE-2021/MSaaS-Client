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
import SearchBox from './searchBox'

//样式
const style = StyleSheet.create({

  // container: {
  //   // flexDirection: '',   // 水平排布  
  //   flex: 1,
  //   borderRadius: 5,  // 设置圆角边  
  //   backgroundColor: 'white',
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   width: '95%',
  //   resizeMode: 'stretch',
  //   paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏  
  //   height: Platform.OS === 'ios' ? 88 : 48,   // 处理iOS状态栏  
  //   // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中  
  // },
  // searchBox: {//搜索框
  //   height: 30,
  //   flexDirection: 'row',   // 水平排布  
  //   flex: 1,
  //   borderRadius: 5,  // 设置圆角边  
  //   backgroundColor: 'white',
  //   alignItems: 'center',
  //   marginLeft: 10,
  //   marginRight: 8,
  // },
  // searchIcon: {//搜索图标  
  //   height: 20,
  //   width: 20,
  //   marginLeft: 5,
  //   marginRight: 8,
  //   resizeMode: 'stretch'
  // },
  // inputText: {
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   fontSize: 15,
  // },

  // scanIcon: {//搜索图标  
  //   height: 26.7,
  //   width: 26.7,
  //   resizeMode: 'stretch'
  // },
  listCard: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // marginTop: 20
    // alignItems: 'center',
    // padding: 30,
    // width: '100%'
    // marginLeft: 8,  
    // marginRight: 8,  
  },
  card: {
    // cardElevation:4,
    // maxCardElevation:4,
    // radius:10,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#ffffff',
    shadowOffset: { // 设置阴影偏移量
      width: 0,
      height: 4
    },
    shadowRadius: 4, // 设置阴影模糊半径
    shadowOpacity: 0.13, // 设置阴影的不透明度
    borderRadius: 10, // 设置圆角
    shadowColor: 'rgba(96,96,96,1)' // 设置阴影色
  }

});

class Dm {
  constructor(dmName, subDm) {
    this.dmName = dmName
    this.subDm = subDm
  }
}
export default function MyList() {
  const outDpt = new Dm("门诊部", ["呼吸科", "心内科", "消化科", "外科", "儿科", "妇科", "眼科", "耳鼻喉科"])
  const emDpt = new Dm("急诊室", [])
  const inDpt = new Dm("住院部", ["内科住院部", "外科住院部", "儿科住院部", "妇产科住院部"])
  const rdDpt = new Dm("放射部", [])


  return (
    <View >
      <SearchBox/>
    <View >
      <List.Section >
        <View style={style.card}>

          <List.Accordion
            // style={style.card}
            title={outDpt.dmName}>
            {outDpt.subDm.map((item, idx) => (
              <List.Item title={item} />
            ))
            }
          </List.Accordion>


        </View>

        <View style={style.card}>
          <List.Accordion
            title={emDpt.dmName}>
            {emDpt.subDm.map((item, idx) => (
              <List.Item title={item} />
            ))
            }
          </List.Accordion>
        </View>

        <View style={style.card}>
          <List.Accordion
            title={inDpt.dmName}>
            {inDpt.subDm.map((item, idx) => (
              <List.Item title={item} />
            ))
            }
          </List.Accordion>
        </View>

        <View style={style.card}>
          <List.Accordion
            title={rdDpt.dmName}>
            {rdDpt.subDm.map((item, idx) => (
              <List.Item title={item} />
            ))
            }
          </List.Accordion>
        </View>

      </List.Section>
    </View>
    </View >
  );
};




