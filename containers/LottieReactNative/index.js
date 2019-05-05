import React, { Component } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import BaseContainer from '../BaseContainer';
import { COLORS, METRICS } from "../../config";
import MainTemplate from '../../templates/MainTemplate';
import { HELPERS } from "../../utils";
import { createStackNavigator } from 'react-navigation';
import LottieView from 'lottie-react-native';

const jsonAnim = {
    a0 : require('./animation/a0.json'),
    a1 : require('./animation/a1.json'),
    a2 : require('./animation/a2.json'),
    a3 : require('./animation/a3.json'),
    a4 : require('./animation/a4.json'),
    a5 : require('./animation/a5.json'),
    a6 : require('./animation/a6.json'),
    a7 : require('./animation/a7.json'),
    a8 : require('./animation/a8.json'),
    a9 : require('./animation/a9.json'),
    a10 : require('./animation/a10.json'),
    a11 : require('./animation/a11.json'),
    a12 : require('./animation/a12.json'),
    a13 : require('./animation/a13.json'),
    a14 : require('./animation/a14.json'),
    a15 : require('./animation/a15.json'),
    a16 : require('./animation/a16.json'),
    a17 : require('./animation/a17.json'),
    a18 : require('./animation/a18.json'),
    a19 : require('./animation/a19.json'),
    a20 : require('./animation/a20.json'),
    a21 : require('./animation/a21.json'),
    a22 : require('./animation/a22.json'),
    a23 : require('./animation/a23.json'),
    a24 : require('./animation/a24.json'),
    a25 : require('./animation/a25.json'),
    a26 : require('./animation/a26.json'),
    a27 : require('./animation/a27.json'),
    a28 : require('./animation/a28.json'),
    a29 : require('./animation/a29.json'),
    a30 : require('./animation/a30.json'),
    a31 : require('./animation/a31.json'),
    a32 : require('./animation/a32.json'),
    a33 : require('./animation/a33.json'),
    a34 : require('./animation/a34.json'),
    a35 : require('./animation/a35.json'),
    a36 : require('./animation/a36.json'),
    a37 : require('./animation/a37.json'),
    a38 : require('./animation/a38.json'),
    a39 : require('./animation/a39.json'),
    a40 : require('./animation/a40.json'),
    a41 : require('./animation/a41.json')
}

class LottieExample extends BaseContainer {

    renderHeader(file) {
        const wrapper = {
            margin: METRICS.gutter.large,
            zIndex : 12,
        }
        const heading = {
            color: COLORS.softBlack,
            fontSize: 30,
            textAlign: "center"
        }
        const subHeading = {
            ...heading,
            fontSize: 18,
        }
        return (<View style={{ ...wrapper }}>
            <TouchableOpacity
                onPress={() => {
                    this.navGoBack();
                }}
                activeOpacity={0.5} ref={c => (this._root = c)}>
                <Text style={{ ...subHeading }}>Sample {file}</Text>
            </TouchableOpacity>
        </View>)
    }


    renderLottie(file) {
        return (
            <LottieView
                source={jsonAnim[`${file}`]}
                autoPlay
                loop
            />
        );
    }

    render() {
        const file = this.props.navigation.getParam("file", null);
        if (!file) { return null }
        return (
            <MainTemplate noScroll padding>
                <View style={{
                    flex: 1
                }}>
                    {this.renderHeader(file)}
                    {this.renderLottie(file)}
                </View>
            </MainTemplate>
        );
    }

}


class LottieReactNative extends BaseContainer {

    state = {
        lists: HELPERS.createArrayList('a', 40)
    }

    handlePress(data) {
        const { navigation } = this.props;
        navigation.navigate("LottieExample", {
            file: data
        });
    }

    renderLists(lists) {
        if (!lists) {
            return null
        }

        const styles = {
            padding: METRICS.gutter.base,
            color: COLORS.softBlack,
            borderBottomWidth: 1,
            borderColor: COLORS.gray
        }

        return (
            lists.map((data, i) => {
                return (<View key={i}>
                    <TouchableOpacity
                        onPress={() => {
                            this.handlePress(data);
                        }}
                        activeOpacity={0.5} ref={c => (this._root = c)}>
                        <View style={{ ...styles }}>
                            <Text>Sample {data}</Text>
                        </View>
                    </TouchableOpacity>
                </View>)
            })
        )
    }

    renderHeader() {
        const wrapper = {
            margin: METRICS.gutter.large,
        }
        const heading = {
            color: COLORS.softBlack,
            fontSize: 30,
            textAlign: "center"
        }
        const subHeading = {
            ...heading,
            fontSize: 18,
        }
        return (<View style={{ ...wrapper }}>
            <Text style={{ ...subHeading }}>Lottie Sample</Text>
        </View>)
    }
    render() {
        const { lists } = this.state;
        return (
            <MainTemplate padding>
                <View>
                    {this.renderHeader()}
                    {this.renderLists(lists)}
                </View>
            </MainTemplate>
        )
    }
}

const LottieReactNativeRoutes = createStackNavigator(
    {
        LottieReactNative: LottieReactNative,
        LottieExample: LottieExample
    },
    {
        headerMode: 'none',
        initialRouteName: 'LottieReactNative',
    }
);

export default LottieReactNativeRoutes
