import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import globalStyle from '../styles/globalStyle'


function BookPage({ navigation }){
    const data = [
        {
            id:1,
            title:"pet1",
        },
        {
            id:2,
            title:"pet2",
        },
        {
            id:3,
            title:"pet3",
        },
        {
            id:4,
            title:"pet4",
        },
        {
            id:5,
            title:"pet5",
        },
        {
            id:6,
            title:"pet6",
        },
    ];
    const Item = ({item}) =>(
        <View style={style.Item}>
            <Text>{item.title}</Text>
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
                {/* <Ionicons name="caret-back-outline" size={32} style={style.backIcon} onPress={()=>{navigation.goBack()}}/> */}
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