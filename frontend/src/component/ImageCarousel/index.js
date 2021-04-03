import React, { useState, useEffect} from 'react';

function ImageCarousel ({images, addClass}){
    const [imageIndex, setImageIndex] = useState(0)
    const max = images.length - 1
    useEffect(() => {
    },[imageIndex])
    return (
        <div className={`image-container ${addClass}`} >
            <button className='prev' onClick={e => setImageIndex((prev) => prev > 0 ? prev - 1: prev = max)} >
                &lt;
            </button>
            <img src={images[imageIndex].imageUrl}  />
            <button className='next' onClick={e => setImageIndex((prev) => prev < max ? prev + 1: prev = 0)} >
                &gt;
            </button>
        </div>
    )
}

export default ImageCarousel
