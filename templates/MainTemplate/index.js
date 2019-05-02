import * as React from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { METRICS, COLORS } from "../../config";

interface IProps {
    navigation?: any;
    header?: any;
    children: React.ReactNode;
    footer?: React.ReactNode;
    padding? : boolean;
}

export default class MainTemplate extends React.Component{
    render (){
        const { padding, children, navbar, noScroll } = this.props;
        const paddingStyle = padding ? { padding : METRICS.gutter.base } : {}
        return (
            <SafeAreaView style={{flex : 1}}>
                <StatusBar 
                    animated={true}
                    barStyle={navbar && navbar.barStyle ? navbar.barStyle : "default"}
                    hidden={navbar && navbar.hidden ? navbar.hidden : false}
                    backgroundColor={navbar && navbar.backgroundColor ? navbar.backgroundColor : COLORS.main}
                    translucent={navbar && navbar.translucent ? navbar.translucent : false}
                    networkActivityIndicatorVisible={false}
                    showHideTransition={"fade"} />
                { noScroll ? ( children ) : (
                    <ScrollView>
                        <View style={{
                            ...paddingStyle
                        }}>
                            {children}
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        )
    }
}
