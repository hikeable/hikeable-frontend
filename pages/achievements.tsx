import { Typography } from "@mui/material";
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
            
                <Typography variant="h2" className={styles.section_titles}>
                    Getting Started
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