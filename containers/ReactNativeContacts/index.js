import React, { Component } from 'react';
import { View, TouchableOpacity, Text, PermissionsAndroid } from 'react-native';
import { COLORS, METRICS } from "../../config";
import { HELPERS } from "../../utils";
import Contacts from "../../utils/Contacts";
import { CONST } from "../../config";
import BaseContainer from '../BaseContainer';
import MainTemplate from '../../templates/MainTemplate';

export default class Landing extends BaseContainer {
    state = {
        contacts: null
    }

    initContact() {
        Contacts.getAll((err, contacts) => {
            if (err === 'denied') {
                // error
            } else {
                this.setState({
                    contacts : contacts
                })
            }
        })
    }

    componentDidMount() {
        this.initContact();
    }

    renderContact(contacts) {
        if( !contacts ){
            return null
        }

        const styles = {
            padding: METRICS.gutter.base,
            color: COLORS.softBlack,
            borderBottomWidth: 1,
            borderColor: COLORS.gray
        }

        return (
            contacts.map( (data, i) => {
                const phone = HELPERS.getDataByKeyValue(data.phoneNumbers, "label", "mobile");
                return (<View key={i}>
                    <View style={{ ...styles }}>
                        <Text>{data.familyName} {data.middleName} {data.givenName}</Text>
                        <Text style={{
                            marginTop : 4,
                            color : COLORS.gray
                        }}>{phone && phone.number}</Text>
                        { data && data.jobTitle ? (<Text style={{
                            color : COLORS.gray,
                            fontSize : 12
                        }}>{data.jobTitle}</Text>) : null}
                    </View>
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
            <Text style={{ ...subHeading }}>Contact Sample</Text>
        </View>)
    }
    render() {
        const { contacts } = this.state;
        return (
            <MainTemplate>
                {this.renderHeader()}
                {this.renderContact(contacts)}
            </MainTemplate>
        );
    }
}
