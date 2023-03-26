import Image from "next/image";
import Link from "next/link";
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

export const MobileLanding = () => {
  return (
    <>
      <Box sx={{ mt: 1.5, ml: 1.5 }}>
        <div className={styles.landing__background}>
          <Image
            src="/img/landing.avif"
            alt="Background Image of Mt. Fuji and shrine"
            fill
            style={{
              objectPosition: "top",
              filter: "brightness(65%)",
            }}
          />
        </div>
        <LandingLogo />
        <Box
          sx={{
            ml: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
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
      </Box>
    </>
  );
};
