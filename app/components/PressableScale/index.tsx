import React, { useCallback, useMemo } from 'react';
import { GestureResponderEvent, TouchableWithoutFeedbackProps, TouchableWithoutFeedback } from 'react-native';
import Reanimated, { runOnUI, useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig } from 'react-native-reanimated';
import * as ReactNativeHapticFeedback from 'expo-haptics'

export interface PressableScaleProps extends TouchableWithoutFeedbackProps, Partial<Omit<WithSpringConfig, 'mass'>> {
  children?: React.ReactNode;
  /**
   * The value to scale to when the Pressable is being pressed.
   * @default 0.95
   */
  activeScale?: number;

  /**
   * The weight physics of this button
   * @default 'heavy'
   */
  weight?: 'light' | 'medium' | 'heavy';

  /**
   * The haptic press feedback
   * @default false
   */
  haptic?: boolean;

  /**
   * The threshold of speed below which the spring will be considered at rest.
   * @default 0.001
   */
  restSpeedThreshold?: number;

  /**
   * The threshold of displacement below which the spring will be considered at rest.
   * @default 0.001
   */
  restDisplacementThreshold?: number;
}

const ReanimatedTouchableWithoutFeedback = Reanimated.createAnimatedComponent(TouchableWithoutFeedback);

/**
 * A Pressable that scales down when pressed. Uses the JS Pressability API.
 */
export default function ViewPressableScale(props: PressableScaleProps): React.ReactElement {
  const {
    activeScale = 0.98,
    weight = 'medium',
    damping = 15,
    stiffness = 150,
    overshootClamping = true,
    restSpeedThreshold = 0.001,
    restDisplacementThreshold = 0.001,
    style,
    onPressIn: _onPressIn,
    onPressOut: _onPressOut,
    delayPressIn = 0,
    children,
    haptic,
    ...passThroughProps
  } = props;

  const mass = useMemo(() => {
    switch (weight) {
      case 'light':
        return 0.15;
      case 'medium':
        return 0.2;
      case 'heavy':
      default:
        return 0.3;
    }
  }, [weight]);

  const isPressedIn = useSharedValue(false);

  const setPressedIn = useCallback(
    (pressed: boolean) => {
      runOnUI((nextValue: boolean) => {
        'worklet';
        isPressedIn.value = nextValue;
      })(pressed);
    },
    [isPressedIn],
  );

  const springConfig = useMemo<WithSpringConfig>(
    () => ({
      damping,
      mass,
      stiffness,
      overshootClamping,
      restSpeedThreshold,
      restDisplacementThreshold,
    }),
    [damping, mass, overshootClamping, restDisplacementThreshold, restSpeedThreshold, stiffness],
  );
  const touchableStyle = useAnimatedStyle(() => ({ transform: [{ scale: withSpring(isPressedIn.value ? activeScale : 1, springConfig) }] }), [
    activeScale,
    isPressedIn,
    springConfig,
  ]);

  const onPressIn = useCallback(
    (event: GestureResponderEvent) => {
      setPressedIn(true);
      _onPressIn?.(event);
      if (haptic) {
        ReactNativeHapticFeedback.impactAsync(ReactNativeHapticFeedback.ImpactFeedbackStyle.Light)
      }
    },
    [_onPressIn, haptic, setPressedIn],
  );
  const onPressOut = useCallback(
    (event: GestureResponderEvent) => {
      setPressedIn(false);
      _onPressOut?.(event);
    },
    [_onPressOut, setPressedIn],
  );

  return (
    <ReanimatedTouchableWithoutFeedback
      delayPressIn={delayPressIn}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={touchableStyle}
      {...passThroughProps}>
      <Reanimated.View style={style}>{children}</Reanimated.View>
    </ReanimatedTouchableWithoutFeedback>
  );
}