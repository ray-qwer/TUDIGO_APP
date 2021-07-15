import React,{ useState,useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image,Dimensions } from 'react-native';
import globalStyle from '../styles/globalStyle'
import SettingModal from './settingModal'
import AppContext from '../utils/ReducerContext'
import { hidden } from 'ansi-colors';

// TODO: add animation of navigation
// https://reactnavigation.org/docs/stack-navigator/

function HomePage({navigation}){

    const [showModal,setShowModal] = useState(false)
    const userSettings = useContext(AppContext)

    return(
        <View style={globalStyle.containerBackground}>
        <View style={globalStyle.container}>
            <SettingModal isVisible={showModal} onBackdropPress={() => {setShowModal(false)}} 
                onBackButtonPress={()=>{setShowModal(false)}}
            />
            <View style={style.header}>
                {/* header part */}
                <View style={style.money}>
                    {/* show money */}
                    <Text style={style.moneyText}>{userSettings.money}</Text>
                </View>
                <View style={style.iconDaily}>
                    {/* go to daily challenge */}
                    <TouchableOpacity onPress={()=>navigation.navigate('Daily')}>
                        <Image style={{height:'90%',width:'100%'}}source={require('../image/daily.png')}
                        resizeMode='cover'
                        />
                        <Text style={style.textSub}>Daily</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.body}>
                {/* home main page */}
                <View style={style.showLevel}>
                    {/* show level */}
                    <Text>show Text</Text>
                </View>
                <View style={style.showPet}>
                    {/* show pet */}
                    <Text>show Pet</Text>
                </View>
                <View style={style.lastTime}>
                    {/* show last time */}
                    <Text>last time</Text>
                </View>
            </View>
            <View style={style.root}>
                {/* root */}
                <View style={style.spinEgg}>
                    {/* to spin egg */}
                    <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate('SpinEgg')}>
                        <View style={{flex:2}}>
                            <Image style={{height:'100%',width:'100%'}}source={require('../image/spinEgg.png')}
                            resizeMode='center'
                            />
                        </View>
                        <Text style={{...style.textSub,flex:1}}>轉蛋</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.illustrateBook}>
                    {/* to book */}
                    <TouchableOpacity onPress={()=>navigation.navigate('Book')}>
                        <Text>Book</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.openBox}>
                    {/* open box */}
                    <TouchableOpacity style={{flex:1}} onPress={()=>{}}>
                        <View style={{flex:1, alignItems:'center',bottom:Dimensions.get('window').height*(0.8/9)}} >
                            <Image style={{height:'130%',width:'130%'}}source={require('../image/open.png')}
                            resizeMode='center'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={style.fightDragon}>
                    {/* fight with dragon */}
                    <TouchableOpacity onPress={()=>navigation.navigate('FightDragon')}>
                        <Text>fight dragon</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.setting}>
                    {/* setting */}
                    <TouchableOpacity style={{flex:1}} onPress={()=>{setShowModal(true)}}>
                        <View style={{flex:2}}>
                            <Image style={{height:'100%',width:'100%'}}source={require('../image/setting.png')}
                            resizeMode='center'
                            />
                        </View>
                        <Text style={{...style.textSub,flex:1}}>設定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    body:{
        flex:6.5,
        justifyContent: 'center',
        alignItems:'center',
    },
    root:{
        flex:1.5,
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor:'#CEBBAA',
        borderRadius:0,
        overflow:'visible'
    },
    money:{
        marginLeft:10,
        padding:10,
        width:"50%",
    },
    moneyText:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:"#918070"
    },
    iconDaily:{
        marginRight:10,
        padding:10,
        width:"20%"
    },
    showLevel:{
        borderColor:'#FFF',
        borderWidth:1,
        flex:1,
        width:"70%",
    },
    showPet:{
        borderColor:'#FFF',
        borderWidth:1,
        flex:2,
        width:"70%",
    },
    lastTime:{
        borderColor:'#FFF',
        borderWidth:1,
        flex:1,
        width:"70%"
    },
    spinEgg:{
        flex:1,
        padding:10,
    },
    illustrateBook:{
        flex:1,
        padding:10,
    },
    openBox:{
        flex:1.8,
        padding:10,
    },
    fightDragon:{
        flex:1,
        padding:10,
    },
    setting:{
        flex:1,
        padding:10,
    },
    textSub:{
        textAlign:'center',
        fontSize:16,
        fontStyle:'normal'
    }
});

export default HomePage;