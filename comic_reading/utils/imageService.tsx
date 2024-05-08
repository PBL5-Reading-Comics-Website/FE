export const ImageService = {
    makeImageId: (mangaName: string, chapterName: string, imageName: string) => {
        return `van_chuong_viet/${mangaName}/${chapterName}/${imageName}`;
    }
}


