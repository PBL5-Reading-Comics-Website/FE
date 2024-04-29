import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './mangaHorizontalList.css';
interface MangaHorizontalListProps {
    className?: string;
    children?: React.ReactNode[];
}

function MangaHorizontalList({ className = '', children }: MangaHorizontalListProps) {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="gd-carousel-wrapper ">
            <Carousel 
            className="gd-carousel"
                swipeable 
                draggable 
                responsive={responsive}
                ssr 
                infinite 
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-padding-40-px"
                arrows = {true}
            >
                {children as React.ReactNode[]}
            </Carousel>
            </div>
    );
}

export default MangaHorizontalList;