import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import MainTemplate from '../../templates/MainTemplate';
import BaseContainer from '../BaseContainer';
import { COLORS, METRICS } from "../../config";
import { HELPERS } from "../../utils";

export default class ReactNativeDeviceInfo extends BaseContainer {

    constructor(props) {
        super(props);
        this.state = {
            deviceinfo: {},
        };
    }

    async componentWillMount() {
        let deviceJSON = {};
        const ios = Platform.OS === 'ios';

        try {

            deviceJSON.uniqueID = DeviceInfo.getUniqueID();
            deviceJSON.manufacturer = DeviceInfo.getManufacturer();
            deviceJSON.brand = DeviceInfo.getBrand();
            deviceJSON.model = DeviceInfo.getModel();
            deviceJSON.deviceId = DeviceInfo.getDeviceId();
            deviceJSON.systemName = DeviceInfo.getSystemName();
            deviceJSON.systemVersion = DeviceInfo.getSystemVersion();
            deviceJSON.buildId = DeviceInfo.getBuildId();
            deviceJSON.bundleId = DeviceInfo.getBundleId();
            deviceJSON.buildNumber = DeviceInfo.getBuildNumber();
            deviceJSON.version = DeviceInfo.getVersion();
            deviceJSON.readableVersion = DeviceInfo.getReadableVersion();
            deviceJSON.deviceName = DeviceInfo.getDeviceName(); // needs android.permission.BLUETOOTH ?
            deviceJSON.userAgent = DeviceInfo.getUserAgent();
            deviceJSON.deviceLocale = DeviceInfo.getDeviceLocale();
            deviceJSON.preferredLocales = DeviceInfo.getPreferredLocales();
            deviceJSON.deviceCountry = DeviceInfo.getDeviceCountry();
            deviceJSON.timezone = DeviceInfo.getTimezone();
            deviceJSON.instanceID = ios ? '' : DeviceInfo.getInstanceID();
            deviceJSON.installReferrer = ios ? '' : DeviceInfo.getInstallReferrer();
            deviceJSON.isEmulator = DeviceInfo.isEmulator();
            deviceJSON.isTablet = DeviceInfo.isTablet();
            deviceJSON.fontScale = DeviceInfo.getFontScale();
            deviceJSON.hasNotch = DeviceInfo.hasNotch();
            deviceJSON.firstInstallTime = ios ? -1 : DeviceInfo.getFirstInstallTime();
            deviceJSON.lastUpdateTime = ios ? -1 : DeviceInfo.getLastUpdateTime();
            deviceJSON.serialNumber = ios ? -1 : DeviceInfo.getSerialNumber();
            deviceJSON.IPAddress = await DeviceInfo.getIPAddress();
            deviceJSON.MACAddress = await DeviceInfo.getMACAddress(); // needs android.permission.ACCESS_WIFI_STATE ?
            deviceJSON.phoneNumber = ios ? '' : DeviceInfo.getPhoneNumber(); // needs android.permission.READ_PHONE_STATE ?
            deviceJSON.APILevel = ios ? -1 : DeviceInfo.getAPILevel();
            deviceJSON.carrier = DeviceInfo.getCarrier();
            deviceJSON.totalMemory = DeviceInfo.getTotalMemory();
            deviceJSON.maxMemory = ios ? -1 : DeviceInfo.getMaxMemory();
            deviceJSON.totalDiskCapacity = DeviceInfo.getTotalDiskCapacity(); // FIXME needs a patch for integer overflow on Android
            deviceJSON.freeDiskStorage = DeviceInfo.getFreeDiskStorage(); // FIXME needs a patch for integer overflow on Android
            deviceJSON.batteryLevel = await DeviceInfo.getBatteryLevel();
            deviceJSON.isLandscape = DeviceInfo.isLandscape();
            deviceJSON.isAirplaneMode = ios ? false : await DeviceInfo.isAirPlaneMode();
            deviceJSON.isBatteryCharging = ios ? false : await DeviceInfo.isBatteryCharging();
            deviceJSON.deviceType = DeviceInfo.getDeviceType();
            deviceJSON.isPinOrFingerprintSet = 'unknown';
            deviceJSON.supportedABIs = DeviceInfo.supportedABIs();
            deviceJSON.hasSystemFeature = ios ? false : await DeviceInfo.hasSystemFeature('amazon.hardware.fire_tv');
            deviceJSON.getSystemAvailableFeatures = ios ? [] : await DeviceInfo.getSystemAvailableFeatures();
            deviceJSON.powerState = ios ? await DeviceInfo.getPowerState() : '';
        } catch (e) {
            console.log('Trouble getting device info ', e);
        }

        DeviceInfo.isPinOrFingerprintSet()(this.keyguardCallback);

        console.log('loaded info');
        this.setState({ deviceinfo: deviceJSON });
        this.forceUpdate();
        console.log(this.state.deviceinfo);
    }

    keyguardCallback = (pinSet) => {
        console.log('callback called with value: ' + pinSet);
        let deviceJSON = this.state.deviceinfo;
        deviceJSON.isPinOrFingerprintSet = pinSet;
        this.setState({ deviceinfo: deviceJSON });
        this.forceUpdate();
    };

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
            <Text style={{ ...subHeading }}>Device Info</Text>
        </View>)
    }
    renderDeviceInfo(deviceinfo) {
        if( !deviceinfo ){
            return null
        }

        const styles = {
            padding: METRICS.gutter.base,
            color: COLORS.softBlack,
            borderBottomWidth: 1,
            borderColor: COLORS.gray
        }

        return Object.keys(deviceinfo).map(k => {
            const val = HELPERS.forceValue(deviceinfo[k]);
            return (<View key={k}>
                <View style={{ ...styles }}>
                    <Text>{k}</Text>
                    <Text style={{
                        marginTop : 4,
                        color : COLORS.gray
                    }}>{val}</Text>
                </View>
            </View>)
        })
    }

    render() {
        const { deviceinfo } = this.state;
        return (
            <MainTemplate>
                {this.renderHeader()}
                {this.renderDeviceInfo(deviceinfo)}
            </MainTemplate>
        );
    }
}
