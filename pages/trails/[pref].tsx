import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { TrailCard } from "../../components";
import { Trail } from "../../global";

const _ = require("lodash");

async function fetcher(url: string) {
  const result = await axios.get(url).then((res) => res.data);
  return result;
}

const searchresults = (props) => {
  const router = useRouter();
  const { pref } = router.query;

  const { data, error } = useSWR(
    "https://hikeable-backend.herokuapp.com/api/trail",
    fetcher
  );
  console.log(data);

  const capitalizePref = _.capitalize(pref as string);

  useEffect(() => {
    if (!pref) {
      return;
    }

    router.prefetch("/prefectures");
  }, [pref]);

  return (
    <>
      <h1>Trails in {capitalizePref}</h1>
      <TrailCard data={data} />
    </>
  );
};

export default searchresults;
