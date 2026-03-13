/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import { fontGSans, FontGSansBold } from '@customs/customFont'
import _styles from '@styles'
import modules from 'modules'
import React, { forwardRef, useImperativeHandle, } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import _ from 'lodash'
import DateTimePicker from "@react-native-community/datetimepicker";
import { useGlobal } from 'hooks/global.hooks'
import SlideModal, { SlideModalRef } from './SlideModal'



export type DateModalRef = {
  open: (params: {
    initDate?: any,
    mode?: 'date' | 'time',
    title?: string,
    minimumDate?: Date,
    maximumDate?: Date,
    onSelectedDate?: (date: Date) => void
  }) => void
  close: () => void
}


interface Props {
}

const DateModal = forwardRef((props: Props, forwardedRef) => {

  const { responsive_list_styles } = useGlobal()
  const [params, setParams] = React.useState<any>(null)

  const modalRef = React.useRef<SlideModalRef | null>(null)
  const selectedDate = React.useRef<Date>(params?.initDate || new Date())

  useImperativeHandle(forwardedRef, () => {
    return {
      open: (params: any) => {
        'worklet'

        modalRef.current?.open()
        selectedDate.current = params?.initDate || new Date()
        runOnJS(setParams)(params)
      },
      close: () => {
        'worklet'
        modalRef.current?.close()
        runOnJS(setParams)(null)
      },
    }
  })

  const _onSelected = (date: any) => {
    if (params?.minimumDate && date < params?.minimumDate) {
      date = params?.minimumDate
    }
    params?.onSelectedDate && params.onSelectedDate(date)

    modalRef.current?.close()
  }


  if (Platform.OS === 'android') {
    if (!params) return null
    return (
      <DateTimePicker
        locale='en'
        display={"spinner"}
        mode={params?.mode || "date"}
        value={selectedDate.current}
        minimumDate={params?.minimumDate}
        maximumDate={params?.maximumDate}
        onTouchCancel={() => { setParams(null) }}
        onChange={(e, d) => {
          if (e.type === 'set') {
            setParams(null)
            params.onSelectedDate(d)
          } else {
            setParams(null)
          }
        }}
      />
    )
  }

  return (
    <SlideModal
      ref={modalRef}
      style={styles.modal}
      onBackdropPress={() => null}
      containerStyle={[styles.containModal, responsive_list_styles]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => modalRef?.current?.close()}>
          <Text style={styles.headerText} >{'Cancel'}</Text>
        </TouchableOpacity>
        <View style={[_styles.flx1, _styles.center]}>
          <Text style={styles.title}>{params?.title || ''}</Text>
        </View>
        <TouchableOpacity onPress={() => _onSelected(selectedDate.current)}>
          <Text style={[styles.headerText, { color: modules.LINK }]}>{'Confirm'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <DateTimePicker
          locale='en'
          display={"spinner"}
          style={_styles.full}
          mode={params?.mode || "date"}
          value={selectedDate.current}
          minimumDate={params?.minimumDate}
          maximumDate={params?.maximumDate}
          onChange={(_, d: any) => selectedDate.current = d}
        />
      </View>
    </SlideModal>
  )
})

const styles = StyleSheet.create({
  containModal: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    height: 300,
    overflow: 'hidden',
    borderTopLeftRadius: modules.CARD_RADIUS,
    borderTopRightRadius: modules.CARD_RADIUS,
    backgroundColor: modules.BACKGROUND_PRIMARY,
  },
  header: {
    ..._styles.rows,
    backgroundColor: modules.WHITE,
    padding: modules.BODY_HORIZONTAL,
  },
  headerText: {
    ...fontGSans,
    color: modules.TEXT,
    fontSize: modules.FONT_H6,
  },
  title: {
    ...FontGSansBold,
    textAlign: 'center',
    color: modules.TEXT,
    fontSize: modules.FONT_H5,
  },
  icon: {
    color: modules.TEXT,
    fontSize: modules.FONT_H4,
  },
  box: {
    flex: 1,
    ..._styles.center,
  },
})

export default DateModal
