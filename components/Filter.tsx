import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, List, ListItem, Container } from "@mui/material";
import { Trail } from "../global";
import { Dispatch, SetStateAction } from "react";

function valuetext(value: number) {
  return `${value} KM`;
}

function startFilter<trailProps>(
  trailArray: Trail[],
  lengthVal?: number[],
  difficultyVal?: string,
  locationVal?: string,
  setTrail?: Dispatch<SetStateAction<[] | Trail[]>>
) {
  const retTrails = trailArray.filter(isRequested);

  function isRequested(trail: Trail) {
    return (
      (!locationVal ||
        trail.name.toLowerCase().includes(locationVal.toLowerCase())) &&
      (!lengthVal ||
        (trail.length >= lengthVal[0] && trail.length <= lengthVal[1])) &&
      (!difficultyVal || parseInt(difficultyVal) === trail.difficulty)
    );
  }
  console.log(retTrails);
  setTrail?.(retTrails);
}

export interface trailProps {
  trails: Trail[];
}

type filterProps = {
  trails: Trail[];
  setTrail?: Dispatch<SetStateAction<[] | Trail[]>>;
  trailSetter?: any;
};

export const Filter: React.FC<filterProps> = ({ trails, setTrail }) => {
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
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: 1,
    width: "5rem",
    height: "5rem",
  };

  return (
    <>
      <Container sx={{ backgroundColor: "white", borderRadius: 3, padding: 2 }}>
        <Typography
          fontSize="xs2"
          textTransform="capitalize"
          letterSpacing="md"
          fontWeight="lg"
          sx={{ mb: 1, fontWeight: 600 }}
        >
          Filter by
        </Typography>

        <TextField
          id="demo-helper-text-aligned"
          label="Trail Name"
          onChange={handleLocChange}
          sx={{ mb: 2 }}
        />

        <Divider />

        <FormControl sx={{ mt: 1, mb: 1 }}>
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

        <Typography
          id="length-slider"
          gutterBottom
          sx={{ mt: 1, color: "#00000099" }}
        >
          Length
        </Typography>
        <Box width={300} id="length-slider">
          <Slider
            getAriaLabel={() => "Length"}
            valueLabelFormat={(value) => `${value} km`}
            defaultValue={10}
            value={lengthVal}
            onChange={handleLenChange}
            aria-label="Default"
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0.0}
            max={30.0}
          />
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
            backgroundColor: "white",
          }}
        ></Box>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() =>
            startFilter(trails, lengthVal, difficultyVal, locationVal, setTrail)
          }
        >
          Filter
        </Button>
      </Container>
    </>
  );
};
