import PhotoGallery from "../components/photoGallery";
import { useSearchParams } from 'next/navigation'




const TrailPhotos = () => {
  const searchParams = useSearchParams()
  console.log (searchParams.get("passed"))

  

  

  
  return (
    <>
    <h1> Test</h1>
     <PhotoGallery userIdTag={ searchParams.get("passed") /*userIdTag.current*/}></PhotoGallery>
    </>
      
  );
};

export default TrailPhotos