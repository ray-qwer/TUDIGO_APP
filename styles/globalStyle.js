import {StyleSheet} from 'react-native'

const globalStyle = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        borderRadius:16,
        backgroundColor: '#EFE8CC',
        overflow:"hidden"

    },
    containerBackground:{
        backgroundColor:'#D1C0B0',
        flex:1,
    },    HomeIcon:{
        color:"#B1A090",
        left:30,
        bottom:30,
        position:"absolute"
    },
    money:{
        marginLeft:10,
        padding:10,
        width:"50%",
        justifyContent:'center',        
    },
    moneyText:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:"#918070"
    },
});

export default globalStyle;