import React from 'react'
import { StyleSheet, View } from 'react-native'
import Reanimated, { Extrapolation, SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import modules, { IMAGES } from 'modules'
import _styles from '@styles'
import BlurAndView from 'components/BlurAndView'
import FastImageFire from 'components/FastImageFire'
import PressableScale from 'components/PressableScale'
import { MaterialIcons } from '@expo/vector-icons'
import LiquidGlassBackground from './LiquidGlassBackground'
import { NavigationV5Props, TNavigation } from 'interfaces/route.interface'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from 'stores/auth.store'

interface Props extends NavigationV5Props {
  logo: any
  safeTop: number
  profile_url?: string
  scrollY: SharedValue<number>
  mute?: boolean
  onQrCode?: () => void
  onMute?: () => void
  onProfile?: () => void
}

function HeaderAnimated(props: Props) {

  const navigation = useNavigation<TNavigation>()

  const user = useAuth(s => s.user)

  const { safeTop, scrollY } = props

  const headerBackgroundAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(props.scrollY?.value || 0, [0, modules.BACKGROUND_HEIGHT], [1, 0]),
    }
  })

  const headerAnimation = useAnimatedStyle(() => {
    return {
      paddingTop: safeTop + + modules.BODY_HORIZONTAL / 3,
      opacity: interpolate(scrollY?.value, [0, modules.BACKGROUND_HEIGHT], [0, 1]),
      transform: [
        { translateY: interpolate(scrollY?.value, [0, modules.BACKGROUND_HEIGHT], [0, -modules.BODY_HORIZONTAL_12], Extrapolation.CLAMP) },
      ],
    } as any
  })

  const headerAnimation2 = useAnimatedStyle(() => {
    return {
      paddingTop: safeTop + modules.BODY_HORIZONTAL / 3,
      transform: [
        { translateY: interpolate(scrollY?.value, [0, modules.BACKGROUND_HEIGHT], [0, -modules.BODY_HORIZONTAL_12], Extrapolation.CLAMP) },
      ],
    } as any
  })

  const onProfile = () => {
    navigation.navigate('PROFILE')
  }

  return (
    <View style={styles.absoluteTop}>
      <Reanimated.View style={styles.header}>
        <Reanimated.View
          style={[
            styles.rows,
            styles.flex1,
            headerBackgroundAnimation,
            { paddingTop: safeTop + modules.BODY_HORIZONTAL / 3, }
          ]}>
          <View style={styles.logo}>
            <FastImageFire
              size="400"
              isForceResize
              style={styles.logoEvent}
              resizeMode={'contain'}
              source={props.logo}
            />
          </View>
        </Reanimated.View>

        <Reanimated.View
          style={[StyleSheet.absoluteFill, headerAnimation, _styles.shadowDark]}>
          <BlurAndView blurAmount={10} style={StyleSheet.absoluteFill} blurType={"light"} />
          <View style={styles.logo}>
            <FastImageFire
              size="400"
              isForceResize
              style={styles.logoEvent}
              resizeMode={'contain'}
              source={props.logo}
            />
          </View>
        </Reanimated.View>

        <Reanimated.View style={[styles.rows, headerAnimation2]}>
          <View style={styles.flex1} />
          {
            !!props?.onQrCode &&
            <PressableScale onPress={props.onQrCode} style={styles.headerButton}>
              <LiquidGlassBackground
                tint={'light'}
              >
                <MaterialIcons style={styles.topIcon} name="qr-code-scanner" />
              </LiquidGlassBackground>
            </PressableScale>
          }
          {
            !!props?.onMute &&
            <PressableScale onPress={props.onMute} style={styles.headerButton}>
              <LiquidGlassBackground
                tint={'light'}
              >
                <MaterialIcons style={styles.topIcon} name={props.mute ? "volume-off" : "volume-up"} />
              </LiquidGlassBackground>
            </PressableScale>
          }
          <PressableScale
            disabled={!user}
            style={styles.profileWrapper}
            onPress={() => onProfile()}
          >
            <FastImageFire
              size="400"
              isForceResize
              style={styles.img}
              source={props?.profile_url ? { uri: props.profile_url } : IMAGES.AVATAR_ACCOUNT}
            />
          </PressableScale>
        </Reanimated.View>

      </Reanimated.View>
    </View>
  )
}

export default HeaderAnimated

const styles = StyleSheet.create({
  topIcon: {
    color: modules.WHITE,
    fontSize: modules.BODY_HORIZONTAL_24,
  },
  headerButton: {
    height: 43,
    aspectRatio: 1 / 1,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: modules.BODY_HORIZONTAL_12,
  },
  profileWrapper: {
    height: 43,
    aspectRatio: 1 / 1,
    marginRight: modules.BODY_HORIZONTAL,
    backgroundColor: modules.IMAGE_BACKGROUND,
    borderRadius: 999,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  logo: {
    width: 45,
    aspectRatio: 1 / 1,
    marginHorizontal: modules.BODY_HORIZONTAL_12,
    marginRight: modules.BODY_HORIZONTAL_12 / 2,
    alignItems: 'center',
    flexDirection: 'row',
    gap: modules.BODY_HORIZONTAL_12 / 2,
    marginBottom: modules.BODY_HORIZONTAL_12 / 2,
  },
  logoEvent: {
    height: '100%',
    width: '100%',
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
})
