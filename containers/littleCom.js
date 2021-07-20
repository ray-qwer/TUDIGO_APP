import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CoinIcon = () =>(
    <View style={style.CoinIcon}>
        <Text style={{fontSize:32,color:'#D1C0B0'}}>$</Text>
    </View>
)
const style = StyleSheet.create({
    CoinIcon:{
        width:36,
        height:36,
        borderRadius:18,
        backgroundColor:'#918070',
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:10
    }
})
export {CoinIcon};