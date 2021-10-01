
import './App.css';
import {useState,useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch'; 

function App() {

    const [images,setImages] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [term,setTerm] = useState('');

    useEffect(() => {
      fetch(`https://pixabay.com/api/?key=23647664-a34f2016f9647680ccb71a0fc&q=${term}&image_type=photo&pretty=true`)
        .then(res => res.json())
        .then(data => {
          setImages(data.hits);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    },[term]);
  return (
      <div className="container mx-auto">
        <ImageSearch searchText={(text)=> setTerm(text) }/>
        {!isLoading && images.length == 0 && <h1>No Images Found</h1>}
        {isLoading ?  <h1>Loading...</h1> :<div className="grid grid-cols-3 gap-4">
          {images.map(image =>(
            <ImageCard key={image.id} image={image}/>
          ))}
        </div>}
      </div>
  );
}

export default App;
