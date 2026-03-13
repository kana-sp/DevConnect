import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import _styles from '@styles'
import modules from 'modules'
import ViewPressableScale from './PressableScale'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {}

const AbsoluteBackButton = (props: Props) => {

    const safe_top = useSafeAreaInsets().top

    return (
        <ViewPressableScale style={[styles.back, { marginTop: safe_top }]}>
            <Ionicons style={styles.icon} name={'chevron-back'} />
        </ViewPressableScale>
    )
}

export default AbsoluteBackButton

const styles = StyleSheet.create({
    back: {
        top: 0,
        left: 0,
        height: 50,
        aspectRatio: 1,
        borderRadius: 100,
        ..._styles.center,
        overflow: 'hidden',
        position: 'absolute',
        backgroundColor: modules.GLASS_LIGHT,
        marginTop: modules.BODY_HORIZONTAL_12,
        marginHorizontal: modules.BODY_HORIZONTAL_12,
    },
    icon: {
        color: modules.WHITE,
        fontSize: modules.FONT_H2,
    },
})