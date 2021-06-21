
import React,{useEffect,useState} from "react"

const AuthContext=React.createContext({isLoggedIn:false,onLogin:()=>{},onLogout:()=>{}, 
 

})


export  function AuthContextProvider(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const loginHandler = (email, password) => {
      
      localStorage.setItem("isLoggedIn","1");
      // We should of course check email and password
      // But it's just a dummy/ demo anyways
      setIsLoggedIn(true);
    };
    useEffect(()=>{
     const storedUserLogInInformation= localStorage.getItem("isLoggedIn");
     if(storedUserLogInInformation==="1"){
       setIsLoggedIn(true)
     }
    },[]);
  
  
    const logoutHandler = () => {
      localStorage.removeItem("isLoggedIn")
      
      setIsLoggedIn(false);
    };
  
    return <AuthContext.Provider 
    value={{isLoggedIn:isLoggedIn,
        onLogout:logoutHandler,
        onLogin:loginHandler}} >
        {props.children}
        </AuthContext.Provider>
}
export default AuthContext;