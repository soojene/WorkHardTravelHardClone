import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors, styles } from './style';

const STORAGE_TODO ="@toDos";
const STORAGE_MENU = "@menu";

export default function App() {
  const [menu, setMenu] = useState();
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [check, setCheck] = useState(false);
  const [deletBtn, setDeletBtn] = useState(false);

  const [workN, setWorkN] = useState(0);
  const [workDoneN, setWorkDoneN] = useState(0);
  const [travelN, setTravelN] = useState(0);
  const [travelDoneN, setTravelDoneN] = useState(0);

  // console.log(workDoneN);
  useEffect(() => {
    loadToDos();
  }, []);

  useEffect(()=>{
    let workTotal=0;
    let travelTotal=0;
    let workDone = 0;
    let travelDone =0;
    Object.keys(toDos).forEach(key=>{
      toDos[key].menu? workTotal += 1:travelTotal +=1;
      if(toDos[key].menu && toDos[key].check){
        workDone +=1;
      }else if(!toDos[key].menu&&toDos[key].check){
        travelDone +=1;
      };
    }
    );
    setWorkN(workTotal);
    setWorkDoneN(workDone);
    setTravelN(travelTotal);
    setTravelDoneN(travelDone);
  }, [toDos]);

  const saveToDos = async (storageKey, toSave) => {
    try{
      await AsyncStorage.setItem(storageKey, JSON.stringify(toSave));
    }catch(e){
      console.log(e);
    }
  };
  const loadToDos = async () => {
    try{
      const list = await AsyncStorage.getItem(STORAGE_TODO);
      const menuState = await AsyncStorage.getItem(STORAGE_MENU);
      console.log(list);
      console.log(menuState);

      if(!list){
        return;
      }
      if(!menuState){
        setMenu(true);
        return;
      }
      setToDos(JSON.parse(list));
      setMenu(JSON.parse(menuState));
    }catch(e){
      console.log(e);
    }
  };
  const work = async()=> {
    setMenu(true);
    setDeletBtn(false);
    await saveToDos(STORAGE_MENU, true);
  };
  const travel = async()=> {
    setMenu(false);
    setDeletBtn(false);
    await saveToDos(STORAGE_MENU, false)
  };
  const onChangeText = (typedWord) =>{
    setText(typedWord);
  };
  const inputSubmit = async () => {
    if(text === ""){
      return;
    }
    const newToDos = {...toDos, [Date.now()]: { text, menu, check }};
    setToDos(newToDos);
    await saveToDos(STORAGE_TODO, newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    if(Platform.OS === "web"){
      // const alertCheck = confirm("삭제 하시겠습니까?");
      // if(alertCheck){
        const newToDos = { ...toDos };
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(STORAGE_TODO, newToDos);
      // }
    }else{
      Alert.alert("목록 삭제", "목록을 삭제하시겠어요?", [
        { text: "취소" },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            const newToDos = { ...toDos };
            delete newToDos[key];
            setToDos(newToDos);
            saveToDos(STORAGE_TODO, newToDos);
          },
        },
      ]);
    }
  };
  const checkList = (key) => {
    let newToDos = {...toDos};
    if(newToDos[key].check){
      newToDos[key].check=false;
    }else{
      newToDos[key].check=true;
    }
    setToDos(newToDos);
    saveToDos(STORAGE_TODO, newToDos);
  };
  const enableDeletBtn = () => {
    if(deletBtn){
      setDeletBtn(false);
    }else{
      setDeletBtn(true);
    }
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{marginRight:25}} onPress={work}>
            <Text style={{
        color:"white",
        fontSize:25,
        fontWeight: "700"
    , color: menu? "white": colors.disable}}>WORK</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={travel}>
            <Text style={{color:"white",
        fontSize:25,
        fontWeight: "700", color: !menu? "white": colors.disable}}>TRAVEL</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{paddingBottom:0}} onPress={()=>enableDeletBtn()}>
          <AntDesign name="delete" size={deletBtn ? 25: 20} color={deletBtn ? "white": colors.disable} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.inputBox}
          // returnKeyType="done"
          placeholderTextColor="darkgrey" 
          placeholder={menu? "... what to do":"... where you travel"}
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={inputSubmit}
          blurOnSubmit={false}
          />
  
      </View>

      <View style={{width:"100%",
        justifyContent:"center",
        alignItems: "center", display: menu? "flex":"none"}}>
        <View style={{ height:5,
        flexDirection:"row",
        width:"80%",
        borderRadius:10,
        marginTop:10,
        backgroundColor:colors.disable, display:workN===0? "none":"flex"}}>
          <View style={{borderRadius:10,
        backgroundColor:"#9690F0", width:`${(workDoneN*100/workN)}%`}}></View>
        </View>
        <ScrollView 
        style={styles.scrollBox}>
          {Object.keys(toDos).map((key) => (
            toDos[key].menu ? (<View key={key} style={styles.listBox}>
                <Text style={{...styles.listText, textDecorationLine:toDos[key].check ? "line-through":"none", color:toDos[key].check ? "grey":colors.fontColor, fontWeight:toDos[key].check ? "200" : "bold"}}>{toDos[key].text}</Text>
              <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <TouchableOpacity style={{display:deletBtn? "flex" : "none" }} onPress={() => deleteToDo(key)}>
                  <AntDesign name="delete" size={20} color="darkgrey" />
                </TouchableOpacity>
                <TouchableOpacity style={{display:deletBtn? "none" : "flex"}} onPress={() => checkList(key)}>
                  <FontAwesome name="check-circle" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>):null
          ))}
        </ScrollView>
      </View>

      <View style={{width:"100%",
        justifyContent:"center",
        alignItems: "center", display: !menu? "flex":"none"}}>
      <View style={{height:5,
        flexDirection:"row",
        width:"80%",
        borderRadius:10,
        marginTop:10,
        backgroundColor:colors.disable, display:travelN===0? "none":"flex"}}>
          <View style={{borderRadius:10,
        backgroundColor:"#9690F0", width:`${(travelDoneN*100/travelN)}%`}}></View>
      </View>
      <ScrollView style={styles.scrollBox}>
        {Object.keys(toDos).map((key) => (
          !toDos[key].menu ? 
          (<View key={key} style={styles.listBox}>
              <Text style={{...styles.listText, textDecorationLine:toDos[key].check ? "line-through":"none", color:toDos[key].check ? "grey":colors.fontColor, fontWeight:toDos[key].check ? "200" : "bold"}}>{toDos[key].text}</Text>
              <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                <TouchableOpacity style={{display:deletBtn? "flex" : "none" }} onPress={() => deleteToDo(key)}>
                  <AntDesign name="delete" size={20} color="darkgrey" />
                </TouchableOpacity>
                <TouchableOpacity style={{display:deletBtn? "none" : "flex"}} onPress={() => checkList(key)}>
                  <FontAwesome name="check-circle" size={20} color="black" />
                </TouchableOpacity>
              </View>
          </View>) : null
          ))}
      </ScrollView>
      </View>

      <StatusBar style="light" />
    </View>
  );
};