import { ReactElement, useState } from 'react';
import { useAuthContext } from '../components/context/UseAuthContext';
import { Box, Typography } from "@mui/material";

// import type { NextPageWithLayout } from './_app'
import LoggedIn from '../layouts/loggedIn';
import { Trail } from '../global';
import { TrailCard } from '../components';

const Dashboard  = () => {

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
    // const [completed, setCompleted] = useState<Trail[]>(data);


    // const hikedDistance = completed.reduce( (total, trail) = > {
        
    //     total + trail.length});
     




    return (
        
        <>
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


            
        </>
    );
}




// dashboard.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <LoggedIn/>        
//     )
// }




export default Dashboard;