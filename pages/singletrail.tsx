import { useRouter } from "next/router";
import { Trail } from "../global";

interface TrailData {
  trail: Trail;
}

const singletrail = () => {
  const router = useRouter();
  const trail = JSON.parse(router.query.trail);

  console.log(trail);
  return (
    <>
      <h1>Test</h1>
    </>
  );
};

export default singletrail;
