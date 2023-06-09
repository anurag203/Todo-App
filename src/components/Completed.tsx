import React from 'react'
interface AllProps {
  arr: Array<{ id: number; status: boolean; description: string }>;
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  arrCompleted: number[];
}
export default function Completed({ arr, buttonText, setButtonText, arrCompleted }: AllProps) {
  return (
    <>
      <div className='flex flex-col '>
        {
          arr.map((i) => (
            <div key={i.id}>
              {
                i.status===true ? <div> 
                <label className="flex items-center space-x-2 ml-5 my-4"> <input type="checkbox"  className="" onChange={(e) => { 
                      if (e.target.checked)  {arrCompleted.push(i.id); } 
                      else {arrCompleted.splice(arrCompleted.indexOf(i.id), 1); } 
                      arrCompleted.length > 0 ? setButtonText("Mark Pending") : setButtonText("Clear All") }} />
                <span >{i.description}</span>
                </label> 
                {i !== arr[arr.length - 1] ? <hr className="mt-4 border mx-4" />:<hr className='mt-4 border'/> } 
                </div>
                : <span></span>
              }
            </div>
          ))
        }
      </div>
    </>
  )
}
