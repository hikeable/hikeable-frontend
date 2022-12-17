import React, { useRef,useState,useEffect } from 'react';



const PhotoGallery = ({ trailId, trailName}) => {
  const [loaded, setLoaded] = useState(false);

  // console.log ("first =",trailId, "😅😅😅")

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://product-gallery.cloudinary.com/all.js';
    scriptTag.addEventListener('load', () => setLoaded(true));
    document.body.appendChild(scriptTag);
  }, []);

  const cloudnaryGalleryRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    const myGallery = window.cloudinary.galleryWidget({
      container: '#my-gallery',
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      
      thumbnailProps: {
        width: 75,
        height: 75,
        spacing: 4,
        navigationColor: 'green',
        borderColor:"black",
        borderWidth:1
      },
      mediaAssets: [{ 
        tag: trailId,
        transformation :{
          crop:"fill",
          raw_transformation: "$username_ctx:!name!,$date_ctx:!date!/co_blue,l_text:ABeeZee_40:Uploaded by $(username) on $(date)/fl_layer_apply,g_south"
        } 
       }],
    });

    // console.log (typeof trailId, trailId, "🍒🍒🍒")
    if (!cloudnaryGalleryRef.current && typeof window !== 'undefined') {
      cloudnaryGalleryRef.current = myGallery.render();
    }
    return () => {
      cloudnaryGalleryRef.current = myGallery.destroy(); 
    };
  }, [loaded, trailId]);

  return <div id="my-gallery" />;
};

export default PhotoGallery;