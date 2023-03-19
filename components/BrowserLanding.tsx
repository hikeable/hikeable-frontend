import Image from "next/image";
import Link from "next/link";
import { BrowserView, MobileView } from "react-device-detect";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import styles from "../styles/landing.module.css";
import { LandingLogo } from ".";
import LandingList from "./LandingList";

const Theme = createTheme({
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
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

export const Landing = () => {
  return (
    <>
      <div className={styles.landing__background}>
        <Image
          src="/img/landing.avif"
          alt="Background Image of Mt. Fuji and shrine"
          fill
          style={{
            objectPosition: "top",
            filter: "brightness(75%)",
          }}
        />
      </div>
      <div className={styles.logo__wrapper}>
        <LandingLogo />
      </div>
      <Box
        sx={{
          width: "50vw",
          height: "50svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "10px solid red",
        }}
      >
        <Box
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "end",
            zIndex: 1,
          }}
        >
          <BrowserView>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Montserrat",
                color: "whitesmoke",
                fontSize: "5vh",
                fontWeight: 600,
              }}
              zIndex="2"
            >
              Hiking in Japan.
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Montserrat",
                color: "whitesmoke",
                fontSize: "5vh",
                fontWeight: 600,
              }}
              zIndex="2"
            >
              Simplified.
            </Typography>
          </BrowserView>
          <MobileView>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Montserrat",
                color: "#5e7119",
                fontSize: "2rem",
                fontWeight: 600,
                mt: 3,
              }}
            >
              Hiking in Japan.
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "Montserrat",
                color: "#5e7119",
                fontSize: "2rem",
                fontWeight: 600,
              }}
              zIndex="2"
            >
              Simplified.
            </Typography>
          </MobileView>
          <LandingList />
        </Box>
      </Box>

      <div className={styles.btn__wrapper}>
        <ThemeProvider theme={Theme}>
          <StyledButton variant="text">
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
