import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontGSansSemiBold, fontGSans } from '@customs/customFont'
import modules from 'modules'
import images from 'modules/images'
import FastImageFire from './FastImageFire'
import _styles from '@styles'

type Props = {}

const FooterCopyRight = (props: Props) => {
  return (
    <View style={_styles.center}>
      <View style={styles.logo}>
        <FastImageFire
          size="400"
          isForceResize
          style={styles.logoEvent}
          resizeMode={'contain'}
          source={images.LOGO_DGICM}
        />
      </View>
      <Text style={styles.copyright}>
        © {new Date().getFullYear()} DGICM. All rights reserved.
      </Text>
      <Text style={styles.tagline}>
        General Department of Immigration
      </Text>
    </View>
  )
}

export default FooterCopyRight

const styles = StyleSheet.create({
  logo: {
    width: 100,
    aspectRatio: 1 / 1,
    marginBottom: 16,
  },
  logoEvent: {
    height: '100%',
    width: '100%',
  },
  copyright: {
    ...FontGSansSemiBold,
    fontSize: modules.BODY_HORIZONTAL_12,
    color: modules.WHITE_SUB_LIGHT,
  },
  tagline: {
    ...fontGSans,
    fontSize: modules.BODY_HORIZONTAL_12,
    color: modules.WHITE_SUB_LIGHT,
  },
})