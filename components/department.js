import {
  Component,
  Image,
  TextInput,
  View,
  Platform,
  StyleSheet
} from 'react-native';
// import CardView from 'react-native-cardview-wayne';


// export default class App extends Component {
//     render() {
//         return (
// 				<CardView style = {style.card}>
//                     <View style={{padding:10}}>
//                         <View>
//                             <Text>CardView for iOS and Android</Text>
//                         </View>
//                         <View>
//                             <Text>This is test</Text>
//                         </View>
//                     </View>
//                 </CardView>
//         );
//     }
// };
import * as React from 'react';
import { List, Card, Title, Divider, Appbar } from 'react-native-paper';


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

  scanIcon: {//搜索图标  
    height: 26.7,
    width: 26.7,
    resizeMode: 'stretch'
  },
  // listCard: {
  //   alignItems: 'center',
  //   padding: 30,
  //   width: '100%'
  //   // marginLeft: 8,  
  //   // marginRight: 8,  
  // },
  card: {
    // cardElevation:4,
    // maxCardElevation:4,
    // radius:10,
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




// export default class MyList extends Component{
//   render(){
//       return (
//          <View style={styles.container}> 

//           <Image source={require('./images/header/header_logo.png')} style={styles.logo}/>  

//          

//           <Image source={require('./images/header/icon_qr.png')} style={styles.scanIcon}/>           

//          </View>
//       )
//   }
// }


// const MyList() => {
export default function MyList() {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

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
      <List.Section >
        <View style={style.card}>


          <List.Accordion
            // style={style.card}
            title="门诊部">

            <List.Item title="呼吸科" />
            <List.Item title="心内科" />
            <List.Item title="消化科" />
            <List.Item title="外科" />
            <List.Item title="儿科" />
            <List.Item title="妇科" />
            <List.Item title="眼科" />
            <List.Item title="耳鼻喉科" />
          </List.Accordion>


        </View>

        <View style={style.card}>
          <List.Accordion
            title="急诊室">

          </List.Accordion>
        </View>

        <View style={style.card}>
          <List.Accordion
            title="住院部"
          >
            <List.Item title="内科住院部" />
            <List.Item title="外科住院部" />
            <List.Item title="妇产科住院部" />
            <List.Item title="儿科住院部" />
            <List.Item title="监护室" />
          </List.Accordion>
        </View>

        <View style={style.card}>
          <List.Accordion
            title="放射科"
          >

          </List.Accordion>
        </View>
      </List.Section>
    </View>
  );
};

// export default MyList;



