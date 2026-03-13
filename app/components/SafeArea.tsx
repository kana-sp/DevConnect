import React, { useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Edge, NativeSafeAreaViewProps, useSafeAreaInsets } from 'react-native-safe-area-context'

type edge = 'safeBottom' | 'safeTop' | 'safe' | Edge[] | undefined

interface Props extends Omit<NativeSafeAreaViewProps, 'edges'> {
  edges?: edge
}

function returnType(type?: edge): Edge[] {
  if (type === 'safeBottom') return ['bottom', 'left', 'right']
  if (type === 'safeTop') return ['top', 'left', 'right']
  if (type === 'safe') return ['bottom', 'top', 'left', 'right']
  if (Array.isArray(type)) return type
  return ['left', 'right']
}

function SafeArea(props: Props) {
  const { children, edges, style, mode } = props
  const [Height, setHight] = useState<number | null>(null)
  const insets = useSafeAreaInsets()
  return (
    <View
      onLayout={(e) => setHight(e.nativeEvent.layout.height)}
      {...props}
      style={[Height ? { height: Height } : {}, styles(style, mode, insets, edges)]}>
      {children}
    </View>
  )
}

export default SafeArea

function styles(style: StyleProp<ViewStyle>, mode: string | undefined, insets: any, edges: edge) {
  const insetTop = returnType(edges).includes('top') ? insets.top : 0
  const insetRight = returnType(edges).includes('right') ? insets.right : 0
  const insetBottom = returnType(edges).includes('bottom') ? insets.bottom : 0
  const insetLeft = returnType(edges).includes('left') ? insets.left : 0
  const flatStyle = StyleSheet.flatten(style)
  if (mode === 'margin') {
    const {
      margin = 0,
      marginVertical = margin,
      marginHorizontal = margin,
      marginTop = marginVertical,
      marginRight = marginHorizontal,
      marginBottom = marginVertical,
      marginLeft = marginHorizontal,
    } = flatStyle || ({} as any)
    const marginStyle = {
      marginTop: Number(marginTop) + insetTop,
      marginRight: Number(marginRight) + insetRight,
      marginBottom: Number(marginBottom) + insetBottom,
      marginLeft: Number(marginLeft) + insetLeft,
    }
    return [style, marginStyle]
  } else {
    const {
      padding = 0,
      paddingVertical = padding,
      paddingHorizontal = padding,
      paddingTop = paddingVertical,
      paddingRight = paddingHorizontal,
      paddingBottom = paddingVertical,
      paddingLeft = paddingHorizontal,
    } = flatStyle || ({} as any)
    const paddingStyle = {
      paddingTop: Number(paddingTop) + insetTop,
      paddingRight: Number(paddingRight) + insetRight,
      paddingBottom: Number(paddingBottom) + insetBottom,
      paddingLeft: Number(paddingLeft) + insetLeft,
    }
    return [style, paddingStyle]
  }
}
