import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import MainStackScreen from './MainStackScreen'

const AuthStackScreen = () => {

    const AuthStack = createStackNavigator()

    return (
        <AuthStack.Navigator headerMode="none" >
            <AuthStack.Screen name="SignIn" component={SignIn} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="Main" component={MainStackScreen} />
        </AuthStack.Navigator>
    )
}

export default AuthStackScreen