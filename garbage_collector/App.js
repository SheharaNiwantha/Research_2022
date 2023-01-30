/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import SplashScreen from './src/screen/splash_screen/splashscreen';
import AuthScreen from './src/screen/auth_screen/authscreen';
import SignUpScreen from './src/screen/signup_screen/signupscreen';
import DriverDashBordScreen from './src/screen/driver_dashbord_screen/driverdashbordscreen';
import CoustomerDashBordScreen from './src/screen/coustomer_home_screen/coustomerhomescreen';

import AddTrashTab from './src/screen/client_tab/AddTrashTab';
import ClientDashbordTab from './src/screen/client_tab/ClinetDashbordTab';
import LocationBinTab from './src/screen/client_tab/LocationBinTab';
import PointTab from './src/screen/client_tab/PonitTab';
import WinningInfo from './src/screen/client_tab/winningInfoTab';


import DriverDashBordTab from './src/screen/driver_tab/DashBordTab';
import MapTab from './src/screen/driver_tab/MapTab';
import NotificationTab from './src/screen/driver_tab/NotificationTab';

import AddTrashFormTab from './src/screen/client_tab/addTrashFormTab';
import SpinnerTab from './src/screen/client_tab/SpinnerTab';

import { Provider } from 'react-redux';
import { Store } from './src/redux/store';


import { Stack, Router, Scene, ActionConst, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DriverTabIcon = ({ focused, title }) => {
  var imageName = null;
  var colors = null;

  switch (title) {
    case "DHome":
      imageName = (focused) ? 'home' : 'home';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
    case "Map":
      imageName = (focused) ? 'enviroment' : 'enviromento';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
    case "Notification":
      imageName = (focused) ? 'inbox' : 'inbox';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
  }

  return (
    <View style={styles.bootmIconHolder}>
      <Icon color={colors} name={imageName} size={20} />
      <Text style={[styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>{title}</Text>
    </View>
  )
}

const ClientTabIcon = ({ focused, title }) => {
  var imageName = null;
  var colors = null;

  switch (title) {
    case "Home":
      imageName = (focused) ? 'home' : 'home';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
    case "Add Trash":
      imageName = (focused) ? 'isv' : 'isv';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
    case "Location":
      imageName = (focused) ? 'API' : 'API';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
    case "My Point":
      imageName = (focused) ? 'piechart' : 'piechart';
      colors = (focused) ? '#EB1F25' : '#757575';
      break;
  }

  return (
    <View style={styles.bootmIconHolder}>
      <Icon color={colors} name={imageName} size={20} />
      <Text style={[styles.tabBartext, { color: (focused) ? "#EB1F25" : "#757575" }]}>{title}</Text>
    </View>
  )
}

const App = () => {

  global.curretbinInfos = { "weight": 0, "level": 0, "status": "OK" };
  global.driverId = 0;
  global.driverName = "";
  global.collectBinCount = 0;
  global.spinCount = 0;
  global.directionList = [
    {
      "binName": "Mablabe Collotor bin",
      "logitute": "6.9040",
      "latitute": "79.9550"
    }
  ];
  global.pointList = [
    {
      "binId": 1,
      "type": "Plastic",
      "weight": 10.4,
      "date": "2022/10/01",
      "point": 5,

    },
    {
      "binId": 1,
      "type": "Plastic",
      "weight": 10.4,
      "date": "2022/10/01",
      "point": 3,

    }
  ];
  return (
    <Provider store={Store}>
      <Router>
        <Stack key="root" headerLayoutPreset="center">
          <Scene
            key="splash"
            type="replace"
            component={SplashScreen}
            initial
            hideNavBar={true}
          />
          <Scene
            key="auth"
            type="replace"
            component={AuthScreen}
            hideNavBar={true}
            panHandlers={null}
          />
          <Scene
            key="sigup"
            type="replace"
            component={SignUpScreen}
            hideNavBar={true}
            panHandlers={null}
          />
          <Scene
            key="driverAuthenticate"
            type="replace"
            tabs={true}
            showLabel={false}
            panHandlers={null}
          >
            <Scene key="driverdashbordtab" title="DHome" icon={DriverTabIcon} type='refresh' onPress={() => { alert("dashbird"); Actions.refresh({ key: 'driverDashBordTab' }) }} >
              <Scene
                key="driverDashBordTab"
                component={DriverDashBordTab}
                title="Home"
                //hideNavBar={true}
                showLabel={false}
                
              />

            </Scene>
            <Scene key="maptab" title="Map" icon={DriverTabIcon} onPress={() => { Actions.refresh({ key: 'mapTab' }) }}  >
              <Scene
                key="mapTab"
                component={MapTab}
                title="Map"
                //hideNavBar={true}
                showLabel={false}
              />
            </Scene>
            <Scene key="notifiactiontab" title="Notification" icon={DriverTabIcon} onPress={() => { Actions.refresh({ key: 'notifiactionTab' }) }}  >
              <Scene
                key="notifiactionTab"
                component={NotificationTab}
                title="Notification"
                //hideNavBar={true}
                showLabel={false}
              />
            </Scene>
          </Scene>
          <Scene
            key="clientAuthenticate"
            type="replace"
            tabs={true}
            showLabel={false}
            panHandlers={null}
          >
            <Scene key="clientdashbordtab" title="Home" icon={ClientTabIcon} type='refresh' onPress={() => { Actions.refresh({ key: 'clientDashBordTab' }) }}  >
              <Scene
                key="clientDashBordTab"
                component={ClientDashbordTab}
                activeTintColor="#EB1F25"
                title="Home"
                //hideNavBar={true}
                showLabel={false}
              />
            </Scene>
            <Scene key="addtrashtab" title="Add Trash" icon={ClientTabIcon}  onPress={() => { Actions.refresh({ key: 'addTrashTab' }) }}  >
              <Scene
                key="addTrashTab"
                component={AddTrashTab}
                activeTintColor="#EB1F25"
                title="Add Trash"
                //hideNavBar={true}
                showLabel={false}
              />
            </Scene>

            <Scene key="locationbintab" title="Location" icon={ClientTabIcon} onPress={() => { Actions.refresh({ key: 'locationBinTab' }) }}  >
              <Scene
                key="locationBinTab"
                component={LocationBinTab}
                activeTintColor="#EB1F25"
                title="Location"
                //hideNavBar={true}
                showLabel={false}
              />
            </Scene>
            <Scene key="pointtab" icon={ClientTabIcon} title="My Point"  onPress={() => { Actions.refresh({ key: 'pointTab' }) }} >
              <Scene
                key="pointTab"
                component={PointTab}
                activeTintColor="#EB1F25"
                title="My Point"
                //hideNavBar={true}
                showLabel={false}
              />
            </Scene>
            <Scene
              key="trashForm"
              title="Select Trash Info"
              component={AddTrashFormTab}
            //hideNavBar={true}
            />
            <Scene
              key="spinner"
              title="Spin your luck"
              component={SpinnerTab}
            //hideNavBar={true}
            />
            <Scene
              key="winning"
              title="Grab your gift"
              component={WinningInfo}
            //hideNavBar={true}
            />

          </Scene>

        </Stack>
      </Router>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bootmIconHolder: {
    width: wp('17%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBartext: {
    fontSize: 12,
    color: '#757575',
    letterSpacing: 0.04,
  },
});

export default App;
