import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Reanimated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import modules, { IMAGES } from 'modules'
import { FontGSansBold, SFProTextHeavy } from '@customs/customFont'
import { environment } from '@environments/environment'
import images from 'modules/images'
import { Ionicons, Feather } from '@expo/vector-icons'
import _styles from '@styles'
import BlurAndView from 'components/BlurAndView'
import FastImageFire from 'components/FastImageFire'
import PressableScale from 'components/PressableScale'
import { useAuth } from 'stores/auth.store'
import { useGlobal } from 'hooks/global.hooks'
import GlobalSvgMEMO from './GlobalSvg'
import xmlSvgs from 'modules/svg/svg.dummy'
import HomeHeader from 'screens/Home/components/HomeHeader'

interface Props {
  safeTop: number
  profile_url?: string
  scrollY: SharedValue<number>
  onMenu?: () => void
}

function MemberAnimated(props: Props) {

  const { safeTop, scrollY } = props
  const badge = useAuth(s => s.totalBadge)
  const { isTablet } = useGlobal()

  const headerBackgroundAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(props.scrollY?.value || 0, [0, modules.BACKGROUND_HEIGHT], [1, 0]),
    }
  })

  const headerAnimation = useAnimatedStyle(() => {
    return {
      paddingTop: safeTop + 12,
      opacity: interpolate(scrollY?.value, [0, modules.BACKGROUND_HEIGHT], [0, 1]),
      transform: [
        { translateY: interpolate(scrollY?.value, [0, modules.BACKGROUND_HEIGHT], [0, -modules.BODY_HORIZONTAL_12], Extrapolation.CLAMP) },
      ],
    } as any
  })

  const headerAnimation2 = useAnimatedStyle(() => {
    return {
      paddingTop: safeTop + 12,
      transform: [
        { translateY: interpolate(scrollY?.value, [0, modules.BACKGROUND_HEIGHT], [0, -modules.BODY_HORIZONTAL_18], Extrapolation.CLAMP) },
      ],
    } as any
  })

  return (
    <View style={styles.absoluteTop}>
      <Reanimated.View style={styles.header}>
        <Reanimated.View
          style={[
            styles.flex1,
            headerBackgroundAnimation,
            { paddingTop: safeTop + 12 }
          ]}
        >
          {
            props.onMenu &&
            <PressableScale
              style={[
                styles.headerButton, {
                  marginLeft: modules.BODY_HORIZONTAL_12,
                  marginRight: 0,
                },]}
              onPress={props.onMenu}
            >
              <Feather style={styles.topIcon} name='menu' />
            </PressableScale>
          }

          <HomeHeader />
          <View style={styles.headerContainer}>
            <Text adjustsFontSizeToFit style={[styles.label, isTablet && { color: modules.TEXT, fontSize: modules.FONT_H5 }]}>{'29th ASEAN Directors-General of\nImmigration Departments and\nHeads of ConsularAffairs Divisions\nof Foreign Affiars Ministers\n(DGICM)'}</Text>
          </View>
        </Reanimated.View>

        <Reanimated.View
          style={[StyleSheet.absoluteFill, headerAnimation]}>
          <BlurAndView blurAmount={10} style={StyleSheet.absoluteFill} blurType={"light"} />
          <Reanimated.View style={styles.labelContainer}>
            <Text style={[styles.label, { color: modules.TEXT }]}>{environment.LABEL_EN}</Text>
          </Reanimated.View>
        </Reanimated.View>
      </Reanimated.View>
    </View>
  )
}

export default MemberAnimated

const styles = StyleSheet.create({
  topIcon: {
    color: modules.WHITE,
    fontSize: modules.FONT_H3,
  },
  headerButton: {
    height: 35,
    aspectRatio: 1 / 1,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: modules.BODY_HORIZONTAL_12,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  notificationWrapper: {
    position: 'relative',

    marginRight: modules.BODY_HORIZONTAL_12,
  },
  profileWrapper: {
    height: 35,
    aspectRatio: 1 / 1,
    marginRight: modules.BODY_HORIZONTAL,
    backgroundColor: modules.IMAGE_BACKGROUND,
    borderRadius: 999,
  },
  headerContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: modules.BODY_HORIZONTAL_ACTION * 2,
  },
  labelContainer: {
    flex: 1,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    justifyContent: 'center',
    paddingBottom: modules.BODY_HORIZONTAL_12,
  },
  label: {
    minHeight: 25,
    ...FontGSansBold,
    color: modules.WHITE,
    fontSize: modules.FONT_H5,
    textAlign: 'center',
  },
  img: {
    height: 50,
    aspectRatio: 1 / 1,
    borderRadius: 100,
  },
  logo: {

  },
  flex1: {
    flex: 1,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  absoluteTop: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  notiNum: {
    ...SFProTextHeavy,
    color: modules.WHITE,
    fontSize: modules.SMALL,
  },
  notiDotCon: {
    top: -8,
    right: -8,
    height: 20,
    zIndex: 999,
    aspectRatio: 1,
    ..._styles.center,
    borderRadius: 999,
    position: "absolute",
    backgroundColor: modules.BADGE,
    padding: modules.BODY_HORIZONTAL_12 / 4,
  },
})
