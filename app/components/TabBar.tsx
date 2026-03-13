import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import modules from 'modules'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { fontGSans, HanumanRegular, SFProTextHeavy } from '@customs/customFont'
import _styles from '@styles'
import BlurAndView from 'components/BlurAndView'
import SafeArea from './SafeArea'

interface Props extends BottomTabBarProps {
  tab_data: any
}

function TabBar({ state, descriptors, navigation, tab_data }: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <BlurAndView intensity={200} tint={"light"} style={StyleSheet.absoluteFill} />
      <View style={styles.innerContainer}>
        {state.routes?.map((route, index) => {
          const isFocused = state.index === index
          const { options } = descriptors[route.key]

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const color = isFocused ? modules.LINK : modules.TEXT_NOTE
          const { ComponentFill, ComponentOutline, label } = tab_data?.[route.name] || {}

          return (
            <TouchableOpacity
              style={styles.btn}
              accessibilityRole="button"
              testID={options.tabBarButtonTestID}
              key={route?.key}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              accessibilityState={{ selected: isFocused ? true : undefined }}
              onPress={onPress}
            >
              <View style={_styles.center}>
                {
                  isFocused ?
                    <ComponentFill fill={color} height={28} width={28} />
                    :
                    <ComponentOutline fill={color} height={28} width={28} />
                }
                <Text style={[styles.text, { color }]}>{label || ''}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <SafeArea edges={'safeBottom'} />
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: modules.FONT_S,
    paddingTop: modules.BODY_HORIZONTAL_12 / 3,
    ...fontGSans
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  innerContainer: {
    ..._styles.rows,
    borderTopWidth: 1,
    paddingTop: modules.BODY_HORIZONTAL_12 / 2,
    borderTopColor: modules.SUPER_LIGHT_DARK_BORDER,
    // borderTopColor: 'rgba(244,244,244,.8)',
  },
  btn: {
    flex: 1,
    marginTop: 1,
  },
  notiNum: {
    ...SFProTextHeavy,
    color: modules.WHITE,
    fontSize: modules.SMALL,
  },
  notiDotCon: {
    top: -6,
    right: 0,
    height: 20,
    zIndex: 999,
    aspectRatio: 1,
    ..._styles.center,
    borderRadius: 999,
    position: "absolute",
    backgroundColor: modules.BADGE,
    padding: modules.BODY_HORIZONTAL_12 / 4,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
})