import {useEffect,useState} from 'react'

import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL, listAll  } from "firebase/storage";
import './App.css';
import Overlay from './Overlay'
import { ReactComponent as AddCircle} from './static/image/plus-circle-solid.svg'

function App() {

  const [image,setImage] = useState(null)

  const [gallery,setGallery] = useState([])

  const [isView,setIsView] = useState(false)
  function handleView(picture)
  {
    setIsView(picture)
  }

  function handleChange(e)
  {
    setImage(e.target.files[0])
    handleSubmit(e.target.files[0])
  }


  useEffect(()=>{
    let arr = []
    listAll(ref(storage, 'images'))
      .then(res=>res.items)
      .then(items=>{
        for(var i=0;i<items.length;i++)
          {
            getDownloadURL(items[i])
              .then(url=>{
                arr.unshift(url)
                if(arr.length===items.length)
                  setGallery(arr)
              })
              .catch(err=>console.log(err))
          }
        })
    
  },[])
  function handleSubmit(value)
  {
    const storageRef = ref(storage,`images/${value.name}`)
    uploadBytes(storageRef, value).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref)
        .then(url=>setGallery([url,...gallery]))
        
    });
  }
  return (
    <>
      <div className='header'>
        <h1>YOUR PICTURES</h1>
        <p>Choose your picture to save it on the cloud the most security</p>
        <form>
          <div className='fileWrap'>
            <AddCircle/>
            <input onChange={(e)=>handleChange(e)} type='file'/>
          </div> 
        </form>
      </div>
      <div className='body'>
        
          {gallery.map((picture,index)=>{
            return <div key={index}>
                <img onClick={()=>handleView(picture)} src={picture} />
              </div>
          })}
        {!!isView?
          <>
            <Overlay setIsView={setIsView}/>
            <img className='viewImg' src={isView}/>
          </>
        :''}
      </div>

    </>
  );
}

export default App;
