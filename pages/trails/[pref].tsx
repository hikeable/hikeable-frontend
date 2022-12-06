import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import { TrailCard } from "../../components";
import { Trail } from "../../global";

const _ = require("lodash");

async function fetcher(url: string) {
  const { data } = await axios.get(url);
  return data;
}

function getTrailData() {
  const { data, error } = useSWR(
    "https://hikeable-backend.herokuapp.com/api/trails",
    fetcher
  );
  return data;
}

const searchresults = () => {
  const router = useRouter();
  const { pref } = router.query;
  const allTrails = getTrailData() || [];

  console.log(allTrails);

  const capitalizePref = _.capitalize(pref);

  // useEffect(() => {
  //   if (!pref) {
  //     return;
  //   }

  //   router.prefetch("/prefectures");
  // }, [pref]);

  return (
    <>
      <h1>Trails in {capitalizePref}</h1>
      {allTrails
        .filter((trail: Trail) => {
          return pref === trail.prefecture;
        })
        .map((filteredTrail: Trail) => (
          <TrailCard key={filteredTrail.id} trail={filteredTrail} />
        ))}
    </>
  );
};

export default searchresults;
