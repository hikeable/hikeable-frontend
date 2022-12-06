import { useRouter } from "next/router";
import { Trail } from "../global";

interface TrailData {
  trail: Trail;
}

const singletrail = () => {
  const router = useRouter();
  const trail = JSON.parse(router.query.trail as string);

  console.log(trail);
  return (
    <>
      <h1>Show Trail Data Test</h1>
      <h2>{trail.name}</h2>
    </>
  );
};

export default singletrail;
