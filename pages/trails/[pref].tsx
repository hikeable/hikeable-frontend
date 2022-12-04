import { useRouter } from "next/router";
import { useEffect } from "react";
import { TrailCard } from "../../components";

const _ = require("lodash");

const searchresults = () => {
  const router = useRouter();
  const { pref } = router.query;

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
      <TrailCard />
    </>
  );
};

export default searchresults;
