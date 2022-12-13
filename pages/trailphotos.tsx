import PhotoGallery from "../components/photoGallery";
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@mui/material";




const TrailPhotos = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const trailId = searchParams.get("id");
  const trailName = searchParams.get("name");
  // console.log (trailId )
  // console.log (trailName)

  
  return (
    <>
    <Button variant="contained" onClick={() => {router.back()}}>Back</Button>

    <p> {`All photos of ${trailName} trail`}</p>
     <PhotoGallery trailId={trailId} trailName={trailName}  ></PhotoGallery>
    </>
      
  );
};

export default TrailPhotos;