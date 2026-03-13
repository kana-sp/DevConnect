import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, { AnimatedStyle, Extrapolation, interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


type Props = {
  children: React.ReactNode;
  style?: AnimatedStyle;
  expanded: boolean;
};

export function AnimatedCollapsible({ children, style, expanded }: Props) {

  const progress = useSharedValue(0);
  const view_height = useSharedValue(0)

  const [active, setActive] = useState(false)

  const collapsibleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0.5, 1], Extrapolation.CLAMP),
      height: interpolate(progress.value, [0, 1], [0, view_height.value], Extrapolation.CLAMP),
    };
  });

  useAnimatedReaction(
    () => active,
    v => progress.value = withTiming(v ? 1 : 0, { duration: 250 }),
    [active]
  )

  React.useEffect(() => {
    if (expanded) setActive(true)
    else {
      progress.value = withTiming(0, { duration: 250 }, finish => {
        if (finish) runOnJS(setActive)(false)
      })
    }
  }, [expanded])

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    const measuredHeight = event.nativeEvent.layout.height;
    if (view_height.value !== measuredHeight) {
      view_height.value = measuredHeight
    }
  }, []);

  return (
    <Animated.View
      style={[collapsibleStyle, styles.overflowHidden]}
      pointerEvents={active ? 'auto' : 'none'}
    >
      <Animated.View style={[styles.container, style]} onLayout={onLayout}>
        {active ? children : null}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
