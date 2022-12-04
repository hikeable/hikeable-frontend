import { useRouter } from "next/router";
import { useEffect } from "react";
import { TrailCard } from "../../components";

const searchresults = () => {
  const router = useRouter();
  const { pref } = router.query;

  useEffect(() => {
    if (!pref) {
      return;
    }

    router.prefetch("/prefectures");
    // console.log("PREF", pref);
  }, [pref]);

  return (
    <>
      <h1>Trails in {pref}</h1>
      <TrailCard />
    </>
  );
};

export default searchresults;
