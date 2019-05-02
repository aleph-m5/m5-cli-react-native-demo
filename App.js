import * as React from 'react';
import AppNavigator from './routes';

class App extends React.Component {

    state = {
        root : 1
    }

    render() {
        return (
            <AppNavigator screenProps={{...this.state}}/>
        );
    }
}

export default App;
