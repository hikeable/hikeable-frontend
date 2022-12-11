import PhotoGallery from "../components/photoGallery";
import { useSearchParams } from 'next/navigation'




const TrailPhotos = () => {
  const searchParams = useSearchParams()
  const trailId = searchParams.get("id");
  const trailName = searchParams.get("name");
  // console.log (trailId )
  // console.log (trailName)

  
  return (
    <>
    <p> {`All photos of ${trailName} trail`}</p>
     <PhotoGallery trailId={trailId} trailName={trailName}  ></PhotoGallery>
    </>
      
  );
};

export default TrailPhotos;