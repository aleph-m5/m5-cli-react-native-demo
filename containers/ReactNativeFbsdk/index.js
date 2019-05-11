import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { LoginButton, AccessToken, LoginManager, ShareDialog } from 'react-native-fbsdk';
import MainTemplate from '../../templates/MainTemplate';
import BaseContainer from '../BaseContainer';
import { createStackNavigator } from 'react-navigation';
import { COLORS, METRICS } from "../../config";
import { HELPERS } from "../../utils";

const navigationList = [
    {
        "title": "Login Default",
        "navigation": "ReactNativeFbsdkLoginDefault"
    },
    {
        "title": "Login Custom",
        "navigation": "ReactNativeFbsdkLoginCustom"
    },
    {
        "title": "Share Dialog",
        "navigation": "ReactNativeFbsdkShareDialog"
    },
    {
        "title": "Share Foto",
        "navigation": "undefined"
    },
    {
        "title": "Share Video",
        "navigation": "undefined"
    }
];

class ReactNativeFbsdkLanding extends BaseContainer {

    constructor(props) {
        super(props);
        this.state = {
            lists: navigationList,
        };
    }

    renderList(lists) {
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
            lists.map( (data, i )=> {
                return (<View key={i}>
                    <TouchableOpacity
                        onPress={() => {
                            this.navNavigate(data.navigation);
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

    render() {
        const { lists } = this.state;
        return (
            <MainTemplate>
                {this.renderHeader({
                    title: "React Native Fbsdk"
                })}
                {this.renderList(lists)}
            </MainTemplate>
        );
    }
}


class ReactNativeFbsdkLoginDefault extends BaseContainer {
    render() {
        return (
            <MainTemplate>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                console.log(result);
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        console.log(data.accessToken.toString())
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")} />
            </MainTemplate>
        );
    }
}

class ReactNativeFbsdkLoginCustom extends BaseContainer {

    state = {
        res: null
    }

    handleLoginFb = () => {
        LoginManager.logInWithReadPermissions(["public_profile", "email"])
            .then((result) => {
                if (!result.isCancelled) {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            this.setState({
                                res: JSON.stringify(data, null, 2)
                            })
                        }
                    );
                } else {
                    console.log(result);
                }
            }, (error) => {
                console.log(error)
            })
    }

    render() {
        const { res } = this.state;
        return (
            <MainTemplate>
                <Button
                    onPress={this.handleLoginFb}
                    title="Login Facebook"
                    color={COLORS.main}
                    accessibilityLabel="Click to login FB"
                />
                {res && (<View><Text>{res}</Text></View>)}
            </MainTemplate>
        );
    }
}

// Build up a shareable link.
const shareLinkContent = {
    contentType: 'link',
    contentUrl: "https://facebook.com",
    contentDescription: 'Just Test, forget it!',
  }

class ReactNativeFbsdkShareDialog extends BaseContainer {
    state = {
        shareLinkContent : shareLinkContent,
        res : null
    }
    handleShareDialog = () => {
        // Share the link using the share dialog.
        var tmp = this;
        ShareDialog.canShow(this.state.shareLinkContent).then(
            function (canShow) {
                if (canShow) {
                    return ShareDialog.show(tmp.state.shareLinkContent);
                }
            }
        ).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Share cancelled');
                } else {
                    console.log('Share success' + result);
                    tmp.setState({
                        res : JSON.stringify(result, null, 2)
                    })
                }
            },
            function (error) {
                console.log('Share fail with error: ' + error);
            }
        );
    }

    render() {
        const { res } = this.state;
        return (
            <MainTemplate>
                <Button
                    onPress={this.handleShareDialog}
                    title="Share Facebook"
                    color={COLORS.main}
                    accessibilityLabel="Click to share FB"
                />
                {res && (<View><Text>{res}</Text></View>)}
            </MainTemplate>
        );
    }
}

const ReactNativeFbsdkRoutes = createStackNavigator(
    {
        ReactNativeFbsdkLanding: ReactNativeFbsdkLanding,
        ReactNativeFbsdkLoginDefault: ReactNativeFbsdkLoginDefault,
        ReactNativeFbsdkLoginCustom: ReactNativeFbsdkLoginCustom,
        ReactNativeFbsdkShareDialog: ReactNativeFbsdkShareDialog,
    },
    {
        headerMode: "none",
        initialRouteName: 'ReactNativeFbsdkLanding',
    }
);

export default ReactNativeFbsdkRoutes
