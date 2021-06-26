import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import MainStackScreen from './MainStackScreen'
import Comments from '../screens/Comments'

const AuthStackScreen = () => {

    const AuthStack = createStackNavigator()

    return (
        <AuthStack.Navigator headerMode="none" >
            <AuthStack.Screen name="SignIn" component={SignIn} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="Main" component={MainStackScreen} />
            <AuthStack.Screen name="Comments" component={Comments} />
        </AuthStack.Navigator>
    )
}

export default AuthStackScreen