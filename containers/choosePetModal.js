import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, AsyncStorage } from 'react-native';
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal';
import { TriangleLeft, TriangleRight } from './littleCom'
import AppContext from '../utils/ReducerContext'

function ChoosePetModal(props){
    // isPet -> is choosing pets, !isPet -> is choosing eggs
    const [isPet, setIsPet] = useState(true)
    const [pets,setPets] = useState([
        require('../image/pets/tree/T1.png'),
        require('../image/pets/tree/T2.png'),
        require('../image/pets/tree/T3.png'),
        require('../image/pets/tree/T4.png'),
    ])
    const [eggs, setEggs] = useState([
        require('../image/spinEgg/egg_fire.png'),
        require('../image/spinEgg/egg_tree.png'),
        require('../image/spinEgg/egg_water.png'),        
    ])
    const [src, setSrc] = useState()
    const [petsId, setPetsId] = useState(0)
    const [eggsId, setEggsId] = useState(0)
    
    const userSettings = useContext(AppContext)

    useEffect(()=>{
        // TODO:
        let petList = userSettings.petList.filter(ele => ele.id !== 0)
        let eggList = userSettings.petList.filter(ele => ele.id === 0)
        setPets(petList)
        setEggs(eggList)
    },[userSettings.petList])
    
    useEffect(()=>{
        // TODO:
        let s = userSettings.selectedPet
        if (s.id === 0){
            // egg
            setIsPet(false)
            // setSrc
            // get index
            let index = eggs.findIndex(ele => ele.attribute === s.attribute)
            setEggsId(index)
            setPetsId(0)
        } else {
            setIsPet(true)
            // setSrc
            // get index
            let index = pets.findIndex(ele => ele.id === s.id)
            setEggsId(index)
            setPetsId(0)
        }
    },[userSettings.selectedPet])

    useEffect(()=>{
        if(isPet){
            setSrc(pets[petsId])
        }else{
            setSrc(eggs[eggsId])
        }
    },[isPet,petsId,eggsId])

    const idIncreasing = () =>{
        if (isPet){
            if(petsId+1 === pets.length ){
                setPetsId(0)
            }
            else setPetsId(petsId+1)
        } else {
            if (eggsId+1 === eggs.length){
                setEggsId(0)
            }
            else setEggsId(eggsId+1)
        }
    }

    const idDecreasing = () =>{
        if (isPet){
            if(petsId === 0 ){
                setPetsId(petsId.length-1)
            }
            else setPetsId(petsId-1)
        } else {
            if (eggsId+1 === 0){
                setEggsId(eggs.length-1)
            }
            else setEggsId(eggsId-1)
        }
    }

    const onSelect = async() =>{
        // asyncStorage setItems
        // used function passed in by homePage (props.setPet)
        // object pet??
        let p = {id:0,attribute:0}
        if(isPet && pets.length !== 0){
            p = {id:pets[petsId].id, attribute:pets[petsId].attribute}
        } else if (eggs.length !== 0){
            p.attribute = eggs[eggsId].attribute
        }
        userSettings.setSelectedPet(p)
        await AsyncStorage.setItem('selectedPet',JSON.stringify(p))
    }

    return(
        <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress} onBackButtonPress={props.onBackButtonPress}>
            <View  style={style.tabNav}>
                <TouchableOpacity  style={{flex:1}} activeOpacity={1} onPress={()=>{if(!isPet)setIsPet(true)}}>
                    <View style={[style.selector, isPet && {height:"90%",borderTopRightRadius:20, backgroundColor:'#EFE8CC'},{borderTopLeftRadius:20}]}>
                        <Text style={style.textSelector}>寵物</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={()=>{if(isPet)setIsPet(false)}}>
                    <View style={[style.selector,!isPet&&{height:"90%",borderTopLeftRadius:20,backgroundColor:'#EFE8CC'},{borderTopRightRadius:20}]}>
                        <Text style={style.textSelector}>轉蛋</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{...globalStyle.Modal,borderTopRightRadius:0,borderTopLeftRadius:0,borderColor:'#514030',borderWidth:5,borderTopWidth:0}}>
                <View style={globalStyle.containerBackground}>
                    <View style={globalStyle.container}>
                        <View style={style.petShowBlock}>
                            <View style={{flexDirection:'column',justifyContent:'center',height:"80%"}}>
                                <TouchableOpacity onPress={()=>{idDecreasing()}} activeOpacity={0.8} >
                                    <TriangleLeft color="#514030"/>
                                </TouchableOpacity>
                            </View>
                            <View style={style.petShow}>
                                <TouchableOpacity style={{flex:1}} activeOpacity={0.9}>
                                    <Image style={{height:'100%',width:'100%'}}source={src}
                                    resizeMode='center' />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>{idIncreasing()}} activeOpacity={0.8} style={{flexDirection:'column',justifyContent:'center',height:"80%"}}>
                                <TriangleRight color="#514030"/>
                            </TouchableOpacity>
                        </View>
                        <View style={style.btnBlock}>
                            <TouchableOpacity activeOpacity={0.6} style={style.btn} onPress={()=>{onSelect()}}>
                                <Text style={style.btnText}>選擇</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    tabNav:{
        height:Dimensions.get('screen').height*0.12,
        width:Dimensions.get('screen').width*0.9,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    selector:{
        borderColor:"#514030",
        backgroundColor:'#D1C0B0',
        height:'60%',
        borderWidth:5,
        justifyContent:'center',
        borderRadius:0,
        paddingTop:10,
    },
    textSelector:{
        textAlign:'center',
        fontSize:30,
        color:'#514030'
    },
    petShowBlock:{
        flex:4,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end',
    },
    btnBlock:{
        flex:1,
        justifyContent:'flex-start',
        padding:10,
        alignItems:'center',
    },
    petShow:{
        height:"80%",
        width:"70%",
    },
    btn:{
        backgroundColor:'#D1C0B0',
        justifyContent:'center',
        padding:5,
        borderWidth:1,
        borderColor:'#514030',
        borderRadius:10
    },
    btnText:{
        textAlign:'center',
        fontSize:28,
        color:'#514030',

    }
})

export default ChoosePetModal;