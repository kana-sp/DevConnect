import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import modules from 'modules'
import _styles from '@styles'
import { HanumanBold, SFProTextBold, SFProTextRegular } from '@customs/customFont'
import { AnimatedCollapsible } from 'components/AnimatedCollapsible'
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'
import Ionicons from '@expo/vector-icons/Ionicons'

interface Props {
    data: any[]
    title?: string
    label?: string
    isOtherMeeting?: boolean
    onPressRow?: (item: any) => void
}
const ExcelJoinerTree = React.memo((props: Props) => {

    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.title}>{props?.title || ''}</Text>
                <View style={styles.colContent}>
                    <View style={[styles.col_name]}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.col_title}>{props?.label || ''}</Text>
                    </View>
                    <View style={styles.col1}>
                        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.col_title}>{'សរុប'}</Text>
                    </View>
                </View>
                <Content {...props} />
            </View>
        </View>
    )
})

const Content = React.memo(({ level = 0, ...props }: Props & { level?: number }) => {

    const sumData = useMemo(() => props.data?.filter((a: any) => props?.isOtherMeeting ? a?.total : true), [props?.data, props?.isOtherMeeting])

    return (
        <View>
            {
                sumData?.map((item, index) => {
                    return <RenderSubItem
                        key={item?.key || String(index)}
                        item={item}
                        level={level}
                        props={props}
                    />
                })
            }
        </View>
    )
})

// export default optimizeHeavyScreen(ExcelJoinerTree)
export default ExcelJoinerTree


const RenderSubItem = React.memo(({ item, level = 0, props }: { item: any, level?: number, props: any }) => {
    const [isExpanded, setIsExpanded] = React.useState(false)
    const sub_items = item?.sub?.filter((a: any) => props?.isOtherMeeting ? a?.total : true)
    return (
        <View>
            <View pointerEvents={item?.color ? 'none' : 'auto'} style={[_styles.rows, styles.colContent, { backgroundColor: item?.color }]}>
                <TouchableOpacity
                    disabled={sub_items?.length === 0}
                    style={[styles.expend, { opacity: sub_items?.length > 0 ? 1 : 0 }]}
                    onPress={() => setIsExpanded(prev => (!prev))}
                >
                    <Ionicons style={styles.icon} name={isExpanded ? 'chevron-up' : 'chevron-down'} />
                </TouchableOpacity>
                <TouchableOpacity disabled={!props.onPressRow} onPress={() => props.onPressRow(item)} style={styles.col_name}>
                    <Text style={[styles.col_value, level === 0 && HanumanBold]}>{item?.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!props.onPressRow} onPress={() => props.onPressRow(item)} style={styles.col1}>
                    <Text style={[styles.col_value, level === 0 && SFProTextBold]}>{item?.total || 0}</Text>
                </TouchableOpacity>
            </View>
            <AnimatedCollapsible expanded={isExpanded}>
                <Content {...props} data={sub_items} level={level + 1} />
            </AnimatedCollapsible>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        borderRadius: modules.CARD_RADIUS,
    },
    card: {
        ..._styles.shadowSmall,
        backgroundColor: modules.WHITE,
        borderRadius: modules.CARD_RADIUS,
        marginTop: modules.BODY_HORIZONTAL_12,
        marginHorizontal: modules.BODY_HORIZONTAL_12,
    },
    title: {
        ...HanumanBold,
        fontSize: modules.FONT_H5,
        color: modules.ACTIVE_LABEL,
        paddingVertical: modules.BODY_HORIZONTAL_12,
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
    },
    col1: {
        width: 80,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: modules.BORDER_COLOR,
    },
    col_name: {
        flex: 2,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: modules.BORDER_COLOR,
    },
    col_title: {
        lineHeight: 26,
        ...HanumanBold,
        color: modules.TEXT,
        fontSize: modules.FONT_H7,
        padding: modules.BODY_HORIZONTAL_12 / 2,
    },
    col_value: {
        ...SFProTextRegular,
        color: modules.TEXT,
        fontSize: modules.FONT_H7,
        paddingVertical: modules.BODY_HORIZONTAL_12 / 3,
        paddingHorizontal: modules.BODY_HORIZONTAL_12 / 2,
    },
    colContent: {
        ..._styles.rows,
        borderTopWidth: 1,
        borderTopColor: modules.BORDER_COLOR,
    },
    expend: {
        height: '100%',
        ..._styles.rows,
        paddingHorizontal: modules.BODY_HORIZONTAL_12 / 2,
    },
    icon: {
        color: modules.TEXT,
        fontSize: modules.FONT_H4,
    },

})
