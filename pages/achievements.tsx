import { Avatar, Box, Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import axios from "axios";
import Image from 'next/image'
import styles from "../styles/achievements.module.css"
// import styles from "../styles/achievements.module.css";
import { useAuthContext } from "../components/context/UseAuthContext";

const badgeDict = {
    "Incomplete": "/badges/Incomplete.png",
    "First Base":"/badges/First Base.png",
    "Power Of Two":"/badges/PowerOfTwo.png",

    


}


const Achievements = () => {

    const {user, userId} = useAuthContext();
    
    
    const getBadges = async () => {

        const url = `https://hikeable-backend.herokuapp.com/api/${user}/badges`;
        await axios.get(url).then((response) => {
            
        })
    }

    return (
        <>
            <div className={styles.txt_wrapper}>
                <Typography variant="h1" className={styles.achivements_title}>
                    Your Achievements
                </Typography>
                <Card variant = "outlined" sx={{
                    // maxWidth: 300
                }}>
                    <CardContent>
                        <Typography variant="h2" className={styles.section_titles}>
                            Getting Started
                        </Typography>
                        <Box sx={{ 
                            display: "flex",
                            flexDirection: 'row',
                        }}>
                         <Avatar
                            alt="Registered"
                            src={badgeDict["Incomplete"]}
                            sx={{ width: 56, height: 56 }}
                            />

                         <Avatar
                            alt="Registered"
                            src={badgeDict["Incomplete"]}
                            sx={{ width: 56, height: 56 }}
                            />
                            <CardHeader 
                                sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
                                avatar={
                                    <Avatar
                                        alt="Registered"
                                        src={badgeDict["Incomplete"]}
                                        sx={{ width: 84, height: 84 }}
                                    />

                                }
                                subheader={<Chip label="A New Beginning" /> }
                            
                            />

                        
 
                        </Box>


                    </CardContent>


                </Card>



                <Typography variant="h2" className={styles.section_titles}>
                    Distance
                </Typography>
            

                <Image
                    src= {badgeDict["First Base"]}
                    alt="First Award"
                    width={200}
                    height={200}
                />
            
            </div>

        </>
        
    );
}

export default Achievements;