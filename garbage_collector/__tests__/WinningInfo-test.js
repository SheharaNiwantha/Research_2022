import React from "react";
import {create} from 'react-test-renderer';
import WinningInfo from "../src/screen/client_tab/winningInfoTab";

const tree = create(<WinningInfo/>);

jest.runAllTimers();

test('snapshot',()=>{
    expect(tree).toMatchSnapshot();
})