import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from './LoginScreen'

type Props = {}

const HomeContainer = (props: Props) => {
    return (
        <View>
            <LoginScreen />
        </View>
    )
}

export default HomeContainer

const styles = StyleSheet.create({})