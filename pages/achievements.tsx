import { Avatar, Box, Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
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

}


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
            <div className={styles.txt_wrapper}>
                <Typography variant="h3" className={styles.achievements_title}>
                    Your Achievements
                </Typography>
                <Card variant = "outlined" sx={{
                    // maxWidth: 300
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
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Registered"
                                    src={userBadges.includes("A New Beginning")? badgeDict["A New Beginning"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="A New Beginning" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Registered"
                                    src={userBadges.includes("A New Beginning")? badgeDict["A New Beginning"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="First Steps" /> 
                            </Box>
                        
                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
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
                    // maxWidth: 300
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
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="One hike completed"
                                    src={userBadges.includes("1st Hike")? badgeDict["1st Hike"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="1st Hike" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Two hikes in a row"
                                    src={userBadges.includes("Power of Two")? badgeDict["Power of Two"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="Power of Two" /> 
                            </Box>
                        
                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="A streak of 3 hikes"
                                    src={userBadges.includes("Hat-trick")? badgeDict["Hat-trick"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="Hat-trick" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
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
                    // maxWidth: 300
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
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Hiked 3 KM"
                                    src={userBadges.includes("3 KM")? badgeDict["3 KM"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="3 KM" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Hiked 5 KM"
                                    src={userBadges.includes("5 KM")? badgeDict["5 KM"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="5 KM" /> 
                            </Box>
                        
                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Hiked 7 KM"
                                    src={userBadges.includes("7 KM")? badgeDict["7 KM"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="7 KM" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Hiked 10 KM"
                                    src={userBadges.includes("10 KM")? badgeDict["10 KM"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="10 KM" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Hiked 15 KM"
                                    src={userBadges.includes("15 KM")? badgeDict["15 KM"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="15 KM" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Hiked 20 KM"
                                    src={userBadges.includes("20 KM")? badgeDict["20 KM"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="20 KM" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                                >
                                <Avatar
                                    alt="Hiked 30 KM"
                                    src={userBadges.includes("30 KM")? badgeDict["30 KM"] : badgeDict["Incomplete"]}
                                    sx={{ width: 84, height: 84 , margin: 0}}
                                />
                                <Chip label="30 KM" /> 
                            </Box>

                            <Box
                                sx={{display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
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

        </>
        
    );
}

export default Achievements;