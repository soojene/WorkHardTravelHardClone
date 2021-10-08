import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const colors = {
    bg: "#18191F",
    disable: "#313237",
    header: "black",
    inputBox:"#393B45",
    listBoxColor:"#242734",
    fontColor:"white"
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.bg,
    },
    textDeco: {
        color:"white",
        fontSize:25,
        fontWeight: "700"
    },
    header: {
        flex:1,
        width:windowWidth,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal:20,
        paddingBottom: 8,
        backgroundColor:colors.header
    },
    inputContainer:{
        flex:0.8,
        width:windowWidth, 
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:5,
        backgroundColor:colors.header
    },
    inputBox:{
        fontSize:20, 
        color:colors.fontColor,
        width:windowWidth*0.9, 
        paddingHorizontal:15, 
        paddingVertical:8, 
        borderRadius:20,
        backgroundColor:colors.inputBox
    },
    mainBox:{
        flex:8.2,
        width:windowWidth,
        justifyContent:"center",
        alignItems: "center"
    },
    scrollBox:{
        // flex:1,
        width:"100%",
        paddingVertical:10,
        paddingHorizontal:20
    },
    listBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingVertical:10,
        paddingHorizontal:15,
        margin:8,
        borderRadius:15,
        backgroundColor:colors.listBoxColor
    },
    listText:{
        fontSize:20,
        color:colors.fontColor,
        // textDecorationLine:"line-through"
    }
});