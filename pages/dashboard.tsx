import { useEffect, useState } from "react";
import { useAuthContext } from "../components/context/UseAuthContext";
import { Box, Paper, Typography } from "@mui/material";
import { Trail, TTrailCompletion } from "../global";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import styles from "../styles/dashboard.module.css";
import axios from "axios";
import { LineChart } from "../components/LineChart";
import { returnUniqueObjects, getValues } from "../src/ObjectFunctions";

import * as React from "react";

type Anchor = "left";

type dummy = {
  id: number;
  name: string;
  prefecture: string;
  latitude: string;
  longitude: string;
  length: number;
  difficulty: number;
  photo_url: string;
  map_url: string;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  fontSize: "1 rem",
  color: theme.palette.text.secondary,
  height: 60,
  maxWidth: "32rem",
  minWidth: "15rem",
  lineHeight: "60px",
  padding: "4px",
}));

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
});

const Dashboard = () => {
  const { user, userId } = useAuthContext();
  const [hiked, setHiked] = useState(0);
  const [completedTrails, setCompleted] = useState<TTrailCompletion[]>([]);
  const [usersCompletedTrails, setUsersCompletedTrails] = useState<Trail[]>([]);
  const [data, setData] = useState<{ date: string; length: number }[]>([]);

  const [state, setState] = React.useState({ Menu: false });

  const getCompleted = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/completions`;
    await axios.get(url).then((response) => {
      const result = response.data.filter(
        (completions) => completions.user === userId
      );
      setCompleted(result);
    });
  };

  const getTrails = () => {
    return completedTrails.map(async (singleCompletedTrail) => {
      const response = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/${singleCompletedTrail.trail_id}`,
      });

      const trail = response.data;

      if (usersCompletedTrails.length >= 0)
        setUsersCompletedTrails((usersCompletedTrails) => [
          ...trail,
          ...usersCompletedTrails,
        ]);
    });
  };

  useEffect(() => {
    if (completedTrails.length === 0) getCompleted();
  }, [userId]);

  useEffect(() => {
    if (usersCompletedTrails.length === 0) getTrails();
  }, [completedTrails]);

  useEffect(() => {
    let trailUserCompletions = returnUniqueObjects(usersCompletedTrails);
    let tupleArray = getValues(completedTrails, trailUserCompletions);
    setData([...tupleArray]);

    let hikedDistance = trailUserCompletions.reduce((total, trail) => {
      return total + parseFloat(`${trail.length}`);
    }, 0.0);
    setHiked(hikedDistance);
  }, [usersCompletedTrails]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flexDirection: "column",
          }}
        >
          <div className={styles.page_header}>
            <Typography fontSize={"3rem"}>Hi {user?.displayName} !</Typography>

            {/* <Item key={7} elevation={1} > */}
            <Typography fontSize={"1.5rem"}>
              {`You've hiked a total of ${hiked} km`}
            </Typography>
            {/* </Item> */}
          </div>
        </Box>
        <Box
          sx={{ paddingLeft: "2em", paddingRight: "2em", paddingBottom: "1em" }}
        >
          {data.length >= 0 ? (
            <LineChart dataSet={data}></LineChart>
          ) : (
            <>Loading...</>
          )}
        </Box>

        {/***** PLEASE DO NOT DELETE   *******/
        /* <Typography>
                    You have completed the following trails: !
                </Typography>

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
                </div> */}
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
