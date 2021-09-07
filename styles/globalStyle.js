import {StyleSheet,Dimensions } from 'react-native'

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
        width:"45%",
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:50,  
    },
    moneyText:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:"#918070"
    },
    Modal:{
        width:Dimensions.get('screen').width*0.9,
        height:Dimensions.get('screen').height*0.6,
        backgroundColor:'white',
        justifyContent:'center',
        backgroundColor: '#D1C0B0',
        borderColor:'#D1C0B0',
        borderWidth:5,
        borderStyle: 'solid',
        borderRadius:16,
        padding:10,
    }
});

export default globalStyle;