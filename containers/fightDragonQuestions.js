import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import globalStyle from '../styles/globalStyle'

function DragonQuestions({navigation}){
    // variables of question, answers
    // options are set as 4 for all questions
    let optionStyle = style.option;
    const [question,setQuestion] = useState([
        {
            pId:0,
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
        }
    ])
    const [options, setOptions] = useState([
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
    ])
    const [ans, setAns] = useState(1)
    const [yourAns,setYourAns] = useState(0)
    const [pId,setPId] = useState(0)
    // variables of game rules, eg. blood, attack, etc
    const [petBlood, setPetBlood] = useState(100)
    // whoAttack: true-> attack by pet, false-> attack by dragon
    const [whoAttack, setWhoAttack] = useState(true)
    
    const sleep = (ms)=>{
        return new Promise(resolve=>setTimeout(resolve, ms));
    }
    useEffect(()=>{
        const fetchQuestion=async()=>{
            console.log(question.length)
            setOptions(question[0].options)
            setAns(question[0].ans)
            setPId(question[0].pId)
        }
        fetchQuestion()
    },[])

    useEffect(()=>{
        console.log("effect")
        console.log(yourAns)
        const nextQuesion=async()=>{
            // TODO: 
            if (yourAns === 0) return
            await sleep(1000)
            let id = pId+1;
            if(petBlood<=0){
                // defeated
                console.log("defeat")
                navigation.navigate('FightDragonResult',{Result:false})
            }
            if(id === question.length){
                // win
                console.log("win")
                navigation.navigate('FightDragonResult',{Result:true})

            }else{
                setOptions(question[id].options)
                setAns(question[id].ans)
                setPId(question[id].pId)
            }
        }
        nextQuesion()
    },[yourAns])

    const btnBorderColor = (id) =>{
        if (id === yourAns && id === ans){
            optionStyle = {...style.option,borderWidth:5,borderColor:"#918070"}
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
        key={op.id} onPress={()=>{setYourAns(op.id)}}
        underlayColor="#918070"
        >
            <Text style={{fontSize:32}}>{op.words}</Text>
        </TouchableHighlight>
    ));

    return(
        <View style={globalStyle.containerBackground}>
            <View style={globalStyle.container}>
                <View style={style.header}>
                    <View style={style.petHPBlock}>
                        <View style={style.HPOutlined}>
                            {/* Text absolute at the middle of HP */}
                            <View style={{...style.HPLast,width:"50%"}}>
                            </View>
                            <Text style={style.HPWord}>1000/1000</Text>
                        </View>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.questionPart}>
                    </View>
                    <View style={style.showAnimate}>
                        <View style={style.pet}>
                        {/* where put pet */}
                        </View>
                        <View style={style.dragon}>
                        {/* where put dragon */}
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
        borderColor:'black',
        borderWidth:1,
        justifyContent:'center'
        // flexDirection:'row',
    },
    body:{
        flex:6,
        borderColor:'black',
        borderWidth:1,
        // alignItems:'center',
    },
    root:{
        flex:2,
        borderColor:'black',
        borderWidth:1,
        alignItems:"center",
    },
    petHPBlock:{
        // flex:1,
        width:"50%",
        padding:5,
        height:35,
        
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
        position:'absolute',
        color:'white',
        left:50,
        top:2,
    },
    questionPart:{
        flex:1,
        borderColor:'white',
        borderWidth:1,
        padding:20,
    },
    showAnimate:{
        flex:3,
        borderColor:'white',
        borderWidth:1,
        flexDirection:'row',
    },
    pet:{
        flex:2,
        borderColor:'brown',
        borderWidth:1,
        padding:10,
    },
    dragon:{
        flex:3,
        borderColor:'brown',
        borderWidth:1,
        padding:10,
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
        borderWidth:1,
    }
})

export default DragonQuestions;