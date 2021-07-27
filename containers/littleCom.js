import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CoinIcon = (props) =>(
    <View style={[style.CoinIcon,props.position!==undefined && {position:props.position}]}>
        <Text style={{fontSize:32,color:'#D1C0B0'}}>$</Text>
    </View>
)

const TriangleLeft = (props) =>(
    <View style={[style.triangleLeft,{borderRightColor:props.color}]}>
    
    </View>
)

const TriangleRight = (props) =>(
    <View style={[style.triangleRight,{borderLeftColor:props.color}]}>
    
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
    },
    triangleLeft:{
        width:0,
        height:0,
        borderStyle:'solid',
        borderTopWidth:32,
        borderBottomWidth:32,
        borderRightWidth:32,
        borderLeftWidth:0,
        borderTopColor:'transparent',
        borderBottomColor:'transparent',
        borderRightColor:'black',
        borderLeftColor:'transparent',
    },
    triangleRight:{
        width:0,
        height:0,
        borderStyle:'solid',
        borderTopWidth:32,
        borderBottomWidth:32,
        borderRightWidth:0,
        borderLeftWidth:32,
        borderTopColor:'transparent',
        borderBottomColor:'transparent',
        borderRightColor:'transparent',
        borderLeftColor:'black',
    },
})
export {CoinIcon,TriangleLeft,TriangleRight};