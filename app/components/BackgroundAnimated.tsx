import Reanimated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { ImageSourcePropType, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import modules from 'modules'

interface Props {
  image: ImageSourcePropType
  blurRadius?: number
  scrollYValue?: SharedValue<number>
  scale?: number
}

const BackgroundAnimated = React.memo((props: Props) => {

  const { image, blurRadius = 5, scrollYValue, scale } = props || {}

  const backgroundAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale || interpolate(scrollYValue?.value || 0, [-(modules.BACKGROUND_HEIGHT * 2), 0, modules.BACKGROUND_HEIGHT], [1.3, 1.1, 1.1], Extrapolation.CLAMP) },
      ],
    }
  })
  return (
    <Reanimated.View style={[StyleSheet.absoluteFill, backgroundAnimation]}>
      <Image blurRadius={blurRadius} style={styles.bgImage} source={image} />
    </Reanimated.View>
  )
})

export default BackgroundAnimated

const styles = StyleSheet.create({
  bgImage: {
    top: -12,
    left: -12,
    width: '100%',
    height: '100%',
  },
  filter: {
    ...StyleSheet.absoluteFillObject,
  },
})
