import React, { Component } from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { COLORS, METRICS, CONST } from '../config';

export default class Button extends Component {

    renderIosButton(styles, children){
        return (
            <TouchableOpacity activeOpacity={0.5} ref={c => (this._root = c)} {...this.props}>
                <View style={{ ...styles }}>
                    {children}
                </View>
            </TouchableOpacity>
        )
    }

    renderAndroidButton(styles, children){
        return(
            <TouchableNativeFeedback ref={c => (this._root = c)} {...this.props}>
                <View style={{ ...styles }}>
                    {children}
                </View>
            </TouchableNativeFeedback>
        )
    }
    render() {
        const { children } = this.props;
        const styles = {
            backgroundColor: COLORS.main,
            padding: METRICS.gutter.base,
            borderRadius: 8
        };
        return (
            <View>
                {CONST.isIos ? (this.renderIosButton(styles, children)) : (this.renderAndroidButton(styles, children)) }
            </View>
        );
    }
}
