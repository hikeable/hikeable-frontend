import { Box, Button, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../components/context/UseAuthContext";
import { Trail, trailCompletionObject } from "../global";
import { NextLinkComposed } from "../src/Link";
import { getValues, returnUniqueObjects } from "../src/ObjectFunctions";
import styles from "../styles/dashboard.module.css"



type dummy = {

    "id": number,
    "name": string,
    "prefecture": string,
    "latitude": string,
    "longitude": string,
    "length": number,
    "difficulty": number,
    "photo_url": string,
    "map_url": string

}

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     height: 60,
//     maxWidth: '20rem',
//     minWidth: '15rem',
//     lineHeight: '60px',
//   }));


const Completedtrails = () => {

    const {user, userId} = useAuthContext()
    const [hiked, setHiked] = useState(0);
    const [completedTrails, setCompleted] = useState<trailCompletionObject[] >([]);
    const [usersCompletedTrails, setUsersCompletedTrails] = useState<Trail[] >([]);
    const [data, setData] = useState<{date: string, length: number}[]>([]);


    const getCompleted = async () => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/completions`;
        await axios.get(url).then( (response) => {
            const result = response.data.filter((completions) => completions.user === userId)  
            setCompleted(result); 
        });
   }

   const getTrails =  () => {
        
        return completedTrails.map( async (singleCompletedTrail) => {

            const response = await axios ({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/${singleCompletedTrail.trail_id}`
            })

            const trail = response.data;

            if (usersCompletedTrails.length >= 0)
                setUsersCompletedTrails( usersCompletedTrails =>  [ ...trail, ...usersCompletedTrails] );
        });
    }
    
        useEffect(  () => {
            if (completedTrails.length === 0)
                getCompleted();
        },[userId])

        useEffect( () => {
            if (usersCompletedTrails.length === 0)
                getTrails();
        }, [completedTrails])

        useEffect( () => {

            let trailUserCompletions = returnUniqueObjects(usersCompletedTrails);
            let tupleArray = getValues(completedTrails, trailUserCompletions );
            setData([...data,...tupleArray]);

            let hikedDistance =  trailUserCompletions.reduce( (total, trail) => {  
                return   total + parseFloat(`${trail.length}`)}, 0.0);
            setHiked(hikedDistance);

        },[usersCompletedTrails])


    
    return (
        <>
        <Typography>You have completed the following trails: !</Typography>
            <div className={styles.completed_trails}>
                {usersCompletedTrails.map((trail: dummy) => {
                    return (
                        <>
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

                                <Button
                                    variant='outlined'

                                    component={NextLinkComposed}
                                    to={{
                                        pathname: "/singletrail",
                                        query: { trail: JSON.stringify(trail) },
                                    }}
                                    linkAs={`/singletrail/${trail.id}`}
                                >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                            {trail.name}  {trail.prefecture}  Difficulty: {trail.difficulty}
                                        </Typography>
                                    </CardContent>
                                </Button>
                            </Box>
                        </>
                    );
                })}
            </div>
        </> 

    );
}

export default Completedtrails;