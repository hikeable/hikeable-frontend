import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import { Filter, TrailCard, TrailCardMobile } from "../../components";
import { Trail } from "../../global";
import { useEffect, useState } from "react";
import styles from "../../styles/pref_trails.module.css";
import { Container } from "@mui/material";

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
  console.log(pref);
  const allTrails = GetTrailData() || [];

  const capitalizePref = _.capitalize(pref);
  const filteredTrails = allTrails.filter((trail: Trail) => {
    if (pref === "all") {
      return allTrails;
    } else {
      return pref === trail.prefecture;
    }
  });

  const [trailsArr, setTrail] = useState<Trail[] | []>(filteredTrails);

  useEffect(() => {
    setTrail(filteredTrails);
  }, [allTrails]);

  return (
    <>
    

      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <h1>{capitalizePref} Trails</h1>
        <BrowserView>
          <Container>
            <div className={styles.flex_container}>
              <div className={styles.cards_feed}>
                {trailsArr.map((filteredTrail: Trail) => {
                  return (
                    <TrailCard key={filteredTrail.id} trail={filteredTrail} />
                  );
                })}
              </div>
              <div className={styles.filter_card}>
                <Filter trails={filteredTrails} setTrail={setTrail} />
              </div>
            </div>
          </Container>
        </BrowserView>

        <MobileView>
          <Container>
            <div className={styles.flex_container_mobile}>
              <div className={styles.filter_card_mobile}>
                <Filter trails={filteredTrails} setTrail={setTrail} />
              </div>
              <div className={styles.cards_feed}>
                {trailsArr.map((filteredTrail: Trail) => {
                  return (
                    <TrailCardMobile
                      key={filteredTrail.id}
                      trail={filteredTrail}
                    />
                  );
                })}
              </div>
            </div>
          </Container>
        </MobileView>
      </Container>
    </>
  );
};

export default ResultList;
