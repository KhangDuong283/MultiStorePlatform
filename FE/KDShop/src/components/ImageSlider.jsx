import { Carousel } from 'antd';

const images = [
    '/public/images/slider1.jpg',
    '/public/images/slider1.jpeg',
    '/public/images/slider2.jpeg',
];

const ImageSlider = () => {
    return (
        <div className="m-6 mb-4 mb-0 bg-gray-100 rounded-lg shadow-md">
            <Carousel autoplay draggable>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-60 rounded-lg object-cover"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageSlider;
