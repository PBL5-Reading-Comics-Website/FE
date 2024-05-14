import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './mangaHorizontalList.css'; // Import your CSS file for styling
import MangaHorizontalListItem from './mangaHorizontalListItem';

interface Manga {
    id: number;
    name: string;
    score: string;
    imageUrl: string;
}

interface MangaHorizontalListRecommedProps {
    className?: string;
    userId: number;
}

function MangaHorizontalListRecommend({ className = '', userId }: MangaHorizontalListRecommedProps) {
    const [recommendations, setRecommendations] = useState<Manga[]>([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (userId) { // Only fetch if userId is not null
                try {
                    const response = await fetch(`http://localhost:5000/recommendations?userId=${userId}`);
                    const data = await response.json();
                    setRecommendations(data.recommendations);
                } catch (error) {
                    console.error('Error fetching recommendations:', error);
                }
            }
        };

        fetchRecommendations();
    }, [userId]);

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
        <div className={`gd-carousel-wrapper ${className}`}>
          <Carousel 
            className="gd-carousel"
            swipeable
            draggable
            responsive={responsive}
            ssr 
            infinite
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            itemClass="carousel-item-padding-40-px"
            arrows={true}
          >
            {recommendations.map((manga) => (
              <MangaHorizontalListItem 
                key={manga.id}
                id={manga.id.toString()} // Pass id as string
                imageUrl={manga.imageUrl} 
                mangaName={manga.name} 
              />
            ))}
          </Carousel>
        </div>
      );
    }

export { MangaHorizontalListRecommend };


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
                arrows={true}
            >
                {children as React.ReactNode[]}
            </Carousel>
        </div>
    );
}

export { MangaHorizontalList };

