import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  createTheme,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";

import axios, { AxiosError } from "axios";
import styles from "../styles/achievements.module.css";

import { useAuthContext } from "../components/context/UseAuthContext";
import { useEffect, useState } from "react";

import { TBadges } from "../global";

const badgeDict = {
  Incomplete: "/badges/Incomplete.png",
  "A New Beginning": "/badges/A New Beginning.png",

  "First Base": "/badges/First Base.png",
  "Power Of Two": "/badges/PowerOfTwo.png",
  "Hat-trick": "/badges/Hat-trick.png",

  "50 KM": "/badges/50 KM.png",
  "30 KM": "/badges/30 KM.png",
  "20 KM": "/badges/20 KM.png",
  "15 KM": "/badges/15 KM.png",
  "10 KM": "/badges/10 KM.png",
  "7 KM": "/badges/7 KM.png",
  "5 KM": "/badges/5 KM.png",
  "3 KM": "/badges/3 KM.png",

  Master: "/badges/Master.png",
  Mentor: "/badges/Mentor.png",
  Assistant: "/badges/Assistant.png",
  Apprentice: "/badges/Apprentice.png",
  "Team Player": "/badges/Team Player.png",

  Helpful: "/badges/Helpful.png",
  "Well Rounded": "/badges/Well Rounded.png",
  "Excellent Feedback": "/badges/Excellent Feedback.png",
  MVP: "/badges/MVP.png",
};

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const Achievements = () => {
  const { userId } = useAuthContext();

  const [userBadges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    getBadges(userId);
  }, [userId]);

  const getBadges = async (user: number | undefined) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${user}/badges`;

    await axios
      .get(url)
      .then((response) => {
        const badges = response.data.map((entry: TBadges) => entry.badges);
        setBadges(badges);
      })
      .catch((e: Error | AxiosError) => {
        if (axios.isAxiosError(e) && e.response && e.response.status === 404)
          console.error("This user has no badges");
      });
  };

  return (
    <>
      <Container sx={{ display: "flex", padding: 0 }}>
        <ThemeProvider theme={theme}>
          <div className={styles.txt_wrapper}>
            <Typography
              variant="h3"
              className={styles.achievements_title}
              sx={{ paddingTop: "1rem" }}
            >
              Your Achievements
            </Typography>

            <Card
              variant="outlined"
              sx={{
                margin: "10px",
                borderRadius: "1rem",
              }}
            >
              <CardContent className={styles.achievement_card}>
                <Typography variant="h4" className={styles.section_titles}>
                  Getting Started
                </Typography>
                <Box
                  className={styles.badges_section}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box className={styles.individual_badge}>
                    <Tooltip title="Register as a user">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Registered"
                          src={
                            userBadges.includes("A New Beginning")
                              ? badgeDict["A New Beginning"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="A New Beginning" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Setup your hiking goals">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Registered"
                          src={
                            userBadges.includes("A New Beginning")
                              ? badgeDict["A New Beginning"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="First Steps" />
                      </Box>
                    </Tooltip>
                  </Box>

                  {/* <Box className={styles.individual_badge}>
                    <Tooltip title="Connect with other users">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Registered"
                          src={
                            userBadges.includes("On a roll")
                              ? badgeDict["On a roll"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="On a roll" />
                      </Box>
                    </Tooltip>
                  </Box> */}
                </Box>
              </CardContent>
            </Card>

            <Card
              className={styles.achievement_card}
              variant="outlined"
              sx={{
                margin: "10px",
                borderRadius: "1rem",
              }}
            >
              
              <Typography variant="h4" className={styles.section_titles}>
                Streaks
              </Typography>
              <Box
                className={styles.badges_section}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box className={styles.individual_badge}>
                  <Tooltip title="Complete your first hike">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    >
                      <Avatar
                        alt="One hike completed"
                        src={
                          userBadges.includes("First Base")
                            ? badgeDict["First Base"]
                            : badgeDict["Incomplete"]
                        }
                        sx={{ width: 92, height: 92, margin: 0 }}
                      />
                      <Chip label="First Base" />
                    </Box>
                  </Tooltip>
                </Box>

                <Box className={styles.individual_badge}>
                  <Tooltip title="Complete your second hike">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    >
                      <Avatar
                        alt="Two hikes in a row"
                        src={
                          userBadges.includes("Power Of Two")
                            ? badgeDict["Power Of Two"]
                            : badgeDict["Incomplete"]
                        }
                        sx={{ width: 92, height: 92, margin: 0 }}
                      />
                      <Chip label="Power of Two" />
                    </Box>
                  </Tooltip>
                </Box>

                <Box className={styles.individual_badge}>
                  <Tooltip title="Complete your third hike">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    >
                      <Avatar
                        alt="A streak of 3 hikes"
                        src={
                          userBadges.includes("Hat-trick")
                            ? badgeDict["Hat-trick"]
                            : badgeDict["Incomplete"]
                        }
                        sx={{ width: 92, height: 92, margin: 0 }}
                      />
                      <Chip label="Hat-trick" />
                    </Box>
                  </Tooltip>
                </Box>

                {/* <Box className={styles.individual_badge}>
                  <Tooltip title="Complete your seventh hike">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "10px",
                      }}
                    >
                      <Avatar
                        alt="A streak of 7 hikes"
                        src={
                          userBadges.includes("Lucky Number 7")
                            ? badgeDict["Lucky Number 7"]
                            : badgeDict["Incomplete"]
                        }
                        sx={{ width: 92, height: 92, margin: 0 }}
                      />
                      <Chip label="Lucky Number 7" />
                    </Box>
                  </Tooltip>
                </Box> */}
              </Box>

              
            </Card>

            <Card
              variant="outlined"
              sx={{
                margin: "10px",
                borderRadius: "1rem",
              }}
            >
              <CardContent className={styles.achievement_card}>
                <Typography variant="h4" className={styles.section_titles}>
                  Distance
                </Typography>
                <Box
                  className={styles.badges_section}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 3 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 3 KM"
                          src={
                            userBadges.includes("3 KM")
                              ? badgeDict["3 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="3 KM" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 5 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 5 KM"
                          src={
                            userBadges.includes("5 KM")
                              ? badgeDict["5 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="5 KM" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 7 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 7 KM"
                          src={
                            userBadges.includes("7 KM")
                              ? badgeDict["7 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="7 KM" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 10 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 10 KM"
                          src={
                            userBadges.includes("10 KM")
                              ? badgeDict["10 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="10 KM" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 15 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 15 KM"
                          src={
                            userBadges.includes("15 KM")
                              ? badgeDict["15 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="15 KM" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 20 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 20 KM"
                          src={
                            userBadges.includes("20 KM")
                              ? badgeDict["20 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="20 KM" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 30 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 30 KM"
                          src={
                            userBadges.includes("30 KM")
                              ? badgeDict["30 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="30 KM" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Hike a total of 50 KM">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Hiked 50 KM"
                          src={
                            userBadges.includes("50 KM")
                              ? badgeDict["50 KM"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="50 KM" />
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              sx={{
                margin: "10px",
                borderRadius: "1rem",
              }}
            >
              <CardContent className={styles.achievement_card}>
                <Typography variant="h4" className={styles.section_titles}>
                  Participation
                </Typography>
                <Box
                  className={styles.badges_section}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box className={styles.individual_badge}>
                    <Tooltip title="Write a message on a trail">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="Team Player Badge"
                          src={
                            userBadges.includes("Team Player")
                              ? badgeDict["Team Player"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="Team Player" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Write 10 messages on trails">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="The Assistant Badge"
                          src={
                            userBadges.includes("Assistant")
                              ? badgeDict["Assistant"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="The Assistant" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Write 20 messages on trails">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                        }}
                      >
                        <Avatar
                          alt="The Apprentice Badge"
                          src={
                            userBadges.includes("Apprentice")
                              ? badgeDict["Apprentice"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="The Apprentice" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Write 30 messages on trails">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="The Mentor Badge"
                          src={
                            userBadges.includes("Mentor")
                              ? badgeDict["Mentor"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="Mentor" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Write 50 messages on trails">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                          flexBasis: "21%",
                        }}
                      >
                        <Avatar
                          alt="The Master Badge"
                          src={
                            userBadges.includes("Master")
                              ? badgeDict["Master"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="Master" />
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card
              variant="outlined"
              sx={{
                margin: "10px",
                borderRadius: "1rem",
              }}
            >
              <CardContent className={styles.achievement_card}>
                <Typography variant="h4" className={styles.section_titles}>
                  Usefulness to Others
                </Typography>
                <Box
                  className={styles.badges_section}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box className={styles.individual_badge}>
                    <Tooltip title="Your message is liked by one person">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                        }}
                      >
                        <Avatar
                          alt="Helpful Badge"
                          src={
                            userBadges.includes("Helpful")
                              ? badgeDict["Helpful"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="Helpful" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Your message are liked by 10 people">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                        }}
                      >
                        <Avatar
                          alt="Well Rounded Badge"
                          src={
                            userBadges.includes("Well Rounded")
                              ? badgeDict["Well Rounded"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="Well Rounded" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Your messages are liked by 25 people">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                        }}
                      >
                        <Avatar
                          alt="Excellent Feedback Badge"
                          src={
                            userBadges.includes("Excellent Feedback")
                              ? badgeDict["Excellent Feedback"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="Excellent Feedback" />
                      </Box>
                    </Tooltip>
                  </Box>

                  <Box className={styles.individual_badge}>
                    <Tooltip title="Your messages are liked by 50 people">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "10px",
                        }}
                      >
                        <Avatar
                          alt="The MVP Badge"
                          src={
                            userBadges.includes("MVP")
                              ? badgeDict["MVP"]
                              : badgeDict["Incomplete"]
                          }
                          sx={{ width: 92, height: 92, margin: 0 }}
                        />
                        <Chip label="MVP" />
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* <Typography variant="h2" className={styles.section_titles}>
                        Distance
                    </Typography>
                

                    <Image
                        src= {badgeDict["First Base"]}
                        alt="First Award"
                        width={200}
                        height={200}
                    /> */}
          </div>
        </ThemeProvider>
      </Container>
    </>
  );
};

export default Achievements;
