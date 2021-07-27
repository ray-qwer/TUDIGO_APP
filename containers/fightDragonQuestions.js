import {useState,useEffect,useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import globalStyle from '../styles/globalStyle'
import { delay } from '../utils/utils'
import AppContext from '../utils/ReducerContext'
import imageReq from '../utils/images'
function DragonQuestions({navigation}){
    // variables of question, answers
    // options are set as 4 for all questions
    const userSettings = useContext(AppContext)
    let optionStyle = style.option;
    const [question,setQuestion] = useState([
        {
            topic:"first question",
            ans:3,
            options:[
                {
                    id:1,
                    words:"ans1",
                },
                {
                    id:2,
                    words:"ans2",
                },
                {
                    id:3,
                    words:"ans3",
                },
                {
                    id:4,
                    words:"ans4",
                },
            ] 
        },
        {
            topic:'second question but it is a little bit long so that it needs two lines',
            ans:2,
            options:[
                {
                    id:1,
                    words:"ans1",
                },
                {
                    id:2,
                    words:"ans2",
                },
                {
                    id:3,
                    words:"ans3",
                },
                {
                    id:4,
                    words:"ans4",
                },
            ] 
        },
    ])
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
    const [petImage,setPetImage] = useState(require('../image/pets/water/W3.png'))
    const [pet,setPet] = useState()
    useEffect(()=>{
        let l = userSettings.petList
        let p = l.find(ele => ele.id === userSettings.selectedPet.id && ele.attribute === userSettings.selectedPet.attribute)
        setPet(p)
        setPetImage(imageReq[p.source])
    },[])
    useEffect(()=>{
        // fetch Question from server
        const fetchQuestion=async()=>{
            console.log(question.length)
            setQuestionById(0)
        }
        const setOriginBlood = async() =>{
            // check which pet
            setPetOriginBlood(100)
            setDragonOriginBlood(100)
        }
        fetchQuestion()
        setOriginBlood()
    },[])
    
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
        if (id !== ans){
            setPetBlood(petBlood - 10)
            setWhoAttack(1)
        } else {
            setDragonBlood(dragonBlood - 10)
            setWhoAttack(0)
        }
        // animation
        await delay(1000)
        console.log(pId)
        let pIdNext = pId + 1 
        if (petBlood <= 0) {
            // defeated
            navigation.navigate('FightDragonResult',{Result:false})
            return
        }
        if (pIdNext === question.length){
            // win
            navigation.navigate('FightDragonResult',{Result:true})
            return 
        }
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
            <Text style={{fontSize:32}}>{op.words}</Text>
        </TouchableHighlight>
    ));

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
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
                            <Text style={style.questionText}>{topic}</Text>
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
                {/* no home icon */}
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
        flex:1,
        paddingHorizontal:20,
        paddingVertical:5
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
        padding:10,
        justifyContent:'center'
    },
    dragon:{
        flex:3,
        borderColor:'brown',
        padding:10,
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
        borderRadius:8,
    }
})

export default DragonQuestions;