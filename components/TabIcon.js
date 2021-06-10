import React from "react"
import {
    View,
    Image,
} from "react-native"
import { COLORS } from "../constants"

const TabIcon = ({ focused, icon }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 18,
                    height: 18,
                    tintColor: focused ? COLORS.primary : COLORS.gray
                }}
            />
        </View>
    )
}

export default TabIcon;