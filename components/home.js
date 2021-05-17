import { Appbar } from 'react-native-paper';
import React from "react";

export default function Home() {
    return (
        <Appbar.Header>
            <Appbar.Content title="MSaaS" subtitle="智能医疗系统" />
        </Appbar.Header>
    )
}