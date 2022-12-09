import { useRef,useEffect } from "react"

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudname:"doitgrcvi",
      uploadPreset:"n4mabogz"
    }, function(error, result){
      console.log(result)
    })
  },[])

  return (
    
    <button onClick={() => widgetRef.current.open()}>
      Upload
    </button>
  )

}

export default UploadWidget