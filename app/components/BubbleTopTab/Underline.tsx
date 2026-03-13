import { StyleSheet, View } from 'react-native'
import React from 'react'
import modules from 'modules'
import Animated, { interpolate, SharedValue, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

export interface TabLayout {
  key: string
  init: boolean
  x?: number
  y?: number
  width?: number
  height?: number
}

type Props = {
  selectedTab: SharedValue<TabLayout>
}

const Underline = React.memo(({ selectedTab }: Props) => {

  const x = useSharedValue(selectedTab.value?.x || 0)
  const y = useSharedValue(selectedTab.value?.y || 100)
  const width = useSharedValue(0)
  const height = useSharedValue(0)
  const active = useSharedValue(0)

  useAnimatedReaction(() => selectedTab?.value, result => {
    x.value = withSpring(result?.x || 0)
    y.value = withSpring(result?.y || 0)
    width.value = withSpring(result?.width || 0)
    height.value = withSpring(result?.height || 0)
    active.value = withTiming(result?.init ? 1 : 0, { duration: 500 })
  }, [selectedTab])

  const tabAnimation = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      opacity: interpolate(active.value, [0, 1], [0, 1]),
      transform: [{ translateX: x.value }, { translateY: y.value }],
    }
  })

  return (
    <Animated.View
      pointerEvents={'none'}
      style={[styles.container, tabAnimation]}
    >
      <View pointerEvents={'none'} style={styles.underLine} />
    </Animated.View>
  )
})

export default Underline

const styles = StyleSheet.create({
  container: {
    // backgroundColor: modules.WHITE,
    ...StyleSheet.absoluteFillObject,
    borderRadius: modules.RADIUS_BUTTON,
  },
  underLine: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    position: 'absolute',
    backgroundColor: modules.PRIMARY,
  },
})
