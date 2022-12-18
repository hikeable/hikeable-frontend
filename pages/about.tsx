import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";
import * as React from "react";

const About = () => {
  const staffCardInfo = [
    {
      name: "Cris",
      title: "Product Owner",
    },
    {
      name: "Kamil",
      title: "Tech Lead",
    },
    {
      name: "Haruna",
      title: "Full-Stack Engineer",
    },
    {
      name: "Chad",
      title: "Full-Stack Engineer",
    },
  ];

  return (
    <>
      <Box
        sx={{ width: "100vw", height: "40vh", minHeight: "300px" }}
        bgcolor={"white"}
        marginLeft={"auto"}
        marginRight={"auto"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="caption">About us</Typography>
        <Typography variant="h4" my={2}>
          Built by adventurers, for adventurers.
        </Typography>
        <Typography variant="subtitle1">
          In a country where 80% of its landmass is mountainous, our mission is
          to provide a platform for both new and experienced hikers in Japan.
        </Typography>
      </Box>
      <Box
        p={4}
        bgcolor={"white"}
        marginLeft={"auto"}
        marginRight={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="subtitle2">Hikeable was built using:</Typography>
        <Box></Box>
      </Box>
      <Box bgcolor={"lightgray"}>
        <Typography variant="h4">Our Team</Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {staffCardInfo.map((staff) => (
            <Grid item xs={3}>
              <Card variant="outlined">{staff.name}</Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default About;
