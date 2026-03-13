import { StyleSheet, Text, } from 'react-native';
import React from 'react';
import modules from 'modules';
import { HanumanRegular } from '@customs/customFont';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import _styles from '@styles';
import { Feather } from '@expo/vector-icons';
import Aniamted, { useSharedValue, withRepeat, withTiming, useAnimatedStyle, interpolate, Extrapolation, FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useOnlineStore } from 'stores/connection.store';

const OfflineStatus = React.memo(function OfflineStatus() {
  const isOnline = useOnlineStore(s => s.isOnline)
  const safeTop = useSafeAreaInsets().top;
  const rippleProgress = useSharedValue(0)

  React.useEffect(() => {
    rippleProgress.value = withRepeat(withTiming(1, { duration: 500 }), -1, true)
  }, [])

  const rippleAnimation = useAnimatedStyle(() => {
    return {
      top: safeTop,
      transform: [
        { translateY: interpolate(rippleProgress.value, [0, 1], [-15, -6], Extrapolation.CLAMP) },
        { scale: interpolate(rippleProgress.value, [0, 1], [1, 0.98], Extrapolation.CLAMP) },
      ],
    }
  })
  if (isOnline) return null;
  return (
    <Aniamted.View
      exiting={FadeOutUp}
      entering={FadeInUp}
      pointerEvents={'none'}
      style={[styles.container, rippleAnimation]}
    >
      <Feather name="wifi-off" style={styles.icon} />
      <Text style={styles.title}>{'ពុំមានការតភ្ជាប់អ៊ីនធឺណិត។ សូមពិនិត្យមើលប្រព័ន្ធអ៊ីនធើណេតរបស់អ្នក'}</Text>
    </Aniamted.View>
  );
})

export default OfflineStatus;

export const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    zIndex: 9999,
    ..._styles.rows,
    position: 'absolute',
    backgroundColor: 'rgba(218, 36, 39, .8)',
    borderRadius: modules.CARD_RADIUS,
    margin: modules.BODY_HORIZONTAL_12,
    paddingVertical: modules.BODY_HORIZONTAL_12,
    paddingHorizontal: modules.BODY_HORIZONTAL_12 / 2,
  },
  title: {
    flex: 1,
    ...HanumanRegular,
    color: modules.WHITE,
    fontSize: modules.FONT_H6,
    marginHorizontal: modules.BODY_HORIZONTAL_12 / 2,
  },
  icon: {
    color: modules.WHITE,
    fontSize: modules.FONT_H2,
    marginHorizontal: modules.BODY_HORIZONTAL_12 / 2,
  },
});
