import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import modules from 'modules'
import { fontGSans, FontGSansBold } from '@customs/customFont'
import SafeArea from './SafeArea'
import PressableScale from './PressableScale'
import _styles from '@styles'
import { Ionicons } from '@expo/vector-icons'
import BlurAndView from './BlurAndView'

type Props = {
  title?: string
  subTitle?: string
  rightIcon?: string
  rightText?: string
  backIonicons?: string
  isModal?: boolean
  noBorder?: boolean
  isDark?: boolean;
  headerStyle?: StyleProp<ViewStyle>
  Svg?: any

  goBack?(): void
  onRightPress?: () => void
  renderRightButton?: () => void
}

function ArrowBackHeader(props: Props) {
  const { isModal, subTitle, Svg } = props || {}
  return (
    <View style={[styles.header,
    isModal ? styles.modal : null,
    props.noBorder ? { borderBottomWidth: 0 } : null,
    props.headerStyle
    ]}>
      {(!isModal || Platform.OS === 'android') && <SafeArea edges={'safeTop'} />}
      <View style={_styles.rows}>

        <View style={styles.title}>
          <Text numberOfLines={1} style={[styles.text]}>{props.title || ""}</Text>
          {subTitle && <Text numberOfLines={1} style={[styles.subTitle]}>{subTitle}</Text>}
        </View>

        {/* button back for navigate */}
        {
          props.goBack && !isModal &&
          <PressableScale style={[styles.box]} onPress={props.goBack}>
            <Ionicons style={[styles.icon, props.isDark ? { color: modules.WHITE } : null]} name={isModal ? 'close' : 'chevron-back'} />
          </PressableScale>
        }
        {/* button close for modal */}

        {
          props.goBack && isModal &&
          <View style={[styles.backBox, props.isDark ? { borderWidth: 0.1 } : null]}>
            <BlurAndView intensity={10} tint={props?.isDark ? 'dark' : 'dark'} style={[StyleSheet.absoluteFill, { borderRadius: modules.RADIUS_BUTTON }]} />
            <PressableScale style={[styles.box]} onPress={props.goBack}>
              <Ionicons style={[styles.icon, props.isDark ? { color: modules.WHITE } : null]} name={isModal ? 'close' : 'chevron-back'} />
            </PressableScale>
          </View>
        }

        <View style={styles.flx1} />
        {/* right button */}
        {
          props?.onRightPress &&
          <View style={[styles.backBox, props.isDark || props?.rightText ? { borderWidth: 0.1 } : null]}>
            <PressableScale style={[isModal && !props.rightText ? styles.box : null]} onPress={props.onRightPress}>
              {
                isModal && !props.rightText ? <BlurAndView intensity={10} tint={props?.isDark ? 'dark' : 'dark'} style={[StyleSheet.absoluteFill, { borderRadius: modules.RADIUS_BUTTON }]} /> : null
              }
              {
                props?.rightText ? <Text style={styles.rightText}>{props?.rightText}</Text> :
                  props?.rightIcon ? <Ionicons style={styles.icon} name={props?.rightIcon as any || 'add'} /> :
                    Svg ? <Svg fill={modules.TEXT} width={20} height={20} /> : null
              }
            </PressableScale>
          </View>
        }
        {props.renderRightButton?.() || null}
      </View>
    </View>
  )
}

export default ArrowBackHeader

const styles = StyleSheet.create({
  flx1: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    backgroundColor: modules.WHITE,
    borderBottomColor: modules.BORDER_COLOR,
    paddingBottom: modules.BODY_HORIZONTAL_12 / 4,
  },
  modal: {
    borderBottomWidth: 0,
    paddingTop: modules.BODY_HORIZONTAL / 1.5,
    paddingBottom: modules.BODY_HORIZONTAL_12 / 2,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: modules.BODY_HORIZONTAL_18 * 2.5,
    ...StyleSheet.absoluteFillObject,
  },
  icon: {
    color: modules.TEXT,
    fontSize: modules.FONT_H2,
  },
  box: {
    width: 40,
    aspectRatio: 1,
    ..._styles.center,
    borderRadius: 100,
    // backgroundColor: modules.BACKGROUND_BUTTON,
    // marginTop: 4,
    // marginHorizontal: modules.BODY_HORIZONTAL_12,
  },
  backBox: {
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    borderRadius: 100,
    flexDirection: 'row',
    gap: modules.BODY_HORIZONTAL,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,1)',
  },
  text: {
    ...FontGSansBold,
    color: modules.TEXT,
    fontSize: modules.FONT_H4,
  },
  subTitle: {
    ...fontGSans,
    color: modules.SUB_TEXT,
    fontSize: modules.FONT_H7,
  },
  rightText: {
    ...FontGSansBold,
    color: modules.LINK,
    fontSize: modules.FONT_H6,
    paddingHorizontal: modules.BODY_HORIZONTAL_12 / 3,
    paddingVertical: modules.BODY_HORIZONTAL / 2,
  },
})
