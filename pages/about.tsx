import { Box, Typography } from "@mui/material";

const About = () => {
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
        <Typography variant={"caption"}>About us</Typography>
        <Typography variant={"h4"} mt={2} mb={1}>
          Built by adventurers, for adventurers.
        </Typography>
        <Typography variant={"subtitle1"}>In a country where 80% of its landmass is mountainous, our mission is to provide a platform for both new and experienced hikers in Japan.</Typography>
      </Box>
      <Box bgcolor={"lightgray"}>
        <Typography>Our Team</Typography>
      </Box>
    </>
  );
};

export default About;
