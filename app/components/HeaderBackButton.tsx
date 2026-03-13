import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import _styles from '@styles'
import modules from 'modules'
import ViewPressableScale from './PressableScale'
import { Ionicons } from '@expo/vector-icons'
import SafeArea from './SafeArea'
import { FontGSansBold } from '@customs/customFont'

type Props = {
    is_modal?: boolean
    title?: string
    goBack?: () => void
}

const HeaderBackButton = (props: Props) => {
    return (
        <View style={[styles.container, !!props?.is_modal && { paddingTop: modules.BODY_HORIZONTAL }]}>
            {!!props.is_modal ? null : <SafeArea edges={'safeTop'} />}
            <View style={[_styles.rows, styles.row]}>
                <ViewPressableScale style={styles.back} onPress={props.goBack}>
                    <View style={styles.button}>
                        <Ionicons style={styles.icon} name={'chevron-back'} />
                    </View>
                </ViewPressableScale>
                {
                    !!props?.title &&
                    <View style={[StyleSheet.absoluteFill, _styles.center]}>
                        <View style={styles.box}>
                            <View style={styles.inner}>
                                <Text style={styles.title}>{props.title}</Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

export default HeaderBackButton

const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },
    row: {
        paddingTop: modules.BODY_HORIZONTAL / 2,
    },
    title: {
        ...FontGSansBold,
        textAlign: 'center',
        color: modules.TEXT,
        fontSize: modules.FONT_H5,
        paddingHorizontal: modules.BODY_HORIZONTAL,
    },
    back: {
        height: 50,
        padding: 2,
        aspectRatio: 1,
        borderRadius: 100,
        ..._styles.shadowDark,
        backgroundColor: modules.WHITE,
        marginHorizontal: modules.BODY_HORIZONTAL,
    },
    button: {
        flex: 1,
        ..._styles.center,
        borderRadius: 100,
        backgroundColor: modules.BOX_BG,
    },
    box: {
        height: 50,
        padding: 2,
        maxWidth: '60%',
        borderRadius: 100,
        alignSelf: 'center',
        ..._styles.shadowDark,
        backgroundColor: modules.WHITE,
    },
    inner: {
        flex: 1,
        ..._styles.center,
        borderRadius: 100,
        backgroundColor: modules.BOX_BG,
        paddingHorizontal: modules.BODY_HORIZONTAL,
    },
    icon: {
        color: modules.TEXT,
        fontSize: modules.FONT_H2,
    },
})