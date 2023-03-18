import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FilterHdrRoundedIcon from "@mui/icons-material/FilterHdrRounded";

const textList = [
  "Community-based platform for English-speaker in Japan",
  "Find trails in each prefecture",
  "Interact with geolocated messages left by other users",
];

function generate(phrases: string[]) {
  return phrases.map((phrase) => (
    <ListItem>
      <ListItemIcon>
        <FilterHdrRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={phrase} />
    </ListItem>
  ));
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function LandingList() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            What you can do with Hikeable
          </Typography>
          <Demo>
            <List>{generate(textList)}</List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
