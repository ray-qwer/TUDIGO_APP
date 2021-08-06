import React, {useState,useEffect,useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { delay } from '../utils/utils'
import AppContext from '../utils/ReducerContext'
import imageReq from '../utils/images'
import data from '../utils/questionJson.json'
function DragonQuestions({navigation}){
    // variables of question, answers
    // options are set as 4 for all questions
    const userSettings = useContext(AppContext)
    let optionStyle = style.option;
    const [question,setQuestion] = useState(null)
    const [options, setOptions] = useState([])
    const [topic, setTopic] = useState('')

    // TODO: connect to server
    
    //

    const [ans, setAns] = useState(1)
    const [yourAns,setYourAns] = useState(0)
    const [pId,setPId] = useState(0)    // problem ID
    // variables of game rules, eg. blood, attack, etc
    const [petBlood, setPetBlood] = useState(100)
    const [petOriginBlood, setPetOriginBlood] = useState(100)
    const [dragonBlood, setDragonBlood] = useState(100)
    const [dragonOriginBlood, setDragonOriginBlood] = useState(100)
    // whoAttack: 0-> attack by pet, 1-> attack by dragon, 2-> idle 
    const [whoAttack, setWhoAttack] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [showQuestion, setShowQuestion] = useState(true)
    // image
    const [petImage,setPetImage] = useState('')
    const [pet,setPet] = useState()
    useEffect(()=>{
        let l = userSettings.petList
        let p = l.find(ele => ele.id === userSettings.selectedPet.id && ele.attribute === userSettings.selectedPet.attribute)
        setPet(p)
        let blood = Math.floor((p.level/10+1)*100)
        setPetBlood(blood)
        setPetOriginBlood(blood)
        let DBlood = (Math.floor(p.level/10)+1)*100
        setDragonBlood(DBlood)
        setDragonOriginBlood(DBlood)
        setPetImage(imageReq[p.source])
    },[])
    useEffect(()=>{
        // fetch Question from server
        const fetchQuestion=async()=>{
            let Q = []
            let num =[]
            let i = 0;
            while(i<10){
                let randomNum = Math.floor(Math.random()*data.length)
                if (num.findIndex(n=>n === randomNum) === -1){
                    num.push(randomNum)
                    Q.push(data[randomNum])
                    console.log(i)
                    i = i+1
                }
            }
            console.log(2)
            setQuestion(Q)
        }
        // const setOriginBlood = async() =>{
        //     // check which pet
        //     setPetOriginBlood(100)
        //     setDragonOriginBlood(100)
        // }
        console.log(data.length)
        // console.log(data[0])
        fetchQuestion()
    },[])
    useEffect(()=>{
        if (question !== null){
            setQuestionById(0)
            console.log('hi')
        }
    },[question])

    
    const setQuestionById = async(id) =>{
        setOptions(question[id].options)
        setAns(question[id].ans)
        setYourAns(0)
        setTopic(question[id].topic)
        setPId(id)
    }

    const onAnsPress = async(id) =>{
        setYourAns(id)
        setDisabled(true)
        setShowQuestion(false)
        // TODO: attack logic
        let pbd =petBlood
        let dbd = dragonBlood
        if (id !== ans){
            let defense = 0;
            if (pet.id !== 0){
                if (pet.attribute === 1){
                    defense = Math.floor((pet.level/10+1)*8)
                }
            }
            pbd = Math.max(petBlood - Math.ceil((pet.level+1)/10)*30+defense,0)
            setPetBlood(pbd)
            setWhoAttack(1)
        } else {
            let attack = Math.floor(((pet.level/10)+1)*30);
            
            switch(pet.attribute){
                case 0: attack = 30;break;
                case 1: break;
                case 2: attack = Math.floor(attack*1.2);break;
                case 3: break;
                default: break;
            }
            dbd = Math.max((dragonBlood - attack),0)
            setDragonBlood(dbd)
            setWhoAttack(0)
        }
        // animation
        await delay(1000)
        console.log(pId)
        let pIdNext = pId + 1 
        if (pbd <= 0) {
            // defeated
            navigation.navigate('FightDragonResult',{Result:false})
            return
        }
        if (dbd <= 0) {
            navigation.navigate('FightDragonResult', { Result:true })
            return
        }
        if (pIdNext === question.length){
            // win
            navigation.navigate('FightDragonResult',{Result:true})
            return 
        }
        // recover logic
        if (pet.id !== 0){
            if (pet.attribute === 3){
                if (petBlood < petOriginBlood){
                    
                    setPetBlood(Math.min((petBlood + Math.floor(pet.level/10)*8),petOriginBlood))
                }
            }
        }
        //
        console.log(pIdNext)
        setDisabled(false)
        setShowQuestion(true)
        setWhoAttack(2)
        setQuestionById(pIdNext)        
    }

    const btnBorderColor = (id) =>{
        if (id === yourAns && id === ans){
            optionStyle = {...style.option,borderWidth:5,borderColor:"green"}
        }
        else if(id === yourAns){
            optionStyle = {...style.option, borderWidth:5,borderColor:"darkred"}
        }
        else {
            optionStyle=style.option
        }
        return optionStyle
    }

    const AnswerOption =()=> options.map((op)=>(
        <TouchableHighlight style={btnBorderColor(op.id)}
        key={op.id} onPress={()=>{onAnsPress(op.id)}}
        underlayColor="#918070"
        disabled={disabled}
        >
            <Text adjustsFontSizeToFit style={{fontSize:20,textAlign:'center'}}>{op.words}</Text>
        </TouchableHighlight>
    ));

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>{
                question === [] ? (<></>):(
                <>
                <View style={style.header}>
                    <View style={style.petHPBlock}>
                        <Text style={{textAlign:'center'}}>Pet</Text>
                        <View style={style.HPOutlined}>
                            {/* Text absolute at the middle of HP */}
                            <View style={{...style.HPLast,width:(petBlood/petOriginBlood*100).toString()+'%'}}>
                            </View>
                        </View>
                        <View>
                            <Text style={style.HPWord}>{petBlood}/{petOriginBlood}</Text>
                        </View>
                    </View>
                    <View style={style.petHPBlock}>
                        <Text style={{textAlign:'center'}}>Dragon</Text>
                        <View style={style.HPOutlined}>
                            {/* Text absolute at the middle of HP */}
                            <View style={{...style.HPLast,width:(dragonBlood/dragonOriginBlood*100).toString()+'%'}}>
                            </View>
                        </View>
                        <View>
                            <Text style={style.HPWord}>{dragonBlood}/{dragonOriginBlood}</Text>
                        </View>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.questionPart}>{showQuestion&&
                        <View style={style.questionWindow}>
                            <Text style={style.questionText} adjustsFontSizeToFit>{topic}</Text>
                        </View>
                    } 
                    </View>
                    <View style={style.showAnimate}>
                        <View style={style.pet}>
                        {/* where put pet */}
                            <Image style={{height:'50%',width:'100%'}}source={petImage}
                            resizeMode='center' />
                        </View>
                        <View style={style.dragon}>
                        {/* where put dragon */}
                            <Image style={{height:'70%',width:'100%'}}source={require('../image/dragon/d1.png')}
                            resizeMode='center'/>
                        </View>
                    </View>
                </View>
                <View style={style.root}>
                    <View style={style.answerContainer}>
                        <AnswerOption/>
                    </View>
                </View>
                </>
                )}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        flexDirection:'row',
    },
    body:{
        flex:6,
        // alignItems:'center',
    },
    root:{
        flex:2,
        alignItems:"center",
    },
    petHPBlock:{
        // flex:1,
        width:"40%",
        paddingHorizontal:5,
        flexDirection:'column',
        margin:5,
        height:50
    },
    HPOutlined:{
        flex:1,
        borderColor:'white',
        borderWidth:1,
        borderRadius:10,
        overflow:"hidden",
        backgroundColor:'black',
    },
    HPLast:{
        // try react-native-linear-gradient
        flex:1,
        backgroundColor:'red',
        borderRadius:10,
        borderColor:'black',
        borderWidth:1,
    },
    HPWord:{
        textAlign:'center',
        color:'black',
        top:2,
    },
    questionPart:{
        flex:2,
        paddingHorizontal:20,
        paddingVertical:6
    },
    questionWindow:{
        borderWidth:5,
        borderRadius:20,
        borderColor:'#B1A090',
        flex:1,
        padding:5,
        justifyContent:'center'
    },
    questionText:{
        fontSize:20,
        textAlign:'center',
    },
    showAnimate:{
        flex:4,
        borderColor:'white',
        flexDirection:'row',
    },
    pet:{
        flex:2,
        borderColor:'brown',
        padding:0,
        justifyContent:'center'
    },
    dragon:{
        flex:3,
        borderColor:'brown',
        padding:0,
        justifyContent:'center',
    },
    answerContainer:{
        flex:1,
        width:"70%",
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    option:{
        width:"45%",
        height:"40%",
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#D1C0B0",
        borderRadius:5,
        padding:5,
    }
})

export default DragonQuestions;