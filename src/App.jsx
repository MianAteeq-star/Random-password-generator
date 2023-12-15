import { message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [charChecked,setCharChecked] = useState(false)
  const [numChecked,setNumChecked] = useState(false)
  const [password, setPassword] = useState("")


  const passwordRefrence = useRef()

  const passwordGenerator= useCallback(()=>{
     let total=""
let pass= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

if(numChecked){
  pass += "0123456789"
}
if(charChecked){
  pass +="!~@#$%^&*()_?><{}[]"
}
 
for (let i = 1; i <= length; i++) {
  let char = Math.floor(Math.random() * pass.length +1)
   total += pass.charAt(char)
  
}

setPassword(total)
  },[length,numChecked,charChecked,setPassword])


  useEffect(()=>{
passwordGenerator()
  },[length,numChecked,charChecked,passwordGenerator   ])

  const copyOnClipboard= useCallback(()=>{
passwordRefrence.current?.select()
    window.navigator.clipboard.writeText(password)

    message.success("Password Copy on clipBoard")
  },[password])
  

  return (
    <>
    <div className="flex justify-center items-center h-screen w-full">

      <div className=" text-center w-full max-w-md mx-auto bg-[#fb8500] p-5 rounded-3xl shadow-inner flex-wrap  ">
        <div className="text-4xl text-center">Password Generator</div>

        <div className="text-center flex justify-center m-7 overflow-hidden">
          <input
            type="text"
            placeholder="Password"
          value={password}
          ref={passwordRefrence}
            className="p-2 rounded outline-none w-full"
            readOnly
          />
          <button className="text-white bg-blue-700 p-2 rounded"  onClick={copyOnClipboard}>Copy</button>
        </div>
        <div className="text-center flex justify-center gap-x-5 flex-wrap">
          <div className="flex text-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {setLength(e.target.value)
              }}
            />
            <label> Length: {length} </label>
          </div>
          <div className=" flex ">
            <input
              type="checkbox"
              defaultChecked={charChecked}
              onChange={() => {
                setCharChecked((prev)=>!prev);
              }}
            />
            <label>Character</label>
          </div>
          <div className=" flex ">
            <input
              type="checkbox"
              defaultChecked={numChecked}
              onChange={() => {
               setNumChecked((prev)=>!prev) ;
              }}
            />
            <label>Number</label>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
