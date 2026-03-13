import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Easing, StyleProp, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { FontGSansBold } from '@customs/customFont';

/**
 * Apple Intelligence Gradient Text
 *
 * Dependencies:
 *   npm install @react-native-masked-view/masked-view
 *   npm install react-native-linear-gradient
 *   npx pod-install  (iOS)
 */

const GRADIENT_COLORS = [
    '#4FC3F7', // sky blue
    '#7B61FF', // purple
    '#E040FB', // pink/magenta
    '#FF4081', // hot pink
    '#FF5722', // deep orange
];

const GRADIENT_LOCATIONS = [0, 0.25, 0.5, 0.75, 1];

// ── Static gradient text ──────────────────────────────────────────────────────
export function GradientText({ text, style }: { text: string, style?: StyleProp<TextStyle> }) {
    return (
        <MaskedView
            maskElement={
                <Text style={[styles.text, style]}>{text}</Text>
            }
        >
            <LinearGradient
                colors={GRADIENT_COLORS}
                locations={GRADIENT_LOCATIONS}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                {/* Transparent clone keeps the gradient sized to the text */}
                <Text style={[styles.text, style, { opacity: 0 }]}>{text}</Text>
            </LinearGradient>
        </MaskedView>
    );
}

// ── Animated (shimmer) gradient text ─────────────────────────────────────────
export function AnimatedGradientText({ text, style }: { text: string, style?: StyleProp<TextStyle> }) {
    const shimmer = useRef(new Animated.Value(0)).current;

    // Create the interpolated value alongside the animated value
    // This avoids accessing refs during render, which React Compiler doesn't allow
    const translateX = useRef(
        shimmer.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-200, 200, -200],
        })
    ).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmer, {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();
    }, [shimmer]);

    return (
        <MaskedView
            maskElement={
                <Text style={[styles.text, style]}>{text}</Text>
            }
        >
            <Animated.View style={{ transform: [{ translateX }] }}>
                <LinearGradient
                    colors={[...GRADIENT_COLORS, ...GRADIENT_COLORS]}
                    locations={[0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: 800 }} // wide enough to cover during translation
                >
                    <Text style={[styles.text, style, { opacity: 0, width: 800 }]}>{text}</Text>
                </LinearGradient>
            </Animated.View>
        </MaskedView>
    );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    text: {
        ...FontGSansBold,
        fontSize: 42,
        fontWeight: '700',
        letterSpacing: -0.5,
        color: '#fff',                  // required – mask renders the alpha channel
    },
});