import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Backup from '../../assets/backup.svg';
import Food from '../../assets/food.svg';
import Furniture from '../../assets/furniture.svg';
import Wifi from '../../assets/wifi.svg';
import SingleDouble from '../../assets/single_double.svg';
import Washroom from '../../assets/washroom.svg';
import ActionAreaCard from './carouselCard';

const data = [
  { id: 1, src: Backup, text: 'Power Backup', subtext: '24x7 power backup by 2KVA inverter for each floor.Use of generators also avialble in emergency' },
  { id: 2, src: Food,  text: 'Food', subtext: 'dinning service is also availbale' },
  { id: 3, src: Furniture,  text: 'Furniture', subtext: 'we got you covered with all the furtinure for your stay' },
  { id: 4, src: Wifi, text: 'Wifi',  subtext: '400Mpbs super fast internet connectivity' },
  { id: 5, src: SingleDouble,  text: 'Logging', subtext: 'Single and Double sharing rooms availble' },
  { id: 6, src: Washroom,  text: 'Washroom', subtext: 'Attched hygeninc washroom in every room' },
  // Add more data as needed
];
const CarouselComponent = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        swipeable={true}
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={8000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}   
      >
        {data.map((item) => (
          <div key={item.id}>           
            <ActionAreaCard svg={item.src} heading={item.text} subText={item.subtext}/>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default CarouselComponent;
