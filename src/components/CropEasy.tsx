import { DialogContent, DialogActions,Box,Typography, Slider, Button } from '@material-ui/core'
import CropIcon from '@mui/icons-material/Crop'
import Delete from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import Cropper,{Area} from 'react-easy-crop'
import getCroppedImg from './cropImage'

const CropEasy = ({photoURl,setOpenCrop,setPhotoURL,setFile}:({ photoURl:  string; setOpenCrop: React.Dispatch<React.SetStateAction<boolean>>; setPhotoURL: React.Dispatch<React.SetStateAction<string | null>>; setFile: React.Dispatch<React.SetStateAction<File | null>>; })) => {
    const [crop,setCrop]=useState({x:0,y:0});
    const [zoom,setZoom]=useState(1);
    const [rotation,setRotation]=useState(0);
    const [croppedAreaPixels,setCroppedAreaPixels]=useState<Area | null>(null);


    const cropComplete = (croppedArea:Area , croppedAreaPixels:Area)=> (
        setCroppedAreaPixels(croppedAreaPixels)
    )

    const cropImage = async () => {
        try {
            if(croppedAreaPixels!== null && photoURl !== null) {const url = await getCroppedImg(photoURl, croppedAreaPixels, rotation);
            setPhotoURL(url);
            setOpenCrop(false);}
        } catch (error) {
            console.log(error);
        }
    };


    const zoomPercent = (value: number): string => {
        return `${Math.round(value * 100)}%`;
    };
    return (
    <>
    <DialogContent dividers className='bg-black-100 relative h-[300px]  w-auto'>

    <Cropper 
    image={photoURl}
    crop={crop}
    zoom={zoom}
    rotation = {rotation}
    aspect={16/9}
    onZoomChange={setZoom}
    onRotationChange = {setRotation}
    onCropChange = {setCrop}
    onCropComplete = {cropComplete}
    />
    </DialogContent>
    <DialogActions className="flex-col flex mx-3 my-2">
        <Box className="w-full mb-1 ">
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom as number)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + '°'}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation as number)}
            />
          </Box>
        </Box>
        <Box className=" flex space-x-2 flex-wrap " >
          <Button
            variant="outlined"
            startIcon={<Delete/>}
            onClick={() => (setPhotoURL(null), setOpenCrop(false))}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </>
  )
}

export default CropEasy


