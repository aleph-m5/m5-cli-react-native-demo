import React, { Component } from 'react';

import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

// Dont not remove this for auto update
/* M5 import */
/* end M5 import */

// Landing is default
import Landing from "../containers/Landing";

const LandingScreen = createStackNavigator({
    Landing: Landing
}, {
    headerMode: 'none',
    initialRouteName: 'Landing'
})

const screenList = {
    LandingScreen: LandingScreen
}

const appRoutes = createStackNavigator( screenList,
    {
        headerMode: 'none',
        initialRouteName: 'LandingScreen'
    }
);

export default createAppContainer(appRoutes)
