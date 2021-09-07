import React, { useState, useReducer, useEffect } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { BleManager, Device } from 'react-native-ble-plx'
import globalStyle from '../styles/globalStyle'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons';

const bleManager = new BleManager()

const DeviceCard = ({device,checkIfOpen,checkIfLocked}) =>{
    const [isConnected, setIsConnected] = useState(false)
    const [isLocked, setIsLocked] = useState(true)
    // HM10 custom service uuid = "0000ffe0-0000-1000-8000-00805f9b34fb"
    //      custom characteristic = 0000ffe1-0000-1000-8000-00805f9b34fb
    const [writeService, setWriteService] = useState(null)
    const [openOnce, setOpenOnce] = useState(false)
    const serviceUUID = "0000ffe0-0000-1000-8000-00805f9b34fb"
    const characteristicUUID = "0000ffe1-0000-1000-8000-00805f9b34fb"
    useEffect(()=>{
        const checkIsConnected = async () =>{
            const c =  await device.isConnected()
            console.log(c)
            setIsConnected(c)
            if (c)  {
                await getWriteService(device)
            }
        }
        checkIsConnected()
    },[device])
    const getWriteService = async(connectedDevice) =>{
                const allServicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();
                const discoveredServices = await allServicesAndCharacteristics.services();
                // find writeService 
            //     console.log(discoveredServices)
            //     let h ;
            //     // for (let i = 0; i < discoveredServices.length; i++){
            //     //     let c = await discoveredServices[i].characteristics()
            //     //     for(let j = 0;j<c.length;j++){
            //     //         if(c[j].isReadable){
            //     //             console.log(c)  
            //     //         }  
            //     //     } 
            //     // }
            //     for (let i = 0; i < discoveredServices.length; i++){
            //         let c = await discoveredServices[i].characteristics()
            //         for(let j = 0;j<c.length;j++){
            //             if(c[j].isWritableWithoutResponse){
            //                 h = c[j]
            //                 console.log(h.serviceUUID,h.uuid,typeof(h.serviceUUID))
            //                 break
            //             }
            //         }
            //     }
            // setWriteService(h)
    }
    const connectToDevice = async() =>{
        if(!isConnected){
            try {
                const connectedDevice = await device.connect()
                setIsConnected(true)
                await getWriteService(connectedDevice)
                
            } catch (error) {
                console.warn(error)
            }
            device.onDisconnected(()=>{
                setIsConnected(false)
            })
        } else {
            device.cancelConnection()
        }
    }
    const openBox = async() =>{
        if(isLocked){
            const byteArray = ("1").split("").map(char => char.charCodeAt(0))
            console.log(Buffer.from(byteArray).toString("base64"))
            await device.writeCharacteristicWithoutResponseForService(
                serviceUUID,
                characteristicUUID,
                Buffer.from(byteArray).toString("base64")
                );
            console.log('over')
            setIsLocked(false)
            checkIfOpen(true)
            const subscription = device.monitorCharacteristicForService(
                serviceUUID,
                characteristicUUID,
                (error,char)=>{
                    if(error) { console.warn(error); return }
                    let {value:res} = char
                    res = Buffer(res,'base64').toString('ascii')
                    if(res == '1'){
                        setIsLocked(true)
                        checkIfLocked(true)
                        setOpenOnce(true)
                    }
                    // console.log(Buffer(value,'base64').toString('ascii'))

                }
            )
            // console.log(value)
            // console.log(Buffer(value,'base64').toString('ascii'))
            // console.log('listen')
            // checkIfLocked(true)
            // checkIfOpen(false)
            
        } 
    }

    return(
        <View style={style.deviceCard}>
        <TouchableOpacity onPress={connectToDevice} >
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text>{`${device.name}`}</Text>
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <Ionicons name='ellipse' size={15} style={isConnected?({color:'#3CB371'}):({color:'#B22222'})}/>
                    <Text>
                        {isConnected?('已連線'):('未連線')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        {isConnected&&
            <TouchableOpacity onPress={openBox} style={{flexDirection:'row',justifyContent:"space-between",marginTop:5}} disabled={openOnce}>
                {!isLocked?(<>
                    <View style={style.btn}>
                    <Text style={style.btnText}>Close Box</Text>
                    </View>
                    <Ionicons name="lock-open" size={20} style={{color:'#3CB371'}}/>            
                </>):(<>
                    <View style={style.btn}>
                        <Text style={style.btnText}>Open Box</Text>                    
                    </View>
                    <Ionicons name="lock-closed" size={20} style={{color:'#FF4500'}}/>                                
                </>)
                }
            </TouchableOpacity>
        }
        </View>
    )
}

const reducer = (state, action) =>{
    switch(action.type){
        case 'ADD_DEVICE':
        const { payload: device } = action;

        // check if the detected device is not already added to the list
        if (device && !state.find((dev) => dev.id === device.id)) {
          return [...state, device];
        }
        return state;
      case 'CLEAR':
        return [];
      default:
        return state;
    }
}
const BleScanPage = (props) => {
    const [isLoading,setIsLoading] = useState(false)
    const [scannedDevices,scannedDispatch] = useReducer(reducer,[])
    const [anyIsOpened, setAnyIsOpened] = useState(false)
    const [anyIsLocked, setAnyIsLocked] = useState(false)
    useEffect(()=>{
        return ()=>{
            bleManager.destroy()
        }
    },[])
    // useEffect(()=>{
    //     if(anyIsLocked){
    //         props.onOpenedBox()
    //     }
    //     console.log(anyIsLocked)    
    // },[anyIsLocked])
    const scanDevice = async() =>{
        let state = await bleManager.state()
        if (state !== 'PoweredOn') {
            console.warn('BLE off')
            await bleManager.enable()
            console.log('hi') 
        }
        state = await bleManager.state()
        console.log('state',state)
        setIsLoading(true)
        bleManager.startDeviceScan(null,null,(error,scannedDevice) => {
            if(error){
                console.warn(error)
                return
            }
            if(scannedDevice && scannedDevice.name === 'BT05'){
                scannedDispatch({type:'ADD_DEVICE',payload:scannedDevice})
                console.log(scannedDevice.serviceUUIDs)
            }
        })
        setTimeout(()=>{
            bleManager.stopDeviceScan()
            setIsLoading(false)
        },5000)
    }
    const skipSearchBox = () =>{
        props.onSkipPress()
    }
    const ListHeaderComponent = () =>(
        <View style={{alignItems:'center',padding:10}}>
            <View>
                <Text style={style.title}>連接箱子</Text>
            </View>
            <View>
                <TouchableOpacity style={style.btn} onPress={()=>{scannedDispatch({type:'CLEAR'})}} activeOpacity={0.8}>
                    <View>
                        <Text style={style.btnText}>清除裝置</Text>
                    </View>
                </TouchableOpacity>
                {isLoading?(<>
                    <ActivityIndicator size={25} color={'#6495ED'}/>
                </>):(<>
                    <TouchableOpacity style={style.btn} onPress={scanDevice} activeOpacity={0.8}>
                        <View>
                            <Text style={style.btnText}>搜尋箱子</Text>
                        </View>
                    </TouchableOpacity>
                </>)}
            </View>
        </View>
    )
    return(
        <Modal isVisible={props.isVisible} >
            <View style={globalStyle.Modal}>
                <View style={[globalStyle.container,{borderWidth:1}]}>
                        <FlatList
                        data={scannedDevices}
                        keyExtractor={(item)=>item.id}
                        renderItem={({item})=><DeviceCard device={item} checkIfOpen={setAnyIsOpened} checkIfLocked={setAnyIsLocked}/>}
                        ListHeaderComponent={ListHeaderComponent}
                        contentContainerStyle={{alignItems:'center'}}
                        />
                    <View style={{position:'absolute',bottom:10,right:10,flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{skipSearchBox()}} activeOpacity={0.8} disabled={anyIsOpened}>
                            <View style={[style.btn,anyIsOpened && {backgroundColor:'#DCDCDC'}]}>
                                <Text style={style.btnText} >略過</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.onOpenedBox} activeOpacity={0.8} disabled={!anyIsLocked}>
                            <View style={[style.btn,!anyIsLocked&& {backgroundColor:'#DCDCDC'}]}>
                                <Text style={style.btnText}>完成</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const style = StyleSheet.create({
    title:{
        textAlign:'center',
        fontSize:20,
    },
    btn:{
        backgroundColor:'gray',
        borderRadius: 10,
        paddingHorizontal:10,
        margin: 5,
        
    },
    btnText:{
        color:'white'
    },
    deviceCard:{
        borderRadius:10,
        backgroundColor:'white',
        width:200,
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:10,
    }
})
export default BleScanPage;