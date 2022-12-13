
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { Filter, TrailCard } from "../../components";
import { Trail } from "../../global";
import { useEffect, useState } from "react";
import styles from "../../styles/pref_trails.module.css";
// import Toolbar from "@material-ui/core/Toolbar";
import Toolbar from '@mui/material/Toolbar';





const _ = require("lodash");

async function fetcher(url: string) {
  const { data } = await axios.get(url);
  return data;
}

function GetTrailData() {
  const { data, error } = useSWR(
    "https://hikeable-backend.herokuapp.com/api/trails",
    fetcher
  );
  return data;
}

const ResultList = () => {
  const router = useRouter();
  const { pref } = router.query;
  const allTrails = GetTrailData() || [];
  
  const capitalizePref = _.capitalize(pref);
  const filteredTrails = allTrails
  .filter((trail: Trail) => {
    return pref === trail.prefecture;
  });

  const [trailsArr, setTrail] = useState<Trail[] | []>(filteredTrails);
  
  useEffect(() => { 
    setTrail(filteredTrails);
  },[allTrails])

  return (
    <>
      <h1>Trails in {capitalizePref}</h1>
      <div className= {styles.flex_container}>

        <div className= {styles.cards_feed}>
          { 
            trailsArr.map((filteredTrail: Trail) => {
              return (
                <TrailCard key={filteredTrail.id} trail={filteredTrail} />
              )}
            )}
        </div>
        <div className={styles.filter_card}>
            <Filter trails={filteredTrails} setTrail = {setTrail}  />

        </div>


      </div>
    </>
  );
};

export default ResultList;