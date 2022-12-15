import PhotoGallery from "../components/photoGallery";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Container } from "@mui/material";
// import { PhotoPageBreadcrumbs } from "../components";

const TrailPhotos = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trailId = searchParams.get("id");
  const trailName = searchParams.get("name");

  return (
    <>
      <Container>
        {/* <Button
          variant="contained"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button> */}
        {/* <PhotoPageBreadcrumbs
          name={trailName}
          prefecture={prefecture}
          id={trailId}
        /> */}
        <p> {`All photos of ${trailName} trail`}</p>

        <PhotoGallery trailId={trailId} trailName={trailName}></PhotoGallery>
      </Container>
    </>
  );
};

export default TrailPhotos;
