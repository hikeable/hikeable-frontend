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
      carouselStyle: 'thumbnails',
      // borderWidth:1,
      // borderColor:"black",
      displayProps:{
        mode:"expanded",
        topOffset: 70
      },
      thumbnailProps: {
        width: 75,
        height: 75,
        spacing: 4,
        navigationColor: 'green',
        borderColor:"black",
        borderWidth:1
      },
      zoomProps: {
        type:"inline"
      },
      mediaAssets: [{ tag: trailId }],
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