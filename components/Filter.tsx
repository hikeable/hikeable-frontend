import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, List, ListItem } from '@mui/material';


function valuetext(value: number) {
    return `${value} KM`;
  }


function startFilter<trailProps>(trailArray : trailData[], lengthVal? : number [], difficultyVal? : string, locationVal? : string) {
    console.log("🌏 ",trailArray)
    const retTrails = trailArray.filter(isRequested);
  
    function isRequested (trail : trailData) {

      return ( 
            (!locationVal ||  trail.name.toLowerCase().includes(locationVal.toLowerCase())) &&
            (!lengthVal || parseInt(trail.length) >= lengthVal[0] && parseInt(trail.length) <= lengthVal[1]) &&
            (!difficultyVal || parseInt(difficultyVal) === trail.difficulty)          
        )
    }      
    console.log(retTrails);
}

interface trailData {

    id: number,
    name: string,
    prefecture: string;
    latitude: string;
    longitude: string;
    length: string;
    difficulty: number;
    photo_url: string;
    map_url: string;

}

export interface trailProps {
     
     trails: trailData[]
   
}

export const Filter : React.FC<trailProps> = ({trails}:trailProps) => {
    
    const [lengthVal, setLength] = React.useState<number[]>([1, 20]);
    const [difficultyVal, setDifficulty] = React.useState<string>("");
    const [locationVal, setLocation] = React.useState<string>("");
    
    const handleLenChange = (event: Event, newValue: number | number[]) => {
        setLength(newValue as number[]);
      };
    const handleDiffChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDifficulty(event.target.value as string);
    };
    const handleLocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value as string);
    };

    const commonStyles = {
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '5rem',
        height: '5rem',
      };
    


    return (


        <>



    {/* <RadioGroup aria-label="Difficulty levels" name="radio-buttons-group" defaultValue="Easy">
        <List
            sx={{
            minWidth: 240,
            '--List-gap': '0.5rem',
            '--List-item-paddingY': '1rem',
            '--List-item-radius': '8px',
            '--List-decorator-size': '32px',
            }}
        >
            {['Easy', 'Moderate', 'Hard'].map((item, index) => (
            <ListItem
                variant="outlined"
                key={item}
                sx={{ boxShadow: 'sm', bgcolor: 'background.body' }}
            >
                <ListItemDecorator>
                {[index]}
                </ListItemDecorator>
                <Radio
                    overlay
                    value={index + 1}
                    label={item}
                    sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                    componentsProps={{
                        action: ({ checked }) => ({
                        sx: (theme) => ({
                            ...(checked && {
                            inset: -1,
                            border: '2px solid',
                            borderColor: theme.vars.palette.primary[500],
                            }),
                        }),
                        }),
                    }}
                />
            </ListItem>
            ))}
        </List>
        </RadioGroup> */}

            <Typography
              fontSize="xs2"
              textTransform="uppercase"
              letterSpacing="md"
              fontWeight="lg"
            >
              Filter by
            </Typography>

        <TextField
            helperText="Select a Trail"
            id="demo-helper-text-aligned"
            label="Trail"
            onChange={handleLocChange}
        />

        <Divider />



        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Difficulty</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Easy"
                name="radio-buttons-group"
                onChange={handleDiffChange}
            >
                <FormControlLabel value="1" control={<Radio />} label="Easy" />
                <FormControlLabel value="2" control={<Radio />} label="Moderate" />
                <FormControlLabel value="3" control={<Radio />} label="Hard" />
            </RadioGroup>
        </FormControl>

        <Divider />



        <Typography id="length-slider" gutterBottom>
            Length
        </Typography>
        <Box width= {300} id = "length-slider"> 
            <Slider 
                getAriaLabel={() => 'Length'}
                valueLabelFormat = {(value) => `${value} km`}
                defaultValue={30} 
                value={lengthVal}
                onChange={handleLenChange}
                aria-label="Default" 
                valueLabelDisplay="auto" 
                getAriaValueText={valuetext}
                min={0.0} 
                max={50.0}
            />
        </Box>

        <Divider />

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 },
            }}
         ></Box>
         

        <Button variant="contained" onClick={() => startFilter(trails, lengthVal, difficultyVal, locationVal )}>Filter</Button>

        <div>
            Enter
        </div></>
    );
}