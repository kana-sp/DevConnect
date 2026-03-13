import React from 'react';
import { Modal, View, StyleSheet, Pressable, StatusBar, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ImageViewerProps {
    visible: boolean;
    imageUri: string;
    onClose: () => void;
}

export const FullScreenImageViewer: React.FC<ImageViewerProps> = ({
    visible,
    imageUri,
    onClose,
}) => {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    const resetTransform = () => {
        scale.value = withSpring(1);
        savedScale.value = 1;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
    };

    const handleClose = () => {
        resetTransform();
        onClose();
    };

    // Pinch gesture for zooming
    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            // Limit minimum scale to 1 and maximum to 5
            if (scale.value < 1) {
                scale.value = withSpring(1);
                savedScale.value = 1;
            } else if (scale.value > 5) {
                scale.value = withSpring(5);
                savedScale.value = 5;
            } else {
                savedScale.value = scale.value;
            }
        });

    // Pan gesture for moving the image when zoomed
    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            // Only allow panning if zoomed in
            if (savedScale.value > 1) {
                translateX.value = savedTranslateX.value + e.translationX;
                translateY.value = savedTranslateY.value + e.translationY;
            }
        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;

            // Constrain the image within bounds when zoomed
            const maxTranslateX = (SCREEN_WIDTH * (savedScale.value - 1)) / 2;
            const maxTranslateY = (SCREEN_HEIGHT * (savedScale.value - 1)) / 2;

            if (translateX.value > maxTranslateX) {
                translateX.value = withSpring(maxTranslateX);
                savedTranslateX.value = maxTranslateX;
            } else if (translateX.value < -maxTranslateX) {
                translateX.value = withSpring(-maxTranslateX);
                savedTranslateX.value = -maxTranslateX;
            }

            if (translateY.value > maxTranslateY) {
                translateY.value = withSpring(maxTranslateY);
                savedTranslateY.value = maxTranslateY;
            } else if (translateY.value < -maxTranslateY) {
                translateY.value = withSpring(-maxTranslateY);
                savedTranslateY.value = -maxTranslateY;
            }
        });

    // Double tap to zoom in/out
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            if (savedScale.value > 1) {
                // Zoom out
                scale.value = withSpring(1);
                savedScale.value = 1;
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                savedTranslateX.value = 0;
                savedTranslateY.value = 0;
            } else {
                // Zoom in to 2x
                scale.value = withSpring(2);
                savedScale.value = 2;
            }
        });

    // Combine gestures
    const composedGesture = Gesture.Simultaneous(
        Gesture.Race(doubleTap, panGesture),
        pinchGesture
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
            statusBarTranslucent
        >
            <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.9)" />
            <View style={styles.container}>
                {/* Close button */}
                <Pressable style={styles.closeButton} onPress={handleClose}>
                    <Ionicons name="close" size={32} color="white" />
                </Pressable>

                {/* Image with gestures */}
                <GestureDetector gesture={composedGesture}>
                    <Animated.View style={[styles.imageContainer, animatedStyle]}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.image}
                            contentFit="contain"
                            transition={200}
                            cachePolicy="memory-disk"
                        />
                    </Animated.View>
                </GestureDetector>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
});