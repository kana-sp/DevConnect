import { StatusBar, StyleSheet, Text, View, ViewProps } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, interpolate, Extrapolation, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import _styles from '@styles'
import modules from 'modules'
import { fontGSans, FontGSansBold } from '@customs/customFont'
import HeaderAnimated from 'components/HeaderAnimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from 'modules/images'
import { runOnJS } from 'react-native-reanimated'
import Video from 'react-native-video'
import convertToProxyURL from 'react-native-video-cache';
import { GradientText } from './GradientText'
import { useAuth } from 'stores/auth.store'
import { Image } from 'expo-image'
// import BackgroundAnimated from 'components/BackgroundAnimated'

interface Props extends ViewProps {
  title: string
  titleTop?: string
  description?: string
  background_img_url?: string
  height?: number
  onQrCode?: () => void
  onProfile?: () => void
}

const DEMO_VIDEO_URL = 'https://firebasestorage.googleapis.com/v0/b/egdi-ecosystem.appspot.com/o/video%2FAxKdwo1J5i6mTTtSAGtE_%E1%9E%96%E1%9F%92%E1%9E%9A%E1%9F%87%E1%9E%94%E1%9E%9A%E1%9E%98%E1%9E%9C%E1%9E%B7%E1%9E%9F%E1%9F%92%E1%9E%8E%E1%9E%BB%E1%9E%9B%E1%9F%84%E1%9E%80%20%E1%9E%AC%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%B6%E1%9E%9F%E1%9E%B6%E1%9E%91%E1%9E%A2%E1%9E%84%E1%9F%92%E1%9E%82%E1%9E%9A%E1%9E%9C%E1%9E%8F%E1%9F%92%E1%9E%8F%20%E1%9E%82%E1%9E%BA%E1%9E%87%E1%9E%B6%E1%9E%A2%E1%9E%85%E1%9F%92%E1%9E%86%E1%9E%9A%E1%9E%B7%E1%9E%99%E1%9F%88%E1%9E%9C%E1%9E%8F%E1%9F%92%E1%9E%90%E1%9E%BB%E1%9E%8A%E1%9F%8F%E1%9E%98%E1%9E%A0%E1%9E%9F%E1%9F%92%E1%9E%85%E1%9E%B6%E1%9E%9A%E1%9F%92%E1%9E%99%E1%9E%9A%E1%9E%94%E1%9E%9F%E1%9F%8B%E1%9E%96%E1%9F%92%E1%9E%9A%E1%9F%87%E1%9E%9A%E1%9E%B6%E1%9E%87%E1%9E%B6%E1%9E%8E%E1%9E%B6%E1%9E%85%E1%9E%80%E1%9F%92%E1%9E%9A%E1%9E%80%E1%9E%98%E1%9F%92%E1%9E%96%E1%9E%BB%E1%9E%87%E1%9E%B6%20%E1%9E%93%E1%9E%B7%E1%9E%84%E1%9E%87%E1%9E%B6%E1%9E%9F%E1%9E%98%E1%9F%90%E1%9E%99%E1%9E%80%E1%9E%B6%E1%9E%9B%E1%9E%8A%E1%9F%8F%E1%9E%9A%E1%9E%BB%E1%9E%84%E1%9E%9A%E1%9E%BF%E1%9E%84%E1%9E%94%E1%9F%86%E1%9E%95%E1%9E%BB%E1%9E%8F%E1%9E%93%E1%9F%85%E1%9E%80%E1%9F%92%E1%9E%93%E1%9E%BB%E1%9E%84%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%9C%E1%9E%8F%E1%9F%92%E1%9E%8F%E1%9E%B7%E1%9E%9F%E1%9E%B6%E1%9E%9F%E1%9F%92%E1%9E%8F%E1%9F%92%E1%9E%9A%E1%9E%81%E1%9F%92%E1%9E%98%E1%9F%82%E1%9E%9A%20%20%20%E1%9E%94%E1%9F%92%E1%9E%9A%E1%9E%B6%E1%9E%9F%E1%9E%B6%E1%9E%91%E1%9E%A2%E1%9E%84%E1%9F%92%E1%9E%82%E1%9E%9A%E1%9E%9C%E1%9E%8F%E1%9F%92%E1%9E%8F%20%E1%9E%82%E1%9E%BA%E1%9E%87%E1%9E%B6%E1%9E%9F%E1%9F%86%E1%9E%8E%E1%9E%84%E1%9F%8B%E1%9E%9F%E1%9F%92%E1%9E%90%E1%9E%B6%E1%9E%94%E1%9E%8F%E1%9F%92%E1%9E%99%E1%9E%80%E1%9E%98%E1%9F%92%E1%9E%98%E1%9E%82%E1%9F%92%E1%9E%98%E1%9E%B6%E1%9E%93%E1%9E%96%E1%9E%B8%E1%9E%9A%E1%9E%9B%E1%9E%BE%E1%9E%9B%E1%9F%84%E1%9E%80%20%E1%9E%93%E1%9E%B7%E1%9E%84%E1%9E%87%E1%9E%B6%E1%9E%9F%E1%9F%86%E1%9E%8E%E1%9E%84%E1%9F%8B%E1%9E%9F%E1%9F%92%E1%9E%90%E1%9E%B6%E1%9E%94%E1%9E%8F%E1%9F%92%E1%9E%99%E1%9E%80%E1%9E%98%E1%9F%92%E1%9E%98%E1%9E%94.mp4?alt=media&token=d00e0e13-1321-456c-8c3c-b392800eb356'
const PARALLAX_HEIGHT = 550

const VideoParallaxView = React.memo((props: Props) => {

  const user = useAuth(s => s.user)
  const scrollY = useSharedValue(0)
  const safeTop = useSafeAreaInsets().top
  const _pause = React.useRef<boolean>(false)
  const [isPause, setIsPause] = React.useState(false)
  const [muted, setMuted] = React.useState(true)

  const parallax_height = React.useMemo(() => props?.height || PARALLAX_HEIGHT, [props?.height])
  const profile_url = React.useMemo(() => user?.file?.downloadUrl, [user?.file?.downloadUrl]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet'

      scrollY.value = event.contentOffset.y
      if (event.contentOffset.y >= parallax_height) {
        if (_pause.current === true) return
        else {
          _pause.current = true
          runOnJS(setIsPause)(true)
        }
      } else {
        if (_pause.current === false) return
        else {
          _pause.current = false
          runOnJS(setIsPause)(false)
        }
      }
    },
  })

  const backgroundAnimation = useAnimatedStyle(() => {
    return {
      top: 0,
      left: 0,
      right: 0,
      position: 'absolute',
      height: parallax_height,
      transform: [
        { scale: interpolate(scrollY?.value || 0, [-100, 0, 100], [1.3, 1, 1], Extrapolation.CLAMP) },
        { translateY: interpolate(scrollY?.value || 0, [-100, 0, 100], [28, 0, -scrollY?.value], Extrapolation.CLAMP) },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/* <BackgroundAnimated blurRadius={99} image={images.COLOR} scrollYValue={scrollY} /> */}
      <Animated.View style={backgroundAnimation}>
        {
          !!props?.background_img_url
            ?
            <Image
              cachePolicy={'memory-disk'}
              style={StyleSheet.absoluteFill}
              source={{ uri: props?.background_img_url }}
            />
            :
            <Video
              paused={isPause}
              muted={muted}
              repeat={true}
              resizeMode={'cover'}
              ignoreSilentSwitch={"ignore"}
              style={StyleSheet.absoluteFill}
              source={{ uri: convertToProxyURL(DEMO_VIDEO_URL) }}
            />
        }
        <View style={styles.glassTop}>
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={[
              'rgba(0,0,0,0)',
              'rgba(8,20,52,0.28)',
              'rgba(8,20,52,0.68)',
              'rgba(8,20,52,0.88)',
            ]}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={styles.glassBottom}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[
              'rgba(0,0,0,0)',
              'rgba(15,10,5,0.48)',
              'rgba(15,10,5,0.68)',
              'rgba(15,10,5,0.98)',
              'rgba(0,0,0,1)',
              'rgba(0,0,0,1)',
              'rgba(0,0,0,1)',
            ]}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
      >
        <View style={[styles.placeholder, { height: parallax_height }]}>
          {!!props.titleTop && <GradientText text={`${props.titleTop}`} style={{ textAlign: 'center' }} />}
          {!!props?.title && <Text style={styles.description}>{props.title}</Text>}
          {!!props?.description && <Text style={styles.description}>{props.description}</Text>}
          {
            !user &&
            <View style={styles.row}>
              <View style={styles.rowBox}>
                <Text style={styles.register}>
                  {'Register now'}
                </Text>
              </View>
            </View>
          }
        </View>

        {props.children}
      </Animated.ScrollView>

      <HeaderAnimated
        scrollY={scrollY}
        safeTop={safeTop}
        logo={images.LOGO_DGICM}
        profile_url={profile_url}
        onQrCode={props.onQrCode}
        onProfile={props.onProfile} />
    </View>
  )
})

export default VideoParallaxView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },
  placeholder: {

    justifyContent: 'flex-end',
    paddingBottom: modules.BODY_HORIZONTAL_12,
  },
  description: {
    ...fontGSans,
    textAlign: 'center',
    color: modules.WHITE,
    fontSize: modules.FONT_H7,
    padding: modules.BODY_HORIZONTAL_12,
    lineHeight: modules.FONT_H7 * 1.4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowBox: {
    backgroundColor: '#0387FE',
    marginTop: modules.BODY_HORIZONTAL_12,
    marginBottom: modules.BODY_HORIZONTAL_12,
    borderRadius: modules.RADIUS_BUTTON,
    paddingHorizontal: modules.BODY_HORIZONTAL_12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  register: {
    ...FontGSansBold,
    fontSize: modules.FONT_H5,
    color: '#83FEFF',
    textAlign: 'center',
    padding: modules.BODY_HORIZONTAL_12,
    paddingVertical: modules.BODY_HORIZONTAL,
  },
  glassTop: {
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    width: '100%',
    position: 'absolute',
  },
  glassBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    height: "38%",
    width: '100%',
    position: 'absolute',
  },
})