import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Button,makeStyles } from "@material-ui/core"
import { auth, firebase } from "../config/firebase"

import User from './User'
const useStyles = makeStyles((theme) => ({   
  flexContainer: {
      display:'flex',
      alignItems:'center',
  },
  buttonStyle: {
    marginLeft: 15,
    cursor: 'pointer'
  }
}))
export default function Auth() {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const SignIn = () => {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
    }
    return <Button className={classes.buttonStyle} variant="contained" color="primary"  onClick={signInWithGoogle}>Sign in With Google</Button>
  }
  const SignOut = () => {
    if(user) return <div className={classes.flexContainer}>
        <User user={user}/>
        <Button className={classes.buttonStyle} size="small" variant="contained" color="secondary" onClick={()=> auth.signOut()}>
      Sign out</Button>
    </div> 
  }
  return <div>
      {!user ? SignIn() : SignOut()}
    
  </div>;
}
