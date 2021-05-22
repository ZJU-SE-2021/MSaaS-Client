import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';

import React, { useState } from "react";
import { List, Searchbar } from 'react-native-paper';

//样式
const style = StyleSheet.create({

  card: {
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
export default function DepartmentSelection() {
  const Dpt = [new Dm("门诊部", ["呼吸科", "心内科", "消化科", "外科", "儿科", "妇科", "眼科", "耳鼻喉科"]),
  new Dm("急诊室", []),
  new Dm("住院部", ["内科住院部", "外科住院部", "儿科住院部", "妇产科住院部"]),
  new Dm("放射部", [])]

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View >
      <Searchbar placeholder='输入关键字' onChangeText={onChangeSearch} value={searchQuery} />
      <ScrollView >
        {Dpt.filter((dpt) => {
          return (dpt.dmName.includes(searchQuery) )
        })
          .map((dpt, index) => {
            return (
              <List.Section >
                <View style={style.card}>
                  <List.Accordion
                    title={dpt.dmName}>
                    {dpt.subDm.map((item, idx) => (
                      <List.Item title={item} />
                    ))
                    }
                  </List.Accordion>
                </View>
              </List.Section>

            )
          })}
      </ScrollView>
    </View >
  );
};




