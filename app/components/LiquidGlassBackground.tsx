import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import _styles from '@styles'
import BlurAndView from './BlurAndView'
import { BlurTint } from 'expo-blur'

type Props = {
    intensity?: number | undefined
    tint?: BlurTint | undefined
    backgroundColor?: string
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>
    borderRadius?: number
}

const LiquidGlassBackground = ({ children, borderRadius, style, intensity, backgroundColor, tint }: Props) => {
    return (
        <View style={[styles.new_box, style]}>
            <View style={[
                styles.layer,
                { borderRadius: borderRadius || 50 },
                styles.layer_middle,
                {
                    backgroundColor: backgroundColor || undefined
                }
            ]} >
                <BlurAndView
                    tint={tint ? tint : "light"}
                    intensity={intensity ? intensity : 10}
                    style={[StyleSheet.absoluteFillObject]}
                />
                {
                    children || <></>
                }
            </View>
            <View style={[
                styles.layer,
                { borderRadius: borderRadius || 50 },
                styles.layer_bottom
            ]} />
            <View style={[
                styles.layer,
                { borderRadius: borderRadius || 50 },
                styles.layer_top
            ]} />
        </View>
    )
}

export default LiquidGlassBackground

const styles = StyleSheet.create({
    new_box: {
        width: '100%',
        height: '100%',
        // ..._styles.center,

    },
    layer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    layer_middle: {
        // backgroundColor: 'rgba(255, 255, 255, 0.15)',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    layer_bottom: {
        backgroundColor: 'transparent',
        borderColor: Platform.OS === 'android' ? undefined : 'transparent',
        borderWidth: 0,
        borderRightWidth: 1,
        borderRightColor: 'rgba(255, 255, 255, 0.6)',
        transform: [{ rotate: '45deg' }],
        zIndex: 2,
        borderRadius: 50
    },
    layer_top: {
        backgroundColor: 'transparent',
        borderColor: Platform.OS === 'android' ? undefined : 'transparent',
        borderWidth: 0,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255, 255, 255, 0.7)',
        transform: [{ rotate: '45deg' }],
        zIndex: 3,
        borderRadius: 50
    },
})