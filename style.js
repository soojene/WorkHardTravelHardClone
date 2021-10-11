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
    header: {
        // flex:1,
        // width:windowWidth,
        width:"100%",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop:40,
        paddingHorizontal:20,
        paddingBottom: 8,
        backgroundColor:colors.header
    },
    inputContainer:{
        // flex:0.8,
        // width:windowWidth,
        width:"100%", 
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:15,
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
    // mainBox:{
    //     flex:8.2,
    //     width:windowWidth,
    //     justifyContent:"center",
    //     alignItems: "center"
    // },
    // progressBarContainner:{
    //     flex:0.02,
    //     flexDirection:"row",
    //     width:windowWidth*.8,
    //     borderRadius:10,
    //     marginTop:10,
    //     backgroundColor:colors.disable
    // },
    // progressBarStatus:{
    //     borderRadius:10,
    //     backgroundColor:"#9690F0",
    // },
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
        color:colors.fontColor
    }
});