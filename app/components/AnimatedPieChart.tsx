import _ from "lodash"
import modules from "modules"
import React from "react"
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"
import { isTablet } from "react-native-device-info"
import { VictoryPie } from "victory-native"

type Props = {
    data: { color: string, y: number }[]
    innerRadius: number
    size: number
}
export function AnimatedPieChart({ data, innerRadius, size }: Props) {
    const callBackData = React.useCallback(() => { return data.every(d => !_.isFinite(d.y) || d.y === 0) ? data.map(a => ({ ...a, y: 1 })) : data }, [data])
    const pieSize = isTablet() ? size / 3 : size / 2
    const pieRadius = isTablet() ? pieSize / 4 : innerRadius

    return (
        <VictoryPie
            animate={true}
            style={{ labels: { display: 'none' } }}
            width={pieSize}
            height={pieSize}
            radius={pieSize / 2}
            innerRadius={pieRadius}
            colorScale={data.map(a => a.color)}
            data={callBackData()}
        />
    )
}

interface LProps {
    data: { color: string, name: string }[],
    containerStyle?: StyleProp<ViewStyle>,
    dotStyle?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>,
}

export function AnimatedPieChartLabel({ data, containerStyle, dotStyle, labelStyle }: LProps) {
    return (
        <View style={[styles.chartDescription, containerStyle]}>
            {
                data?.map((doc) => {
                    return (
                        <View key={doc?.name} style={styles.chartNoteContainer}>
                            <View style={[styles.dot, dotStyle, { backgroundColor: doc?.color }]} />
                            <Text style={[styles.chartNoteLabel, labelStyle]}>{doc?.name}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: modules.RADIUS_BUTTON,
    },
    chartNoteLabel: {
        color: modules.TEXT,
        marginLeft: modules.BODY_HORIZONTAL_12 / 2,
        marginRight: modules.BODY_HORIZONTAL_12,
        fontSize: modules.FONT
    },
    chartNoteContainer: {
        marginTop: modules.BODY_HORIZONTAL,
        flexDirection: "row",
        alignItems: "center",
    },
    chartDescription: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-around",
        flexWrap: "wrap",
        paddingHorizontal: modules.BODY_HORIZONTAL_12,
        // marginVertical: modules.BODY_HORIZONTAL_12,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderTopColor: modules.BORDER_COLOR,
        // borderBottomColor: modules.BORDER_COLOR
    },
});
