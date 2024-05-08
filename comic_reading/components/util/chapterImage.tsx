import MyCloudinary from "../../utils/myCloudinary";
import {AdvancedImage} from "@cloudinary/react";

const ChapterImage = ({imageId}: {imageId: string}) => {
    const image = MyCloudinary.image(imageId);
    return (
        <div>
            <div key={imageId}>
                <AdvancedImage cldImg={image}/>
            </div>
        </div>
    )
}

export default ChapterImage;