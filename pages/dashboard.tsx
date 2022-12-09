import { ReactElement, useRef, useState } from 'react';
import { useAuthContext } from '../components/context/UseAuthContext';
import { Box, Card, CardContent, Typography } from "@mui/material";
import {  Link as MuiLink } from "@mui/joy";
import { Trail } from '../global';
import styles from "../styles/dashboard.module.css"
import Link from 'next/link';

export interface IDashboard {
    completedTrails : Trail[]
}

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

const Dashboard  = ({completedTrails}: IDashboard) => {

    // if (!completedTrails)


   let data =  [
        {
            "id": 1,
            "name": "test1",
            "prefecture": "tokyo",
            "latitude": "1.00000000",
            "longitude": "1.00000000",
            "length": 1.00,
            "difficulty": 1,
            "photo_url": "test1",
            "map_url": "test1"
        },
        {
            "id": 2,
            "name": "test3",
            "prefecture": "hokkaidou",
            "latitude": "1.50000000",
            "longitude": "1.50000000",
            "length": 2.50,
            "difficulty": 3,
            "photo_url": "test3",
            "map_url": "test3"
        }
    ]

    const {user, loginWithGoogle, logout,auth} = useAuthContext();

    //list of favourited trails
    const [favorited, setFavorited] = useState<Trail[]>([]);
    // let completed = useRef<Trail[]>(data);
    let completed = data;
    // const [completed, setCompleted] = useState<Trail[]>(data);


    let hikedDistance = completed.reduce( (total, trail) => {   
      return   total + trail.length}, 0);
    

    return (
        
        <>
            <Typography> You hiked a distance of {hikedDistance}</Typography>
            <Box
              sx={{
                flexDirection: "column",
              }}
            >

                <Typography>Hi {user?.displayName} !</Typography>
                <Typography>You have completed the following trails: !</Typography>
                <Typography>You favourite trails are  !</Typography>
                <Typography>You favourite trails are  !</Typography>

            </Box>

            <div className={styles.completed_trails}>
                {
                    data.map((trail: dummy) => {
                    return ( 
                        <>
                       
                        <Card sx={{ 
                            minWidth: 275,
                            bgcolor: 'background.body',
                            '&:hover, &:focus-within': {
                            bgcolor: '#e1f5fe',
                            },
                            boxShadow: 'inset 0 1px 0 0 rgb(255 255 255 / 5%)',
                        
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <div>


                            <CardContent>
                                <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                    {trail.name}  {trail.prefecture}  Difficulty: {trail.difficulty} 
                                </Typography>


                            </CardContent>

                            <Link
                                
                                href={{
                                    pathname: '/singletrail',
                                    query: { trail: JSON.stringify(trail) },
                                }}
                                as={`/singletrail/${trail.id}`}
                                >
                                <MuiLink
                                    overlay
                                    underline="none"
                                    sx={{ color: "text.tertiary" }}
                                ></MuiLink> 
                            </Link>
                            </div>

                            {/* <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions> */}
                            </Box>

                        </Card>
                        </>
                        // <Card>

                        // </Card>
                    
                  
                    )
                    })

                }

            </div>


            
        </>
    );
}




// dashboard.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <LoggedIn/>        
//     )
// }






export default Dashboard;