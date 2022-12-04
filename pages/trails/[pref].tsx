import { useRouter } from "next/router";
import { useEffect } from "react";

const ResultList = () => {
  const router = useRouter();
  const { pref } = router.query;

  useEffect(() => {
    if (!pref) {
      return;
    }

    router.prefetch("/prefectures");
    // console.log("PREF", pref);
  }, [pref]);

  return <div>{pref}</div>;
};

export default ResultList;
