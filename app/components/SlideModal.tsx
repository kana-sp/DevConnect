import { FontGSansBold } from '@customs/customFont'
import _styles from '@styles'
import modules from 'modules'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Pressable, StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native'
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { Portal } from 'react-native-portalize'
import { BlurView } from 'expo-blur'

export const ANIMATION_DURATION = 250

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type SlideModalRef = {
  open: (callback?: () => void) => void
  close: (callback?: () => void) => void
}

interface Props extends ViewProps {
  backDropColor?: string
  notCancelable?: boolean
  blur?: boolean
  style?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  onBackdropPress?: () => void
}

const SlideModal = forwardRef(({ style, blur, children, backDropColor, notCancelable, containerStyle, onBackdropPress }: Props, forwardedRef) => {

  const x = useSharedValue(0)
  const y = useSharedValue(0)
  const progress = useSharedValue(0)

  const active = useSharedValue(false)

  const containerDisplay = useDerivedValue(() => {
    return active.value ? 'flex' : 'none'
  }, [active.value])

  const containerAnimation = useAnimatedStyle(() => {
    return {
      display: containerDisplay.value,
    }
  })

  const backdropAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    }
  })

  const modalAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
      transform: [{ translateY: interpolate(progress.value, [0, 1], [100, 0], Extrapolation.CLAMP) }],
    }
  })

  const backDropPress = () => {
    if (notCancelable) {
      return
    }
    if (onBackdropPress) {
      onBackdropPress()
    } else {
      progress.value = withTiming(0, { duration: ANIMATION_DURATION }, (finish) => {
        if (finish) {
          x.value = 0
          y.value = 0
          active.value = false
        }
      })
    }
  }

  useImperativeHandle(forwardedRef, () => {
    return {
      open: (callBack?: () => void) => {
        active.value = true
        progress.value = withTiming(1, { duration: ANIMATION_DURATION })
        callBack && runOnJS(callBack)()
      },
      close: (callBack?: () => void) => {
        progress.value = withTiming(0, { duration: ANIMATION_DURATION }, (finish) => {
          if (finish) {
            x.value = 0
            y.value = 0
            active.value = false
            callBack && runOnJS(callBack)()
          }
        })
      },
    }
  })

  return (
    <Portal>
      <Animated.View
        pointerEvents="box-none"
        style={[StyleSheet.absoluteFill, containerStyle, containerAnimation]}
      >
        <AnimatedPressable
          style={[StyleSheet.absoluteFill, backdropAnimation, { backgroundColor: backDropColor || modules.PLACE_HOLDER }]}
          onPress={backDropPress}
        >
          {
            !!blur &&
            <BlurView
              tint='dark'
              intensity={25}
              style={StyleSheet.absoluteFill}
            />
          }
        </AnimatedPressable>
        {/* content */}
        <Animated.View
          style={[
            styles.modal,
            style,
            { backgroundColor: (style as any)?.backgroundColor || modules.WHITE },
            { borderRadius: (style as any)?.borderRadius || modules.CARD_RADIUS },
            modalAnimation
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Portal>
  )
},
)

export default SlideModal

const styles = StyleSheet.create({
  modal: {
    zIndex: 999,
    minWidth: 50,
    minHeight: 50,
    maxHeight: '90%',
    ..._styles.shadowSmall,
    borderRadius: modules.CARD_RADIUS,
  },
  title: {
    flex: 1,
    ...FontGSansBold,
    color: modules.TEXT,
    fontSize: modules.FONT_H6,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    paddingVertical: modules.BODY_HORIZONTAL_12 / 2,
  },
  icon: {
    color: modules.TEXT,
    fontSize: modules.FONT_H2,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    paddingVertical: modules.BODY_HORIZONTAL_12 / 2,
  },
})
