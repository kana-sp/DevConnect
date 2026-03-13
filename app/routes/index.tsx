import { LinkingOptions, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginContainer from 'screens/SignIn/LoginContainer'
import RegisterContainer from 'screens/Register/RegisterContainer'
import MyTabs from './AppTab'

const HomeStack = createNativeStackNavigator()

const AppStack = () => {

    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
            <HomeStack.Screen name="Tabs" component={MyTabs} />
            <HomeStack.Screen name="Login" component={LoginContainer} />
            <HomeStack.Screen name="Register" component={RegisterContainer} />
        </HomeStack.Navigator >
    )
}

const App = () => {
    const linking: LinkingOptions<{}> = { prefixes: [''] }
    return (
        <NavigationContainer linking={linking} >
            <AppStack />
        </NavigationContainer >
    )
}

export default App