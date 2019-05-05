import * as React from 'react';
import { COLORS, METRICS } from "../../config";
import { HELPERS } from "../../utils";
import { View, Text } from 'react-native';

export default class BaseContainer extends React.Component {
    state = {
        name: "BaseContainer"
    }

    navGoBack(goBackParams){
        console.log("goBack FROM BASE CONTAINER")
        const { navigation } = this.props;
        goBackParams ? navigation.goBack(goBackParams) : navigation.goBack()
    }

    navNavigate(navigateParams) {
        console.log("navigateTo FROM BASE CONTAINER")
        const { navigation } = this.props;
        navigation.navigate(navigateParams);
    }

    renderHeader(data) {
        const { title } = data;
        console.log("renderHeader FROM BASE CONTAINER");
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
            <Text style={{ ...subHeading }}>{title}</Text>
        </View>)
    }

}
