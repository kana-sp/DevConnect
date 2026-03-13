import { BlurTint, BlurView, BlurViewProps, } from 'expo-blur'
import React, { ReactNode } from 'react'
import { Platform, View, ViewProps } from 'react-native'

interface Props extends ViewProps, BlurViewProps {
  children?: ReactNode
  androidBackground?: string
  intensity?: number
  blurAmount?: number
  tint?: BlurTint | undefined
  blurType?: 'dark' | 'light' | 'xlight' | 'chromeMaterialLight' | 'chromeMaterialDark' | 'light' | 'ultraThinMaterialDark' | 'ultraThinMaterialLight'
}

function BlurAndView(props: Props) {
  const android = Platform.OS === 'android'

  const getAndroidColor = () => {
    const type = props.tint || props.blurType
    switch (type) {
      case 'ultraThinMaterialDark':
        return 'rgba(128, 128, 128,0.95)'
      case 'light':
      case 'xlight':
      case 'ultraThinMaterialLight':
        return 'rgba(255,255,255,0.9)'
      case 'dark':
        return 'rgba(233, 233, 233,0.6)'
      default:
        return 'rgba(0,0,0,0.95)'

    }
  }

  const getBlurType = () => {
    const type = props?.tint || props?.blurType
    switch (type) {
      case 'light':
      case 'chromeMaterialLight':
      case 'ultraThinMaterialLight':
        return 'light'
      case 'dark':
      case 'chromeMaterialDark':
      case 'ultraThinMaterialDark':
        return 'dark'
      default:
        return 'default'
    }
  }


  // if (android) {
  //   return (
  //     <View {...props} style={[props.style, { backgroundColor: props.androidBackground || getAndroidColor() }]}>
  //       {props.children}
  //     </View>
  //   )
  // }
  return (
    <BlurView
      intensity={props?.intensity}
      {...props as any}
      tint={getBlurType()}
    >
      {props.children}
    </BlurView>
  )
}

export default BlurAndView
