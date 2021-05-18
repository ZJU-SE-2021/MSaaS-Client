import React, {useState} from 'react';
import {BottomNavigation} from 'react-native-paper';
import Home from "./home";
import Appointments from "./appointments";
import Mine from "./mine";

const Main = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'home', title: '主页', icon: 'home'},
        {key: 'appointment', title: '预约挂号', icon: 'calendar-plus'},
        {key: 'mine', title: '我的', icon: 'account'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        appointment: Appointments,
        mine: Mine,
    });

    return (
        <BottomNavigation
            shifting
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default Main;