import React from 'react';
import { RecoilRoot } from 'recoil';
import AppContainer from './src/routes';

export default function App() {
    return (
        <RecoilRoot>
            <AppContainer />
        </RecoilRoot>
    );
}