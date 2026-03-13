/* eslint-disable import/no-anonymous-default-export */
import { fontGSans } from '@customs/customFont'
import * as React from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native'
import { getVersion } from 'react-native-device-info'
import _styles from '@styles'
import modules from 'modules'
import { formatFormDate, toMidDate } from 'services/format.service'
import { useAuth } from 'stores/auth.store'
import images from 'modules/images'

const appVersion = getVersion()

interface Props {
  isWhite?: boolean
  hide_logos?: boolean
  hide_version?: boolean
  onVersionLongPress?: () => void
}

export default function ({ hide_version, isWhite, onVersionLongPress }: Props) {

  const config = useAuth(s => s.config)

  return (
    <View style={styles.copyright}>
      {/* <View style={_styles.rows}>
        <Image style={styles.icon} source={images.LOGO} />
        <Image style={styles.icon} source={images.LOGO_GDI} />
      </View> */}
      <Text
        style={[
          styles.copyrightText,
          isWhite ? { color: modules.WHITE_AL } : {},
          { marginTop: modules.BODY_HORIZONTAL_12 / 2 }
        ]}
      >
        {'Copyright © 2026 Government of Cambodia.\r\nAll rights reserved'}
      </Text>
      {
        hide_version ? null :
          <Pressable delayLongPress={1000} onLongPress={onVersionLongPress}>
            <Text style={[styles.copyrightText, isWhite ? { color: modules.WHITE_AL } : {},]}>
              Version: {appVersion}
            </Text>
          </Pressable>
      }
      {
        config?.last_updated ?
          <Text style={[
            styles.copyrightText,
            isWhite ? { color: modules.WHITE_AL } : {},
          ]}>
            {`Last update on: ${toMidDate(formatFormDate(config?.last_updated))}`}
          </Text> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 100,
    margin: modules.SPACE5 / 2
  },
  copyrightText: {
    ...fontGSans,
    textAlign: 'center',
    color: modules.TEXT,
    fontSize: modules.FONT_P,
    marginHorizontal: modules.BODY_HORIZONTAL
  },
  contact: {
    fontSize: modules.FONT,
    color: modules.TEXT,
  },
  copyright: {
    paddingVertical: modules.BODY_HORIZONTAL_12 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
