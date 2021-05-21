import { Searchbar, List } from 'react-native-paper';
import React,{ useState } from "react";
import { View } from 'react-native';

class Hospital {
    constructor(name, distance) {
        this.name = name;
        this.distance = distance;
    }
}

export default function HospitalSelection() {
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const hospitals = [ new Hospital('杭州市第一医院', '1.2'), 
                        new Hospital('杭州市第二医院', '1.3'), 
                        new Hospital('浙大医学院附属第一医院', '1.3'),
                        new Hospital('浙大医学院附属第二医院', '1.4'),
                        new Hospital('浙大医学院附属第三医院', '2.8') ];

    return (
        <View>
            <Searchbar placeholder='搜索医院' onChangeText={onChangeSearch} value={searchQuery}/>
            <View>
                { hospitals .filter((hospital) => { return (hospital.name.includes(searchQuery)) })
                            .map((hospital, index) => {
                                return (
                                    <List.Item key={ index } title={ hospital.name } description={ hospital.distance + ' km' }/>
                                )
                            }) }
            </View>
        </View>
    )
}