import React, { ChangeEvent, useState, useRef } from 'react'
import CropEasy from './CropEasy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const CoverImage = () => {

    const [file, setFile] = useState<File | null>(null);
    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [openCrop, setOpenCrop] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null);


    const handleChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };


    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    return (
        <div>
            <div className="wrapper w-[720px] h-[360px] bg-green-900 rounded-2xl overflow-hidden relative">
                <div onClick={() => fileInput.current?.click()} className="drop_zone px-4 py-4 flex flex-col space-y-1 justify-end absolute z-10 top-0 right-0">
                    <span className="self-center bg-white-100 p-2 cursor-pointer rounded-full">  <EditIcon /> </span>
                    <input type="file" ref={fileInput} accept="image/*" hidden onChange={handleImageChange} />
                </div>
                <div className="px-4 py-4 flex flex-col space-y-1 justify-end absolute z-10 top-12 right-0">
                    <span onClick={()=>(setPhotoURL(null))} className="self-center bg-white-100 p-2 cursor-pointer rounded-full">  <DeleteIcon /> </span>
                </div>
                {photoURL && (
                    <img src={photoURL} alt="Selected" />
                )}
            </div>
            {
                (openCrop && photoURL!==null) ? 
                (
                    <div className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm">
                    <div className="bg-white-100 p-2 shadow-md rounded-lg "> <CropEasy photoURl={photoURL} setOpenCrop={setOpenCrop} setPhotoURL={setPhotoURL} setFile={setFile} /> </div> </div>
                )
                :
                (<div> </div>)
            }
        </div>
    )
}

export default CoverImage