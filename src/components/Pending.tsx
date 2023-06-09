import React from 'react'
interface AllProps {
  arr: Array<{ id: number; status: boolean; description: string }>;
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  arrPending: number[];
}
export default function Pending({ arr, buttonText, setButtonText, arrPending }: AllProps) {
  return (
    <>
      <div className='flex flex-col '>
        {
          arr.map((i) => (
            <div key={i.id}>
              {
                i.status===false ? <div> 
                <label className="flex items-center space-x-2 ml-5 my-4"> <input type="checkbox" className="" onChange={(e) => { 
                      if (e.target.checked)  {arrPending.push(i.id); } 
                      else {arrPending.splice(arrPending.indexOf(i.id), 1); } 
                      arrPending.length > 0 ? setButtonText("Mark Complete") : setButtonText("Clear All") }} />
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
