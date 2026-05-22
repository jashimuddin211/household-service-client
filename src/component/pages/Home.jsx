import React from 'react';
import Number from '../number/Number';


import ProcessSection from '../ProcessesSection/ProcessesSection';
import Slider from './Home/Swiper';
import Services from './Services/Services';
import LimitedCard from './Home/limitedCard';



const Home = () => {
    return (
        <div className='bg-gradient-to-b from-white to-orange-50'>
            
            
        

            <div className='p-8'>
                <Slider></Slider>
            </div>
            
            
                <ProcessSection></ProcessSection>
                <LimitedCard></LimitedCard>
                
            
            <Number></Number>
        </div>
    );
};

export default Home;

// 