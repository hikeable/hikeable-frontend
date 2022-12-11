import { ReactElement, useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../components/context/UseAuthContext';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Paper, Typography } from "@mui/material";
import {  Link as MuiLink } from "@mui/joy"
import Link, { NextLinkComposed } from "../src/Link"
import { Trail , trailCompletionObject} from '../global';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { LocationOn } from "@mui/icons-material";
import styles from "../styles/dashboard.module.css"
import axios from 'axios';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
  } from '@devexpress/dx-react-chart-material-ui';
import useSWR from 'swr';

// export interface IDashboard {
//     completedTrails : Trail[]
// }

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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    maxWidth: '20rem',
    minWidth: '15rem',
    lineHeight: '60px',
  }));



//   function GetCompletedUserTrails(compTrails) {

//     compTrails.map ((trail) => {


//         const { data, error } = useSWR(
//             "https://hikeable-backend.herokuapp.com/api/trails/completions",
//             fetcher
//           ); 
//     }


//     )

//   }
 

 

const Dashboard  = () => {

    const {user, userId} = useAuthContext()
    const [user_id, setUser] = useState();
    const [completedTrails, setCompleted] = useState<trailCompletionObject[] >([]);
    const [usersCompletedTrails, setUsersCompletedTrails] = useState<Trail[] >([]);
    const [count, setCount] = useState<number>(0)

    console.log(userId);

    async function fetcher(url: string) {
        const { data } = await axios.get(url);
        return data;
      }
      
      function GetCompletedData(userId: number | undefined) {
        const { data, error } = useSWR(
          "https://hikeable-backend.herokuapp.com/api/trails/completions",
          fetcher
        )
        console.log(data);
        const retArr = data.filter((completions) => completions.user === userId);
        console.log(retArr);
        // return ret;
        // return [];
      }



    const getCompleted = async () => {

        const url = "https://hikeable-backend.herokuapp.com/api/trails/completions";
        await axios.get(url).then( (response) => {
            console.log('pending...');
            console.log("👻", response);
            const result = response.data.filter((completions) => completions.user === userId)  
            console.log(result);
            setCompleted(result); 
        });
         console.log(completedTrails); 
   }
    




    useEffect(  () => {


        if (completedTrails.length === 0)
            getCompleted();
        
        else{
            if (usersCompletedTrails.length === 0)
                getTrails();
            setCount(count + 1);
            console.log("😇 count is :", count);
            
            console.log(completedTrails);
        }
            
        if (usersCompletedTrails.length !== 0 ){
            console.log("😄")
            console.log(usersCompletedTrails)
        }

      

        // setCompleted(allTr);
        // if (userId !== undefined){
            // setCompleted(allTr);
            // getTrails();
        //}
        // let allTr = GetCompletedData(userId);
        // (async()=> {

            //  axios({
            //     method: "get",
            //     url: "https://hikeable-backend.herokuapp.com/api/trails/completions",
            //   }).then( (response) => {
     
            //       const result = response.data.filter((completions) => completions.user === userId)  
            //       setCompleted(result); 
            //             console.log(completedTrails); 
            //   });

        // })();

    },[userId, completedTrails])





    const getTrails =  () => {

        // function getArr(...args: Trail[]) {
        //     console.log("args are: ")
        //     console.log(args);
        //     return args;
        // }
        
        return completedTrails.map( async (singleCompletedTrail) => {

            const response = await axios ({
                method: "get",
                url: `https://hikeable-backend.herokuapp.com/api/trails/${singleCompletedTrail.trail_id}`
            })

            const trail = response.data;

       

            console.log("🌏");
            console.log(trail);

            if (usersCompletedTrails.length >= 0)
                setUsersCompletedTrails( usersCompletedTrails =>  [ ...trail, ...usersCompletedTrails] );
            // return (
            //   <>
                
            //     <Button
            //         variant='outlined'
                    
            //         component={NextLinkComposed}
            //         to={{
            //             pathname: "/singletrail",
            //             query: { trail: JSON.stringify(trail) },
            //         }}
            //         linkAs = {`/singletrail/${trail.id}`}
            //      >
            //         <CardContent>
            //             <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            //                 {trail.name}  {trail.prefecture}  Difficulty: {trail.difficulty} 
            //             </Typography>
            //         </CardContent>
            //     </Button>
            //  </>

            // )
        })
    }
    console.log("users completed trails");
    console.log(usersCompletedTrails);

    //list of favourited trails
    // const [favorited, setFavorited] = useState<Trail[]>([]);
    // let completed = useRef<Trail[]>(data);


    // let hikedDistance = completed.reduce( (total, trail) => {   
    //   return   total + trail.length}, 0);
    let hikedDistance = 4;
    

    return (
        
        <>
            <Box
              sx={{
                flexDirection: "column",
              }}
            >
                <div className= {styles.page_header}>


                <Typography>Hi {user?.displayName} !</Typography>
                  
                    <Item key={7} elevation={7} >
                        {`You've hiked a distance of ${hikedDistance} km` }
                    </Item>
                </div>
                <Typography>You have completed the following trails: !</Typography>
 
                {/* <Typography>You favourite trails are  !</Typography> */}
                {/* <Typography>You favourite trails are  !</Typography> */}

            </Box>
          

             <div className={styles.completed_trails}>
                {
                    usersCompletedTrails.map((trail: dummy) => {
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
                                    linkAs = {`/singletrail/${trail.id}`}
                                >
                                    <CardContent>
                                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                            {trail.name}  {trail.prefecture}  Difficulty: {trail.difficulty} 
                                        </Typography>
                                    </CardContent>
                                </Button>
                            </Box>
                        


                        </>
                     
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