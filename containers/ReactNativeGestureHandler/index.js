import React from 'react';
import { Text, View, FlatList, StyleSheet, YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SwipeableTable from './swipeable';
import Rows from './rows';
import Multitap from './multitap';
import Draggable from './draggable';
import ScaleAndRotate from './scaleAndRotate';
// import PagerAndDrawer from './pagerAndDrawer';
import PanAndScroll from './panAndScroll';
import PanResponder from './panResponder';
import Bouncing from './bouncing';
import HorizontalDrawer from './horizontalDrawer';
import Fling from './fling/index';
import doubleDraggable from './doubleDraggable';
import ChatHeads from './chatHeads';
// import { ComboWithGHScroll, ComboWithRNScroll } from './combo';
import BottomSheet from './bottomSheet/index';
import doubleScalePinchAndRotate from './doubleScalePinchAndRotate';
import forceTouch from './forcetouch';
import { TouchablesIndex, TouchableExample } from './touchables';
import MainScreen from "./MainScreen";

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
// refers to bug in React Navigation which should be fixed soon
// https://github.com/react-navigation/react-navigation/issues/3956

export const SCREENS = {
  Rows: { screen: Rows, title: 'Table rows & buttons' },
  Multitap: { screen: Multitap },
  Draggable: { screen: Draggable },
  ScaleAndRotate: { screen: ScaleAndRotate, title: 'Scale, rotate & tilt' },
  ScaleAndRotateSimultaneously: {
    screen: doubleScalePinchAndRotate,
    title: 'Scale, rotate & tilt & more',
  },
//   PagerAndDrawer: { screen: PagerAndDrawer, title: 'Android pager & drawer' },
  HorizontalDrawer: {
    screen: HorizontalDrawer,
    title: 'Gesture handler based DrawerLayout',
  },
  SwipeableTable: {
    screen: SwipeableTable,
    title: 'Gesture handler based SwipeableRow',
  },
  PanAndScroll: {
    screen: PanAndScroll,
    title: 'Horizontal pan or tap in ScrollView',
  },
  Fling: {
    screen: Fling,
    title: 'Flinghandler',
  },
  PanResponder: { screen: PanResponder },
  Bouncing: { screen: Bouncing, title: 'Twist & bounce back animation' },
  // ChatHeads: {
  //   screen: ChatHeads,
  //   title: 'Chat Heads (no native animated support yet)',
  // },
//   Combo: { screen: ComboWithGHScroll },
  BottomSheet: {
    title: 'BottomSheet gestures interactions',
    screen: BottomSheet,
  },
//   ComboWithRNScroll: {
//     screen: ComboWithRNScroll,
//     title: "Combo with RN's ScrollView",
//   },
  doubleDraggable: {
    screen: doubleDraggable,
    title: 'Two handlers simultaneously',
  },
  touchables: {
    screen: TouchablesIndex,
    title: 'Touchables',
  },
  forceTouch: {
    screen: forceTouch,
    title: 'Force touch',
  },
};

const ReactNativeGestureHandlerRoutes = createStackNavigator(
  {
    Main: { screen: MainScreen },
    ...SCREENS,
    TouchableExample: {
      screen: TouchableExample,
      title: 'Touchables',
    },
  },
  {
    initialRouteName: 'Main',
  }
);

export default ReactNativeGestureHandlerRoutes
