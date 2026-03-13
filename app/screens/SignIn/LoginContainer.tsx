import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './LoginScreen'

type Props = {}

const LoginContainer = (props: Props) => {
    return (
        <View>
            <LoginScreen />
        </View>
    )
}

export default LoginContainer

const styles = StyleSheet.create({})