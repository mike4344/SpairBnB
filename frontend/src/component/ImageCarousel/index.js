import React, { useState, useEffect} from 'react';

function ImageCarousel ({images}){
    const [imageIndex, setImageIndex] = useState(0)
    const max = images.length - 1
    useEffect(() => {
    },[imageIndex])
    return (
        <div className='image-container' >
            <button className='prev' onClick={e => setImageIndex((prev) => prev > 0 ? prev - 1: prev = max)} >
                Previous
            </button>
            <img src={images[imageIndex].imageUrl}  width='20%' />
            <button className='next' onClick={e => setImageIndex((prev) => prev < max ? prev + 1: prev = 0)} >
                Next
            </button>
        </div>
    )
}

export default ImageCarousel
