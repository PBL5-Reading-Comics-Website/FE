import MyCloudinary from "../../utils/myCloudinary";
import {AdvancedImage} from "@cloudinary/react";

const ChapterImage = () => {
    const imageId = 'van_chuong_viet/Yumemiru Maid no Tea Time/Vol. 1 Ch. 1/03_gnrs5k';
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