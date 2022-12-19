import PhotoGallery from "../components/photoGallery";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Container } from "@mui/material";
import styles from "../styles/trailphotos.module.css";

// import { PhotoPageBreadcrumbs } from "../components";

const TrailPhotos = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trailId = searchParams.get("id");
  const trailName = searchParams.get("name");

  return (
    <>
      <Container sx={{ mt: 15 }}>
        <Button
          variant="outlined"
          onClick={() => {
            router.back();
          }}
          sx={{
            mb: 3,
            borderRadius: "8px",
            color: "#304b35",
            borderColor: "#304b35",
            "&:hover": {
              borderColor: "#304b35",
            },
          }}
        >
          Back to trail page
        </Button>

        <h1 className={styles.title}> {`All photos of ${trailName} trail`}</h1>

        <PhotoGallery trailId={trailId} trailName={trailName}></PhotoGallery>
      </Container>
    </>
  );
};

export default TrailPhotos;
