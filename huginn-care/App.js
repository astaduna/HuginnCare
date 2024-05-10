import React from 'react';
import { LogBox } from 'react-native';
import { RecoilRoot } from 'recoil';
import AppContainer from './src/routes';

export default function App() {
    LogBox.ignoreAllLogs();
    return (
        <RecoilRoot>
            <AppContainer />
        </RecoilRoot>
    );
}