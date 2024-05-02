import {CloudConfig, Cloudinary, CloudinaryImage, URLConfig} from "@cloudinary/url-gen";
import {sepia} from "@cloudinary/url-gen/actions/effect";
import {AdvancedImage} from "@cloudinary/react";

const ImageService = () => {
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dpkxkkrnl'
        },
        url: {
            secureDistribution: 'res.cloudinary.com/dpkxkkrnl/image/upload/v1714682429/van_chuong_viet',
            secure: true
        }
        // This creates a URL of the form: https://www.example.com/demo/image/upload/sample
        //https://res.cloudinary.com/dpkxkkrnl/image/upload/v1714401224/cld-sample-4.jpg
    });

    // Use the image with public ID, 'front_face'.
    const myImage = cld.image('cld-sample-4');

    // Apply the transformation.
    myImage
        .effect(sepia());  // Apply a sepia effect.

    // The URL of the image is: https://res.cloudinary.com/demo/image/upload/docs/shoes

    // Render the transformed image in a React component.
    return (
        <div>
            <AdvancedImage cldImg={myImage}/>
        </div>
    )
}


export default ImageService;