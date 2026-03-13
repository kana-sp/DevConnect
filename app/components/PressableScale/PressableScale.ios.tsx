import React, { useMemo } from 'react';
import type { ViewProps } from 'react-native';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Reanimated, { cancelAnimation, runOnJS, withDelay, useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig } from 'react-native-reanimated';
import { useAnimatedGestureHandler } from './useAnimatedGestureHandler';

export const PRESSABLE_IN_LIST_DELAY = 50; // react-native uses 130ms for this
export interface NativePressableScaleProps extends ViewProps, Partial<Omit<WithSpringConfig, 'mass'>> {
  children: React.ReactNode;
  /**
   * The value to scale to when the Pressable is being pressed.
   * @default 0.95
   */
  activeScale?: number;

  /**
   * The onPress event.
   */
  onPress?: () => void;

  /**
   * Set to `true` if this Pressable is contained in a list. This will automatically delay the scale animation.
   * @default false
   */
  isInList?: boolean;

  /**
   * The weight physics of this button
   * @default 'heavy'
   */
  weight?: 'light' | 'medium' | 'heavy';

  /**
   * Set to `true` to disable pressing
   * @default false
   */
  disabled?: boolean;

  /**
   * Ref to the `TapGestureHandler`
   */
  ref?: React.RefObject<TapGestureHandler>;

  /**
   * The threshold of displacement below which the spring will be considered at rest.
   * @default 0.001
   */
  restDisplacementThreshold?: number;

  /**
   * The threshold of speed below which the spring will be considered at rest.
   * @default 0.001
   */
  restSpeedThreshold?: number;
}

/**
 * A Pressable that scales down when pressed. Uses the native responder system from react-native-gesture-handler instead of the JS Pressability API.
 */
export function PressableScale(props: NativePressableScaleProps): React.ReactElement {
  const {
    activeScale = 0.95,
    isInList,
    damping = 15,
    weight = 'heavy',
    stiffness = 150,
    overshootClamping = true,
    restSpeedThreshold = 0.001,
    restDisplacementThreshold = 0.001,
    disabled = false,
    ref,
    style,
    onPress,
    ...passThroughProps
  } = props;

  let mass: number;
  switch (weight) {
    case 'light':
      mass = 0.15;
      break;
    case 'medium':
      mass = 0.2;
      break;
    case 'heavy':
    default:
      mass = 0.3;
      break;
  }

  const scale = useSharedValue(1);
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
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }), [scale]);

  const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        cancelAnimation(scale);
        scale.value = isInList ? withDelay(PRESSABLE_IN_LIST_DELAY, withSpring(activeScale, springConfig)) : withSpring(activeScale, springConfig);
      },
      onEnd: () => {
        onPress ? runOnJS(onPress)() : null;
      },
      onFinish: () => {
        cancelAnimation(scale);
        scale.value = withSpring(1, springConfig);
      },
    },
    [scale, isInList, activeScale, springConfig, onPress],
  );

  return (
    <TapGestureHandler ref={ref} onGestureEvent={onGestureEvent} enabled={!disabled || !!onPress} shouldCancelWhenOutside={true}>
      <Reanimated.View style={[style, animatedStyle]} {...passThroughProps} />
    </TapGestureHandler>
  );
}