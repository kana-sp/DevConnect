import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import modules from 'modules'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { HanumanRegular } from '@customs/customFont'
import _styles from '@styles'
import BlurAndView from 'components/BlurAndView'
import SafeArea from './SafeArea'

export const SIDE_BAR_WIDTH = 68
interface Props extends BottomTabBarProps {
  tab_data: any
}


function TabletTabBar({ state, descriptors, navigation, tab_data }: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <SafeArea edges={'safeTop'} />
      <View style={styles.bar}>
        <View style={styles.innerContainer}>
          <BlurAndView intensity={200} tint={"light"} style={StyleSheet.absoluteFill} />
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

            // Skip rendering if components don't exist
            if (!ComponentFill || !ComponentOutline) {
              return null
            }

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
      </View>
    </View>
  )
}

export default TabletTabBar

const styles = StyleSheet.create({
  text: {
    ...HanumanRegular,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: modules.FONT_S,
    paddingTop: modules.BODY_HORIZONTAL_12 / 3,
  },
  container: {
    top: 0,
    left: 0,
    bottom: 0,
    borderWidth: 0,
    position: 'absolute',
    justifyContent: 'center',
  },
  bar: {
    ..._styles.shadowDark,
    borderRadius: modules.RADIUS_BUTTON,
    marginLeft: modules.BODY_HORIZONTAL_12,
  },
  innerContainer: {
    borderWidth: 0,
    ..._styles.center,
    overflow: 'hidden',
    alignSelf: 'center',
    flexDirection: 'column',
    borderRadius: modules.RADIUS_BUTTON,
    paddingVertical: modules.BODY_HORIZONTAL,
    paddingHorizontal: modules.BODY_HORIZONTAL_12 / 2,
  },
  btn: {
    width: SIDE_BAR_WIDTH,
    marginVertical: modules.BODY_HORIZONTAL / 2,
  },
})