import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import All from './components/All';
import Completed from './components/Completed';
import Pending from './components/Pending';
import CoverImage  from "./components/CoverImage" ;

let currId = 5; 
function Todo() {
    const [buttonText,setButtonText] = useState("Clear All");
    const [inputValue,setInputValue] = useState("");
    const [arr ,setArr] = useState([ { id: 1, status: false, description: "Renew gym membership" }, { id: 2, status: true, description: "Create a video for Youtube" }, { id: 3, status: true, description: "Write a blog about new trends" }, { id: 4, status: false, description: "Send project file to client" }, ]);
    const[arrAll , setArrAll] = useState<number[]>([]);
    const[arrPending , setArrPending] = useState<number[]>([]);
    const[arrCompleted , setArrCompleted] = useState<number[]>([]);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    const handleClick = ()=>
    {
        if(buttonText==="Clear All") { setArr([]); }
        if (buttonText === "Add")  { const newObject = { id: currId, status: false, description: inputValue }; setArr([...arr, newObject]); setInputValue(""); setButtonText("Clear All"); currId++; }
        if (buttonText === "Mark Complete")  
        {
            const updatedArr = arr.map((i) => { if (arrPending.includes(i.id)) { return { ...i, status: true }; } return i; }); setArr(updatedArr);
            setArrPending([]); setButtonText("Clear All");
        }
        if (buttonText === "Mark Pending")  
        {
            const updatedArr = arr.map((i) => { if (arrCompleted.includes(i.id)) { return { ...i, status: false }; } return i; }); setArr(updatedArr);
            setArrCompleted([]); setButtonText("Clear All");
        }
        if(buttonText.substring(0,8) === "Clear ( ")
        {
            const newArr = arr.filter(item => !arrAll.includes(item.id));
            setArr(newArr);  setArrAll([]);
            setButtonText("Clear All");
        }
    };
    const handleChange=(event:any)=>
    {
        setInputValue(event.target.value);
        if(event.target.value.length>0) setButtonText("Add");
        else setButtonText("Clear All");
    };
    return( 
    <Router>
    <div className='flex flex-col space-y-8 justify-center items-center ' >
    <CoverImage/>
    <div className='w-[400px] h-[500px] bg-white-100 rounded-xl flex flex-col border-2 border-black-100'>
    <input onChange={handleChange} value={inputValue} className='border-2 rounded-md mx-6 mt-8 mb-6 py-3 px-7 border-black-100' type="text"  placeholder= "Add a new task"  /> 
    <nav className="flex justify-between mx-6"> 
    <ul className="flex space-x-2">
        <li onClick={()=>{ setArrAll([]); setButtonText("Clear All"); }} ><NavLink to="/" className={({isActive})=>isActive ? "text-indigo-400 underline font-bold" : "hover:text-blue-400 font-bold"} >All</NavLink></li>
        <li><NavLink to="/pending" onClick={()=>{setArrPending([]);setButtonText("Clear All");}} className={({isActive})=>isActive ? "text-indigo-400 underline font-bold" : "hover:text-blue-400 font-bold"}>Pending</NavLink></li> 
        <li><NavLink to="/completed" onClick={()=>{setArrCompleted([]);setButtonText("Clear All");}} className={({isActive})=>isActive ? "text-indigo-400 underline font-bold" : "hover:text-blue-400 font-bold"}>Completed</NavLink></li>
    </ul>
    <button onClick={handleClick} className="bg-indigo-400   rounded hover:bg-red-600 text-white-100 py-1 px-3 "> {buttonText} </button>
    </nav>
    <hr className="mt-4 border"/>
    <Routes>
    <Route path='/' element = {<All arr = {arr} buttonText={buttonText} setButtonText = {setButtonText} arrAll = {arrAll} />} />
    <Route path='/pending' element = {<Pending arr = {arr} buttonText={buttonText} setButtonText = {setButtonText} arrPending = {arrPending} />} />
    <Route path='/completed' element = {<Completed arr = {arr} buttonText={buttonText} setButtonText = {setButtonText} arrCompleted = {arrCompleted}/>} />
    </Routes>
    </div>
    </div>
    </Router>
    )
}


export default Todo