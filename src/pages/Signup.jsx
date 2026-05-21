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
    
    const Signup = () => {
    
    const {
    signup
    }
    =
    useContext(
    AuthContext
    );
    
    const navigate =
    useNavigate();
    
    const [
    name,
    setName
    ]=
    useState("");
    
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
    
    const handleSignup =
    async(e)=>{
    
    e.preventDefault();
    
    if(
    !name||
    !email||
    !password
    ){
    
    toast.error(
    "Fill all fields"
    );
    
    return;
    
    }
    
    try{
    
    await signup(
    
    name,
    
    email,
    
    password
    
    );
    
    toast.success(
    "Account Created"
    );
    
    navigate("/");
    
    }
    
    catch(err){
    
    console.log(err);
    
    toast.error(
    err.message
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
    handleSignup
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
    
    Signup
    
    </h1>
    
    <input
    
    type="text"
    
    placeholder="Name"
    
    value={name}
    
    onChange={(e)=>
    
    setName(
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
    
    Create Account
    
    </button>
    
    <p
    className="
    mt-5
    text-center
    "
    >
    
    Already have account?
    
    <Link
    to="/login"
    className="
    font-bold
    ml-2
    "
    >
    
    Login
    
    </Link>
    
    </p>
    
    </form>
    
    </section>
    
    );
    
    };
    
    export default Signup;