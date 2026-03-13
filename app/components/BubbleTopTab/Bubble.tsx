import { StyleSheet } from 'react-native'
import React from 'react'
import Animated, { SharedValue, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import modules from 'modules'

export interface TabLayout {
  key: string
  init: boolean
  x?: number
  y?: number
  width?: number
  height?: number
}

type Props = {
  color?: string
  selectedTab: SharedValue<TabLayout>
}

const spring_option = {
  mass: 0.8,
  damping: 20,
  stiffness: 300,
  overshootClamping: false,
  restSpeedThreshold: 0.01,
  restDisplacementThreshold: 0.01,
}

const Bubble = React.memo(({ selectedTab, color }: Props) => {

  const x = useSharedValue(selectedTab.value?.x || 0)
  const y = useSharedValue(selectedTab.value?.y || 50)
  const width = useSharedValue(0)
  const height = useSharedValue(0)

  useAnimatedReaction(() => selectedTab?.value, result => {
    x.value = withSpring((result?.x || 0), spring_option)
    y.value = withSpring((result?.y || 0), spring_option)
    width.value = withSpring(result?.width || 0, spring_option)
    height.value = withSpring(result?.height || 0, spring_option)
  }, [selectedTab?.value?.key])

  const tabAnimation = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      backgroundColor: color,
      transform: [{ translateX: x.value }, { translateY: y.value }],
    }
  })

  return (
    <Animated.View
      pointerEvents={'none'}
      style={[styles.container, tabAnimation]}
    />
  )
})

export default Bubble

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: modules.BODY_HORIZONTAL_24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
})
