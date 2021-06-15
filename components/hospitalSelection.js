import { Searchbar, List, FAB, Card } from 'react-native-paper';
import React,{ useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


class Hospital {
    constructor(name, distance) {
        this.name = name;
        this.distance = distance;
    }
}

const styles = StyleSheet.create({
    view : {

    },
    fab : {
        position : 'absolute', // TODO: float at the right bottom of the view
        margin : 16,
        right : 0,
        bottom : -80,
    },
    scrollView : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginVertical: 3,
        flexWrap: 'wrap',
        height : 700 // TODO: dynamic height
    },
    card : {
        marginHorizontal : 10,
        margin : 20,
        width : 400,
        height : 250
    }
})

export const zhankeng = require('../assets/zhankeng.png'); 

export default function HospitalSelection() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [cardOrList, setCardOrList] = useState(false);
    const onChangeSearch = query => setSearchQuery(query);

    const hospitals = [ new Hospital('杭州市第一医院', '1.2'), 
                        new Hospital('杭州市第二医院', '1.3'), 
                        new Hospital('浙大医学院附属第一医院', '1.3'),
                        new Hospital('浙大医学院附属第二医院', '1.4'),
                        new Hospital('浙大医学院附属第三医院', '2.8') ];

    return (
        <View style={ styles.view }>
            <Searchbar placeholder='搜索医院' onChangeText={onChangeSearch} value={searchQuery}/>
            <ScrollView contentContainerStyle={ !cardOrList ? styles.scrollView : '' }>
                { hospitals .filter((hospital) => { return (hospital.name.includes(searchQuery)) })
                            .map((hospital, index) => {
                                return cardOrList ? (
                                    <List.Item key={ index } title={ hospital.name } description={ hospital.distance + ' km' }/>
                                ) : (
                                    <Card style={ styles.card } key={ index } onPress={() => navigation.navigate('Detail')}>
                                        <Card.Title title={ hospital.name } subtitle={ hospital.distance + ' km' }/>
                                        <Card.Cover source={ zhankeng } />
                                    </Card>
                                )
                            }) }
            </ScrollView>
            <FAB
                style={ styles.fab }
                small
                icon={ cardOrList ? 'plus' : 'minus' }
                onPress={ () => setCardOrList(!cardOrList) }
            />
        </View>
    )
}