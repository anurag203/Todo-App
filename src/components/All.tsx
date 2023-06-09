import React from 'react'
interface AllProps {
    arr: Array<{ id: number; status: boolean; description: string }>;
    buttonText: string;
    setButtonText: React.Dispatch<React.SetStateAction<string>>;
    arrAll: number[];
}
export default function All({ arr, buttonText, setButtonText, arrAll }: AllProps) {
    return (
        <>
            <div className='flex flex-col '>
                {
                    arr.map((i) => (
                        <div key={i.id}>
                            <label className="flex items-center space-x-2 ml-5 my-4">
                                <input type="checkbox" className="" onChange={(e) => { 
                                if (e.target.checked)  {arrAll.push(i.id); } 
                                else {arrAll.splice(arrAll.indexOf(i.id), 1); } 
                                arrAll.length > 0 ? setButtonText("Clear ( " + arrAll.length + " )") : setButtonText("Clear All") }}/>
                                {i.status === true ? <span className='line-through'>{i.description}</span> : <span>{i.description}</span>}
                            </label>
                            {i !== arr[arr.length - 1] ? <hr className="mt-4 border mx-4" /> : <hr className='mt-4 border' />}
                        </div>
                    ))
                }
            </div>
        </>
    )
}
