import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        minHeight:"100vh"
    },
    heading:{
        fontSize:"15rem"
    }

  }));