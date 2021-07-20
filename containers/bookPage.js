import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyle from '../styles/globalStyle'
import imageReq from '../utils/images'

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

function BookPage({ navigation }){
    const [data,setData] = useState(eg_data)
    const totalPet = 12;
    const eg_data = Array(totalPet).fill().map((_,i)=>({id:i+1,source:require('../image/lockedPetIcon.png')}));

    useEffect(()=>{
        const getData = async() =>{
            try{
                let tmp = await AsyncStorage.getItem( 'petOwn' );
                if (tmp !== null) {
                    tmp = JSON.parse(tmp)
                    let tmpData = eg_data;
                    for( let i = 0; i<tmp.length;i+=1){
                        if (tmp[i].id === 0) continue;
                        // console.log(tmp[i])
                        tmpData[tmp[i].id -1].source = imageReq[tmp[i].source];
                    }
                    setData(tmpData)
                }
                else{
                    setData(eg_data)
                }                

            } catch(e) {
                console.log(e)
            }
        }
        getData()
    },[])
    

    const Item = ({item}) =>(
        <View style={style.Item}>
            <Image style={{flex:1}} source={item.source} resizeMode='center'/> 
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
                <Text style={style.headerText}>illustrate</Text>
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
        borderWidth:1,
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