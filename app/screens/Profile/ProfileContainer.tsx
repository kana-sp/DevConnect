import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileScreen from './ProfileScreen'

type Props = {}

const ProfileContainer = (props: Props) => {
    return (
        <View>
            <ProfileScreen />
        </View>
    )
}

export default ProfileContainer

const styles = StyleSheet.create({})