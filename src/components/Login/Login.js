import React, { useState,useEffect, useReducer, useContext, useRef } from 'react';
import Input from '../Input/Input';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-context';


function emailReducer(state,action){
  if (action.type==="User_Input"){
    return{ value:action.val,isValid:action.val.includes("@")}
  }
  if(action.type==="Input_Blur"){
    return{value:state.value,isValid:state.value.includes("@")}
  }
  return {value:"",isValid:false}

}
function passWordReducer(state,action){
  if (action.type==="User_Input"){
    return{ value:action.val,isValid:action.val.trim().length > 6}
  }
  if(action.type==="Input_Blur"){
    return{value:state.value,isValid:state.value.trim().length > 6}
  }
  return {value:"",isValid:false}
}

const Login = () => {
  const ctx=useContext(AuthContext)
  
  const [formIsValid, setFormIsValid] = useState(false);
  const[emailState,dispatchEmail]=useReducer(emailReducer,{value:"",isValid:null})
  const[passWordState,dispatchPassWord]=useReducer(passWordReducer,{value:"",isValid:null})

  const emailInputref=useRef();
  const passWordInputref=useRef();

  useEffect(()=>{
   const identifier= setTimeout(()=>{ 
      setFormIsValid(
     emailState.isValid && passWordState.isValid);
     },500);
    return ()=>{ clearTimeout(identifier)}
},[emailState.isValid,passWordState.isValid])
   
  const emailChangeHandler = (event) => {
    dispatchEmail({type:"User_Input",val:event.target.value})
    

  };
  

  const passwordChangeHandler = (event) => {
    dispatchPassWord({type:"User_Input",val:event.target.value})
  

  
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"Input_Blur"})
  };

  const validatePasswordHandler = () => {
   dispatchPassWord({type:"Input_Blur"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
    ctx.onLogin(emailState.value, passWordState.value);}
    else if(!emailState.isValid){
      emailInputref.current.focus();
    }
    else {
      passWordInputref.current.focus();
    }

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
            ref={emailInputref}
             label="E-mail"
             type="email"
             id="email"
             value={emailState.value}
             onChange={emailChangeHandler}
             onBlur={validateEmailHandler}
             isValid={emailState.isValid}

        />
         <Input 
              ref={passWordInputref}
              label="Password"
              type="password"
              id="password"
              value={passWordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              isValid={passWordState.isValid}

        />
    
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
