import {
  Component,
  Image,
  TextInput,
  View,
  Platform,
  StyleSheet
} from 'react-native';


import * as React from 'react';
import { List,Card, Title, Divider } from 'react-native-paper';


//样式
const style = StyleSheet.create({  

  container: {  
      // flexDirection: '',   // 水平排布  
      flex:1,
      borderRadius: 5,  // 设置圆角边  
      backgroundColor: 'white',
      paddingLeft: 10,  
      paddingRight: 10,  
      width: '95%',
      resizeMode: 'stretch' ,
      paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏  
      height: Platform.OS === 'ios' ? 88 : 48,   // 处理iOS状态栏  
       // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中  
  },  
  searchBox:{//搜索框
    height:30,
    flexDirection: 'row',   // 水平排布  
    flex:1,
    borderRadius: 5,  // 设置圆角边  
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 8,  
    marginRight: 8,  
  },
  searchIcon: {//搜索图标  
      height: 20,  
      width: 20, 
      marginLeft: 5,  
      marginRight: 8, 
      resizeMode: 'stretch'  
  }, 
  inputText:{
    flex:1,
    backgroundColor:'transparent',
    fontSize:15,
  },
  voiceIcon: {  
      marginLeft: 5,  
      marginRight: 8,  
      width: 15,  
      height: 20,  
      resizeMode: 'stretch'  
  }, 
  scanIcon: {//搜索图标  
      height: 26.7,  
      width: 26.7,  
      resizeMode: 'stretch'  
  }, 
  listCard: {
      alignItems: 'center',
      padding: 30,
      width : '100%'
      // marginLeft: 8,  
      // marginRight: 8,  
  }
}); 

const MyList = () => {
const [expanded, setExpanded] = React.useState(true);
const handlePress = () => setExpanded(!expanded);

return (
  <View >
  <List.Section >    
    <View>   
      <List.Accordion
        style = {style.container}
        title="门诊部">
        <Divider />
        <List.Item title="呼吸科" />
        <List.Item title="心内科" />
        <List.Item title="消化科" />
        <List.Item title="外科" />
        <List.Item title="儿科" />
        <List.Item title="妇科" />
        <List.Item title="眼科" />
        <List.Item title="耳鼻喉科" />
      </List.Accordion>
      <Divider />
    </View>

    <List.Accordion
      title="急诊室"
      style = {style.container}
      expanded={expanded}
      onPress={handlePress}>
          <Divider />

    </List.Accordion>

    <List.Accordion
      title="住院部"
      style = {style.container}
      expanded={expanded}
      onPress={handlePress}>
          <Divider />
      <List.Item title="内科住院部" />
      <List.Item title="外科住院部"/>
      <List.Item title="妇产科住院部" />
      <List.Item title="儿科住院部"/>
      <List.Item title="监护室"/>
    </List.Accordion>

    <List.Accordion
      title="放射科"
      style = {style.container}
      expanded={expanded}
      onPress={handlePress}>
      <Divider />

    </List.Accordion>
  </List.Section>
  </View>
);
};

export default MyList;



