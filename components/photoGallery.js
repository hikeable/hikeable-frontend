import React, { useRef,useState,useEffect } from 'react';



const PhotoGallery = ({ userIdTag}) => {
  const [loaded, setLoaded] = useState(false);

  console.log ("first =",userIdTag, "😅😅😅")

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
      carouselStyle: 'thumbnails', // default value: included for clarity
      thumbnailProps: {
        width: 75,
        height: 75,
        spacing: 4,
        navigationColor: 'green',
      },
      mediaAssets: [{ tag: userIdTag }],
    });
    console.log (typeof userIdTag, userIdTag, "🍒🍒🍒")
    if (!cloudnaryGalleryRef.current && typeof window !== 'undefined') {
      cloudnaryGalleryRef.current = myGallery.render();
    }
    return () => {
      cloudnaryGalleryRef.current = myGallery.destroy(); // Important To avoid memory leaks and performance issues, make sure to use the destroy method before removing the Product Gallery widget container element from your DOM.
    };
  }, [loaded, userIdTag]);

  return <div id="my-gallery" />;
};

export default PhotoGallery;