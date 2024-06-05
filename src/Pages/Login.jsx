import React,{useState} from "react";
import  { Navigate,Link,useNavigate } from 'react-router-dom'
// React Components
import AuthButtons from "../Components/AuthButtons";
import InputBox from "../Components/InputBox";


// Material UI icons
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Login() {
  let navigate=useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword]=useState("");
  const [isSigningUp,setIsSigningUp]=useState(false);
  function getUserInput(e){
    const {name,value}=e.target;
    console.log(value);
    if(name==="username"){
      setusername(value);
    }

    if(name==="password"){
      setPassword(value);
    }
  }

  function sendLogInfo(){
    
    if(isSigningUp){
      console.log("hey");
    //   axios.post('http://localhost:5000/api/signup',{
    //     username:username,
    //     password:password
    //   },{
    //     'Content-type':`application/json`,
    //   }).then(message=>{
    //     if(message.data.status==='ok'){
    //       console.log(message);
    //     }
    //   }).catch(err=>{
    //     console.log(err);
    //   })
    }
    else{
        console.log("d");
    //     axios.post('http://localhost:5000/api/login',{
    //     username:username,
    //     password:password
    //   },{
    //     'Content-type':`application/json`,
    //   }).then(message=>{
    //     console.log(message);
    //     if(message.data.status==='ok'){
    //       const {data,token}=message.data;
    //       console.log(data);
    //       localStorage.setItem('userid',data);
    //       localStorage.setItem('token',token);
    //       navigate(`/profile/${data}`);
    //     }}).catch(err=>{
    //     console.log(err);
    //   })
    }
    
  }

  function signUp(){
      setIsSigningUp((prev)=>{
        return !prev;
      })
  }
  return <div className="login_div flex_col">
    <div className="top_elements flex mx-4 mb-2">
      <h1 className='logo text-[70px] text-[#343434] text-left'>BEING</h1>
      <nav className='flex text items-center flex-1 justify-center'>
            <a href='/login'><div className='h-fit mr-8'>Login</div></a>
            <a href='/exercise'><div className='h-fit mr-8'>Exercise</div></a>
            <div className='h-fit mr-8'>Dashboard</div>
      </nav>
      <div className='rounded-2xl text border border-[2px] border-[#343434] px-6 py-2 flex items-center text-[#343434] text-[16px]'>Register</div>    
    </div>
    <div className="flex">
        <div className='hero h-[600px] mb-4 bg-cover w-[300px] mx-4 rounded-lg bg-center'/>
        <div className="login_body mx-[200px]">
        <div className="input_section flex-col center">
            <InputBox type="text" name="username" placeholder="Username/Email" getUserInput={getUserInput}/>
            <InputBox type="password" name="password" placeholder="Password" getUserInput={getUserInput}/>
            <p className="ml-0 forgot_text text-[#343434]">Forgot Password</p>
            <div className="login flex login_page_button" onClick={sendLogInfo}>
                <p className="text-[#343434]">{!isSigningUp?`Login to Your Account`:`Create Account`}</p>
            </div>
        </div>
        <p className="text-center text-[#343434]">OR</p>
        <div className="auth_buttons">
            <AuthButtons medium="Google" icon={<GoogleIcon/>}></AuthButtons>
        </div>
        </div>
        <div className='login-hero h-[600px] mb-4 bg-cover w-[300px] mx-4 rounded-lg bg-center'/>

    </div>
    
      
   

   

  </div>;
}