import * as React from "react";
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
        <FilterHdrRoundedIcon sx={{ color: "whitesmoke" }} />
      </ListItemIcon>
      <ListItemText
        primary={phrase}
        primaryTypographyProps={{
          color: "whitesmoke",
          fontFamily: "Montserrat",
          fontSize: "1.2rem",
          fontWeight: 500,
        }}
      />
    </ListItem>
  ));
}

export default function LandingList() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography
          sx={{ mt: 4, mb: 2, color: "whitesmoke", fontFamily: "Montserrat" }}
          variant="h4"
          component="div"
        >
          What you can do with Hikeable
        </Typography>
        <List>{generate(textList)}</List>
      </Grid>
    </Box>
  );
}
