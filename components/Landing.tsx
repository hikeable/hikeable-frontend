import Image from "next/image";
import Link from "next/link";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { Logo } from "../components";
import styles from "../styles/landing.module.css";
import { Container, fontFamily } from "@mui/system";
import { Filter } from "@mui/icons-material";
import { sx } from "@mui/joy/styles/styleFunctionSx";
import zIndex from "@mui/material/styles/zIndex";
import { LAndingLogo } from "../components";

const Theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
    },
  },
});

const StyledButton = styled(Button)`
  ${({ theme }) => `
cursor: pointer;
transition: ${theme.transitions.create(["letter-spacing", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
&:hover {
  letter-spacing: ${1.1};
  transform: scale(1.08);
}
`}
`;

export const Landing = ({}) => {
  return (
    <>
      <div className={styles.logo__wrapper}>
        <LAndingLogo />
      </div>
      <div className={styles.landing__background}>
        <Image
          src="/david-edelstein-N4DbvTUDikw-unsplash.jpg"
          alt="Background Image of some people walking a trail"
          fill
          objectFit="cover"
          style={{ objectPosition: "top" }}
        />
      </div>
      
        <Box 
        sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "end",
              textAlign:"center",
              fontFamily: "Montserrat",
              zIndex:1,
              backgroundColor:"green"
              
            }} 
            // style={{ filter: 'blur(5px)'}}
            >
          <Typography variant="h1" fontFamily={"Monserrat"} zIndex="2" color={"whitesmoke"}>
            Hiking in Japan</Typography>
          <Typography variant="h1" fontFamily={"Monserrat"} zIndex="2" color={"whitesmoke"} >
            Simplified</Typography>
          
          
          
          
          {/* <div className={styles.txt__wrapper}>
            <h1 className={styles.landing__title}>Hiking in Japan</h1>
            <h1 className={styles.landing__title}>Simplified</h1>
          </div> */}
        </Box>
     
      <div className={styles.btn__wrapper}>
        <ThemeProvider theme={Theme}>
          <StyledButton variant="text" sx={{ mr: 2, ml: 1 }}>
            <Link
              className={`${styles.txt__btn} ${styles.btn__line}`}
              href="/prefectures"
            >
              Start Walking
            </Link>
          </StyledButton>
        </ThemeProvider>
      </div>
    </>
  );
};
