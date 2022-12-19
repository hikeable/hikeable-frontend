import { Avatar, Box, Card, CardContent, CardHeader, Chip, createTheme, ThemeProvider, Typography } from "@mui/material";
import axios, { Axios, AxiosError } from "axios";
import Image from 'next/image'
import styles from "../styles/achievements.module.css"
// import styles from "../styles/achievements.module.css";
import { useAuthContext } from "../components/context/UseAuthContext";
import { useEffect, useState } from "react";

const badgeDict = {
    "Incomplete": "/badges/Incomplete.png",
    "A New Beginning": "/badges/A New Beginning.png",

    "First Base":"/badges/First Base.png",
    "Power Of Two":"/badges/PowerOfTwo.png",
    "Hat-trick": "/badges/Hat-trick.png",

    "50 KM": "/badges/50 KM.png", 
    "30 KM": "/badges/30 KM.png", 
    "20 KM": "/badges/20 KM.png", 
    "15 KM": "/badges/15 KM.png", 
    "10 KM": "/badges/10 KM.png", 
    "7 KM": "/badges/7 KM.png", 
    "5 KM": "/badges/5 KM.png", 
    "3 KM": "/badges/3 KM.png", 

    "Master": "/badges/Master.png",
    "Mentor": "/badges/Mentor.png",
    "Assistant": "/badges/Assistant.png",
    "Apprentice": "/badges/Apprentice.png",
    "Team Player": "/badges/Team Player.png",

    "Helpful": "/badges/Helpful.png",
    "Well Rounded": "/badges/Well Rounded.png",
    "Excellent Feedback": "/badges/Excellent Feedback.png",
    "MVP": "/badges/MVP.png",
}

const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
    },
  });


const Achievements = () => {

    const {user, userId} = useAuthContext();

    const [userBadges, setBadges] = useState<string[]>([])
    const [loadBadges, setLoadBadges] = useState<Boolean>(false);

    useEffect(() => {
        console.log(userId);
        getBadges(userId)
    }, [userId]);

    
    const getBadges = async (user: number | undefined) => {

        const url = `https://hikeable-backend.herokuapp.com/api/users/${user}/badges`;
        
            await axios.get(url)
                .then((response) => {
                    const badges = response.data.map((entry) => entry.badges);
                    setBadges(badges);

                })
                .catch ((e: Error | AxiosError) => {
                    if (axios.isAxiosError(e) && e.response && e.response.status === 404)
                    console.log('This user has no badges')
                })
    }

    return (
        <>
            <ThemeProvider theme={theme}>

                <div className={styles.txt_wrapper}>
                    <Typography variant="h3" className={styles.achievements_title}>
                        Your Achievements
                    </Typography>
                    <Card variant = "outlined" sx={{
                        margin: '10px'
                    }}>
                        <CardContent className={styles.achievement_card}>
                            <Typography variant="h4" className={styles.section_titles}>
                                Getting Started
                            </Typography>
                            <Box className= {styles.badges_section} 
                            sx={{ 
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center"
                            }}>
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Registered"
                                        src={userBadges.includes("A New Beginning")? badgeDict["A New Beginning"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="A New Beginning" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Registered"
                                        src={userBadges.includes("A New Beginnings")? badgeDict["A New Beginnings"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="First Steps" /> 
                                </Box>
                            
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Registered"
                                        src={userBadges.includes("On a roll")? badgeDict["On a roll"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="On a roll" /> 
                                </Box>
                            </Box>

                        </CardContent>


                    </Card>

                    <Card variant = "outlined" sx={{
                        margin: '10px'
                    }}>
                        <CardContent className={styles.achievement_card}>
                            <Typography variant="h4" className={styles.section_titles}>
                                Streaks
                            </Typography>
                            <Box className= {styles.badges_section} 
                            sx={{ 
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center"
                            }}>
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="One hike completed"
                                        src={userBadges.includes("First Base")? badgeDict["First Base"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="First Base" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Two hikes in a row"
                                        src={userBadges.includes("Power of Two")? badgeDict["Power of Two"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Power of Two" /> 
                                </Box>
                            
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="A streak of 3 hikes"
                                        src={userBadges.includes("Hat-trick")? badgeDict["Hat-trick"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Hat-trick" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="A streak of 7 hikes"
                                        src={userBadges.includes("Lucky Number 7")? badgeDict["Lucky Number 7"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Lucky Number 7" /> 
                                </Box>
                            </Box>

                        </CardContent>
                    </Card>

                    <Card variant = "outlined" sx={{
                        margin: '10px'
                    }}>
                        <CardContent className={styles.achievement_card}>
                            <Typography variant="h4" className={styles.section_titles}>
                                Distance
                            </Typography>
                            <Box className= {styles.badges_section} 
                            sx={{ 
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center"
                            }}>
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 3 KM"
                                        src={userBadges.includes("3 KM")? badgeDict["3 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="3 KM" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 5 KM"
                                        src={userBadges.includes("5 KM")? badgeDict["5 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="5 KM" /> 
                                </Box>
                            
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 7 KM"
                                        src={userBadges.includes("7 KM")? badgeDict["7 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="7 KM" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 10 KM"
                                        src={userBadges.includes("10 KM")? badgeDict["10 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="10 KM" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 15 KM"
                                        src={userBadges.includes("15 KM")? badgeDict["15 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="15 KM" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 20 KM"
                                        src={userBadges.includes("20 KM")? badgeDict["20 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="20 KM" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 30 KM"
                                        src={userBadges.includes("30 KM")? badgeDict["30 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="30 KM" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Hiked 50 KM"
                                        src={userBadges.includes("50 KM")? badgeDict["50 KM"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="50 KM" /> 
                                </Box>
                            </Box>

                        </CardContent>
                    </Card>

                    <Card variant = "outlined" sx={{
                        margin: '10px'
                    }}>
                        <CardContent className={styles.achievement_card}>
                            <Typography variant="h4" className={styles.section_titles}>
                                Participation
                            </Typography>
                            <Box className= {styles.badges_section} 
                            sx={{ 
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center"
                            }}>
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Team Player Badge"
                                        src={userBadges.includes("Team Player")? badgeDict["Team Player"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Team Player" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="The Assistant Badge"
                                        src={userBadges.includes("Assistant")? badgeDict["Assistant"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="The Assistant" /> 
                                </Box>
                            
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="The Apprentice Badge"
                                        src={userBadges.includes("Apprentice")? badgeDict["Apprentice"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="The Apprentice" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="The Mentor Badge"
                                        src={userBadges.includes("Mentor")? badgeDict["Mentor"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Mentor" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="The Master Badge"
                                        src={userBadges.includes("Master")? badgeDict["Master"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Master" /> 
                                </Box>
                            </Box>

                        </CardContent>
                    </Card>

                    <Card variant = "outlined" sx={{
                        margin: '10px'
                    }}>
                        <CardContent className={styles.achievement_card}>
                            <Typography variant="h4" className={styles.section_titles}>
                                Usefulness to Others
                            </Typography>
                            <Box className= {styles.badges_section} 
                            sx={{ 
                                display: "flex",
                                flexDirection: 'column',
                                alignItems: "center"
                            }}>
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Helpful Badge"
                                        src={userBadges.includes("Helpful")? badgeDict["Helpful"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Helpful" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Well Rounded Badge"
                                        src={userBadges.includes("Well Rounded")? badgeDict["Well Rounded"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Well Rounded" /> 
                                </Box>

                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="Excellent Feedback Badge"
                                        src={userBadges.includes("Excellent Feedback")? badgeDict["Excellent Feedback"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="Excellent Feedback" /> 
                                </Box>
                            
                                <Box
                                    sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: '10px'}}
                                    >
                                    <Avatar
                                        alt="The MVP Badge"
                                        src={userBadges.includes("MVP")? badgeDict["MVP"] : badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 , margin: 0}}
                                    />
                                    <Chip label="MVP" /> 
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

        </>
        
    );
}

export default Achievements;