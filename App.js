// schema
// money: number
// period:{
//    day: number
//    hour: number
//    minute: number
// }
// petList:[
//     pet:{
//         id: number,
//         source: string, given by image.js
//         level:  number,
//         attribute:   number(1: water, 2: fire, 3: gress, 0: first egg)
//         identity:{
//             attack:     number,
//             defend:     number,
//             recover:    number,
//         },
//         amount: number, // only for eggs
//     }
// ]    
// id === 0 -> egg
// else pets
// selectedPet :{
//    id: number
//    attribute: number
// }
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions, AsyncStorage } from 'react-native';
import HomeStackNav from './routes/stackRoute'
import AppContext from './utils/ReducerContext'

export default function App() {

  const [money,setMoney] = useState(1000)
  const [period, setPeriod] = useState(null)
  const [loading, setLoading] = useState(true)
  const [petList, setPetList] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [dueTime, setDueTime] = useState(0)
  const userSettings = {
    money:money,
    setMoney:setMoney,
    period:period,
    setPeriod:setPeriod,
    petList:petList,
    setPetList:setPetList,
    selectedPet: selectedPet,
    setSelectedPet: setSelectedPet,
    dueTime: dueTime,
    setDueTime: setDueTime,
  }

  useEffect(()=>{
    const fetchData = async() =>{
      await fetchPeriod()
      await fetchPetList()
      await fetchSelectedPet()
      await fetchDueTime()
      setLoading(false)
    }
    fetchData()
  },[])

  const fetchDueTime = async() =>{
    let d = await AsyncStorage.getItem('dueTime')
    if(d !== null) {
      d = JSON.parse(d)
      setDueTime(d)
    } else {
      setDueTime(0)
    }
  }

  const fetchPeriod = async() =>{
    let p = await AsyncStorage.getItem('period')
      if (p !== null){
        p = JSON.parse(p)
        setPeriod(p)
      } else {
        setPeriod({
          day:0,
          hour:4,
          minute:0,
        })
      }
  }
  const fetchPetList = async() =>{
    let pets = await AsyncStorage.getItem('petList')
    if (pets !== null){
      pets = JSON.parse(pets)
      setPetList(pets)
    }else{
      // TODO:
      let p = [{
            id: 0,
            source:"eq",
            level:0,
            attribute:0,
            identity:{
                attack: 0,
                defend: 0,
                recover: 0,
            },
            amount: 1,
      }]
      await AsyncStorage.setItem('petList',JSON.stringify(p))
      setPetList(p)
    }
  }
  const fetchSelectedPet = async() =>{
    let p = await AsyncStorage.getItem('selectedPet')
    if(p !== null) {
      p = JSON.parse(p)
      setSelectedPet(p)
    } else{
      p = {
        id:0,
        attribute:0
      }
      await AsyncStorage.setItem('selectedPet',JSON.stringify(p))
      setSelectedPet(p)
    }
  }

  return (
    <>
    {loading?(
      <View style={styles.container}>
        <Text>loading</Text>
      </View>
    ):(
      <AppContext.Provider value={userSettings}>
        <View style={styles.container}>
            <HomeStackNav/>
        </View>
      </AppContext.Provider>

    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    flex: 1,
    backgroundColor: '#D1C0B0',
    borderColor:'#D1C0B0',
    borderWidth:10,
    borderStyle: 'solid',
    paddingTop:10
  },
});
