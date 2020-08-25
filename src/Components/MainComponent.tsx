import React from 'react';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import StateObject from '../Objects/StateObject';

const instance = StateObject.getInstance();

function MainComponent() {
    return (
        <div>
            <FirstComponent />
            <SecondComponent />
        </div>
    );
}

export default MainComponent;
