import React,{
    useContext,
    useState
    }
    from "react";
    
    import {
    Link,
    useNavigate
    }
    from "react-router-dom";
    
    import {
    AuthContext
    }
    from "../context/AuthContext";
    
    import toast
    from "react-hot-toast";
    
    const Login = () => {
    
    const {
    login
    }
    =
    useContext(
    AuthContext
    );
    
    const navigate =
    useNavigate();
    
    const [
    email,
    setEmail
    ]=
    useState("");
    
    const [
    password,
    setPassword
    ]=
    useState("");
    
    const handleLogin =
    async(e)=>{
    
    e.preventDefault();
    
    if(
    !email||
    !password
    ){
    
    toast.error(
    "Fill all fields"
    );
    
    return;
    
    }
    
    try{
    
    await login(
    email,
    password
    );
    
    toast.success(
    "Login Success"
    );
    
    navigate("/");
    
    }
    
    catch(err){
    
    console.log(err);
    
    toast.error(
    "Invalid Email or Password"
    );
    
    }
    
    };
    
    return(
    
    <section
    className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gray-100
    "
    >
    
    <form
    
    onSubmit={
    handleLogin
    }
    
    className="
    bg-white
    p-10
    rounded-3xl
    shadow-md
    w-full
    max-w-lg
    "
    
    >
    
    <h1
    className="
    text-4xl
    font-bold
    mb-8
    "
    >
    
    Login
    
    </h1>
    
    <input
    
    type="email"
    
    placeholder="Email"
    
    value={email}
    
    onChange={(e)=>
    
    setEmail(
    e.target.value
    )
    
    }
    
    className="
    w-full
    border
    rounded-xl
    px-5
    py-4
    mb-5
    "
    />
    
    <input
    
    type="password"
    
    placeholder="Password"
    
    value={password}
    
    onChange={(e)=>
    
    setPassword(
    e.target.value
    )
    
    }
    
    className="
    w-full
    border
    rounded-xl
    px-5
    py-4
    mb-8
    "
    />
    
    <button
    
    type="submit"
    
    className="
    w-full
    bg-black
    text-white
    py-4
    rounded-xl
    "
    
    >
    
    Login
    
    </button>
    
    <p
    className="
    mt-5
    text-center
    "
    >
    
    No account?
    
    <Link
    to="/signup"
    className="
    font-bold
    ml-2
    "
    >
    
    Signup
    
    </Link>
    
    </p>
    
    </form>
    
    </section>
    
    );
    
    };
    
    export default Login;