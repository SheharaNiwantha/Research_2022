import React from "react";
import {create} from 'react-test-renderer';
import SplashScreen from "../src/screen/splash_screen/splashscreen";

const tree = create(<SplashScreen/>);

jest.runAllTimers();

test('snapshot',()=>{
    expect(tree).toMatchSnapshot();
})