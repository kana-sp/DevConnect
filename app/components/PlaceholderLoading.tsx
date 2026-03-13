import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming, } from 'react-native-reanimated'
import modules from 'modules'
import { LinearGradient } from 'expo-linear-gradient'
import _styles from '@styles'

const colors = [
    '#f0f0f0',
    '#e0e0e0',
    '#d0d0d0',
    '#c0c0c0',
    '#d0d0d0',
    '#e0e0e0',
    '#f0f0f0',
] as const


const trans_colors = [
    '#F0F0F000',  // fully transparent (original #f0f0f0)
    '#E0E0E055',  // ~33% opacity
    '#D0D0D0AA',  // ~67% opacity
    '#C0C0C0FF',  // fully opaque (darkest gray)
    '#D0D0D0AA',  // ~67% opacity
    '#E0E0E055',  // ~33% opacity
    '#F0F0F000',  // fully transparent (original #f0f0f0)
] as const

type Props = {

}

const PlaceholderLoading = React.memo((props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <GlowView style={styles.profile} />
                <View style={_styles.flx1}>
                    <GlowView style={styles.stick} />
                    <GlowView style={styles.stick} />
                </View>
            </View>
            <View style={styles.content}>
                <GlowView style={styles.stick} />
            </View>
        </View>
    )
}, () => false)


interface StickProps extends ViewProps {
    style?: ViewStyle | ViewStyle[] | StyleProp<ViewStyle>
    width?: number
    tans?: boolean
    onPress?: () => void
}

export const GlowView = React.memo(({ width: propWidth, tans, ...props }: StickProps) => {
    const measuredWidth = useSharedValue(propWidth ?? 500)
    const progress = useSharedValue(0)
    const _colors = React.useMemo(() => (propWidth === undefined) && !tans ? colors : trans_colors, [propWidth, tans])

    useEffect(() => {
        progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false)
    }, [])

    function handleLayout(e: any) {
        measuredWidth.value = e.nativeEvent.layout.width
    }

    const glowAnimation = useAnimatedStyle(() => {
        'worklet'
        const w = measuredWidth.value
        return {
            transform: [
                { translateX: interpolate(progress.value, [0, 1], [-w, w], Extrapolation.EXTEND) },
            ],
        }
    })

    return (
        <View
            style={[props.style, { overflow: 'hidden' }]}
            onLayout={handleLayout}
        >
            <View style={styles.bg} pointerEvents='none'>
                <Animated.View style={[styles.glow, glowAnimation]}>
                    <LinearGradient
                        colors={_colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
            </View>
        </View>
    )
})

export default PlaceholderLoading

const styles = StyleSheet.create({
    container: {
        backgroundColor: modules.WHITE,
        borderRadius: modules.CARD_RADIUS,
        marginTop: modules.BODY_HORIZONTAL_12,
        paddingBottom: modules.BODY_HORIZONTAL_12,
        marginHorizontal: modules.BODY_HORIZONTAL_12,
    },
    header: {
        ..._styles.rows,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
    },
    content: {
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
    },
    profile: {
        height: 40,
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: '#e8e8e8',
        marginRight: modules.BODY_HORIZONTAL_12,
    },
    stick: {
        height: 18,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#e8e8e8',
        borderRadius: modules.CARD_RADIUS,
        marginTop: modules.BODY_HORIZONTAL_12,
    },
    bg: {
        overflow: 'hidden',
        paddingHorizontal: modules.BODY_HORIZONTAL,
        ...StyleSheet.absoluteFillObject,
    },
    glow: {
        top: 0,
        bottom: 0,
        width: 200,
        overflow: 'hidden',
        position: 'absolute',
    },
})
