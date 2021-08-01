import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyle from '../styles/globalStyle'
import imageReq from '../utils/images'
import AppContext from '../utils/ReducerContext'

// object:{
//     pet:{
//         id: number,
//         source: string,
//         level:  number,
//         attribute:   number(0: water, 1: fire, 2: gress)
//         identity:{
//             attack:     number,
//             defend:     number,
//             recover:    number,
//         },
//         unlock: bool,
//     }
// }
// id === 0 -> egg

function BookPage({ navigation }){
    const [data,setData] = useState(eg_data)
    const totalPet = 12;
    const eg_data = Array(totalPet).fill().map((_,i)=>({id:i+1,source:require('../image/lockedPetIcon.png')}));
    const userSettings = useContext(AppContext)
    useEffect(()=>{
        const getData = async() =>{
            let tmpData = eg_data
            for (let i = 0; i<userSettings.petList.length; i+=1){
                if(userSettings.petList[i].id === 0) continue
                tmpData[userSettings.petList[i].id-1].source = imageReq[userSettings.petList[i].source]
            }
            setData(tmpData)
        }
        getData()
    },[])
    

    const Item = ({item}) =>(
        <View style={style.Item}>
            <Image style={{flex:1,width:"100%",height:"100%"}} source={item.source} resizeMode='center'/> 
        </View>
    );
    const renderItem = ({ item }) =>(
        <Item item={item}/>
    );
    return (
        <View style={globalStyle.containerBackground}>
        <View style={globalStyle.container}>
            <View style={style.header}>
                <TouchableOpacity style={style.backIcon} onPress={()=>{navigation.goBack()}}>
                        <View style={{ alignItems:'center'}} >
                            <Image style={{height:'130%',width:'130%'}}source={require('../image/arrow.png')}
                            resizeMode='center'
                            />
                        </View>
                    </TouchableOpacity>
                <Text style={style.headerText}>圖鑑</Text>
            </View>
            <View style={style.flatListOfBook}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={e=>e.id}
                    numColumns={3}
                    columnWrapperStyle={style.row} 
                />
            </View>
            <View style={style.root}>
                <Ionicons name="home" size={32} style={globalStyle.HomeIcon} onPress={()=>{navigation.navigate('Home')}}/>
            </View>
        </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        padding:10,
        justifyContent:'center',
        flexDirection:'row',
    },
    root:{
        flex:1,
        padding:10,
    },
    flatListOfBook:{
        padding:10,
        flex:7,
    },
    Item:{
        flex:1,
        height:100,
        width:"100%",
        margin:10,
        padding:10,
        borderColor:'#FFF',
        justifyContent:"center",
        alignItems:"center",
    },
    row:{
        flex: 1,
        justifyContent: "space-around"
    },
    backIcon:{
        color:"#B1A090",
        top:15,
        left:30,
        position:"absolute",
        height:32,
        width:60,
    },
    headerText:{
        fontSize:32,
        fontWeight:'100',
        margin:10,
        textAlign:'center'
    }
});

export default BookPage;