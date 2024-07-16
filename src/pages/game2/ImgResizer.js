import Resizer from 'react-image-file-resizer';

export default async (file, width, height) =>{
  return new Promise((resolve) => {                     //비동기 작업을 위해서 "Promise"를 통한 비동기 작업 정의
    Resizer.imageFileResizer(                    //Resizer의 "imageFileResize"메서드를 통해서 이미지 리사이징 및 인코딩 옵션 정의
      file,                                      
      width,                                        //이미지 너비
      height,                                        //이미지 높이
      "JPEG",                                      //파일 형식
      100,                                        //이미지 퀄리티(100으로 해도 이미지 리사이징시 상당히 깨지긴 한다)
      0,
      (uri) => {
        /* resize new image with url*/
        resolve(uri);
      },
      "blob",
      width,
      height
    );
  });
}