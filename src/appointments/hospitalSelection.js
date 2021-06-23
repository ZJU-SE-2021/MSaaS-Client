import {Searchbar, List, FAB, Card, Snackbar} from 'react-native-paper';
import React, {useEffect, useState} from "react";
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ScreenWrapper from "../components/ScreenWrapper";
import LoadingWrapper from "../components/LoadingWrapper";
import {Configuration, HospitalCreationFormFromJSON, HospitalsApi} from "../../network";
import {InitialState as state} from "../../store/reducer";


class Hospital {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}

// const hospitals = [
//     new Hospital('杭州市第一医院', '1.2'),
//     new Hospital('杭州市第二医院', '1.3'),
//     new Hospital('浙大医学院附属第一医院', '1.3'),
//     new Hospital('浙大医学院附属第二医院', '1.4'),
//     new Hospital('浙大医学院附属第三医院', '2.8')
// ]

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    scrollView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 3,
        flexWrap: 'wrap',
    },
    card: {
        marginHorizontal: 10,
        margin: 20,
        width: 400,
        height: 250
    }
})

const picPlaceHolder = require('../../assets/hospital-place-holder.png');

export default function HospitalSelection() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [cardOrList, setCardOrList] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [message, setMessage] = useState('')
    const onChangeSearch = query => setSearchQuery(query);

    function getHospitals() {
        const conf = new Configuration({apiKey: state.jwtToken});
        console.log(state.jwtToken);
        const hospitalApi = new HospitalsApi(conf);

        hospitalApi.getHospitals().then(res => {
            let temp = []
            res.map(hospital => {
                temp.push(new Hospital(hospital.name, hospital.address))
            })
            setHospitals(temp);
            setIsLoading(false);
        }, reason => {
            setMessage('医院列表获取失败');
            setShowMessage(true);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getHospitals();
    }, []);

    return (
        <View style={styles.view}>
            <Searchbar placeholder='搜索医院' onChangeText={onChangeSearch} value={searchQuery}/>
            <LoadingWrapper isLoading={isLoading}>
                <ScreenWrapper>
                    <View style={!cardOrList ? styles.scrollView : ''}>
                        {hospitals.filter((hospital) => {
                            return (hospital.name.includes(searchQuery))
                        })
                            .map((hospital, index) => {
                                return cardOrList ? (
                                    <List.Item key={index} title={hospital.name} description={hospital.address}
                                               onPress={() => navigation.navigate('Hospital', {hospital})}/>
                                ) : (
                                    <Card style={styles.card} key={index}
                                          onPress={() => navigation.navigate('Hospital', {hospital})}>
                                        <Card.Title title={hospital.name} subtitle={hospital.address}/>
                                        <Card.Cover source={picPlaceHolder}/>
                                    </Card>
                                )
                            })}
                    </View>
                </ScreenWrapper>
            </LoadingWrapper>
            <FAB
                style={styles.fab}
                icon={cardOrList ? 'grid' : 'text'}
                onPress={() => setCardOrList(!cardOrList)}
            />
            <Snackbar
                visible={showMessage}
                onDismiss={() => setShowMessage(false)}
            >
                {message}
            </Snackbar>
        </View>
    )
}