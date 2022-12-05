import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';



// export interface trailData {
//     id: number;
//     name: string;
//     prefecture: string;
//     latitude: number;
//     longitude: number;
//     difficulty: number;
//     photo_url: string;
//     map_url: string;

// }



  


export interface trailData {

    trail: {
        id: number,
        name: string,
        prefecture: string;
        latitude: string;
        longitude: string;
        length: string;
        difficulty: number;
        photo_url: string;
        map_url: string;
    }[]

}



export const Filter : React.FC<trailData> = (trail) => {

    

    


    return (

        <>

        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Difficulty</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
            </RadioGroup>
        </FormControl>

        <Box width={300}>
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </Box>

       

        

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
            }}
         ></Box>
         <TextField
            helperText="Select a Location"
            id="demo-helper-text-aligned"
            label="Location"
        />


        <div>
            Enter
        </div></>
    );
}
