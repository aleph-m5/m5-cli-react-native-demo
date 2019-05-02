import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { COLORS, METRICS } from "../../config";
import { HELPERS } from "../../utils";
import { CONST } from "../../config";
import BaseContainer from '../BaseContainer';
import MainTemplate from '../../templates/MainTemplate';

const navigationList = [
  {
    "title": "unSet",
    "navigation": "unSet"
  }
];

export default class Landing extends BaseContainer {
    state = {
        lists: navigationList
    }

    handlePress(type) {
        const { navigation } = this.props;
        navigation.navigate(type);
    }

    renderList(lists) {

        const styles = {
            padding: METRICS.gutter.base,
            color: COLORS.softBlack,
            borderBottomWidth: 1,
            borderColor: COLORS.gray
        }

        return (
            lists.map(data => {
                return (<View key={data.navigation}>
                    <TouchableOpacity
                        onPress={() => {
                            this.handlePress(data.navigation);
                        }}
                        activeOpacity={0.5} ref={c => (this._root = c)}>
                        <View style={{ ...styles }}>
                            <Text>{data.title}</Text>
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
            <Text style={{ ...heading }}>M5</Text>
            <Text style={{ ...subHeading }}>a Demo Sample</Text>
        </View>)
    }
    render() {
        const { lists } = this.state;
        return (
            <MainTemplate>
                {this.renderHeader(lists)}
                {this.renderList(lists)}
            </MainTemplate>
        );
    }
}
