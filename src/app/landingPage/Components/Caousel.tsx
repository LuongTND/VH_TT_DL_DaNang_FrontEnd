'use client'

import { Carousel } from 'antd';
import Image from 'next/image';

const CarouselComponent = () => {
    const ConfigCarousel = {
        autoplay: true,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplaySpeed: 5000,
        speed: 800, 
        fade: true,
        pauseOnHover: true,
        cssEase: 'ease-in-out',
    }
    
  return (
    <div className="w-full h-[300px] overflow-hidden rounded-lg mb-8">
      <Carousel {...ConfigCarousel} className="w-full h-full">
        <div className="relative h-[300px]">
          <Image 
            src="/images/1.jpg" 
            alt="carousel" 
            fill 
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/images/2.webp" 
            alt="carousel" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/images/3.jpg" 
            alt="carousel" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative h-[300px]">
          <Image 
            src="/images/4.jpg" 
            alt="carousel" 
            fill 
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </Carousel>
    </div>
  )
}

export default CarouselComponent;