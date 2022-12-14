import axios from "axios";
import { useAuthContext } from "../components/context/UseAuthContext";

const badgeDict = {
    "First Base":"/First Base.png"

}


const Achievements = () => {

    const {user, userId} = useAuthContext();
    
    
    const getBadges = async () => {

        const url = `https://hikeable-backend.herokuapp.com/api/${user}/badges`;
        await axios.get(url).then((response) => {
            
        })
    }

    return (
        <><div>
            Your Achievements
        </div>
        <Image
            src= "/First Base.png"
            // {badgeDict["First Base"]}
            alt="First award"
            fill
        ></Image></>
        
    );
}

export default Achievements;