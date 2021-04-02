import React, { useState, useEffect} from 'react';

function ImageCarousel ({images}){
    const [imageIndex, setImageIndex] = useState(0)
    const max = images.length - 1
    useEffect(() => {
    },[imageIndex])
    return (
        <div className='image-container'>
            <button className='prev' onClick={e => setImageIndex((prev) => prev > 0 ? prev - 1: prev = 0)} >
                Previous
            </button>
            <img src={images[imageIndex].imageUrl} height='100px' width='100px' />
            <button className='next' onClick={e => setImageIndex((prev) => prev < max ? prev + 1: prev = max)} >
                Next
            </button>
        </div>
    )
}

export default ImageCarousel
