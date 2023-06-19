import { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropModal = ({ modal, onCloseModal, onCroppedImage }) => {
  const [image, setImage] = useState({ image: "", error: "" });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const imageHandler = (e) => {
    if (!e.target.files && e.target.files.length <= 0) return;
    if (e.target.files[0].size > 4 * 1000 * 1000)
      return setImage({ image: "", error: "Chỉ nhận ảnh dưới 4mb" });

    const url = URL.createObjectURL(e.target.files[0]);
    setImage({ image: url, error: "" });
  };

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image.image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");

      onCroppedImage(dataURL);
      setImage({ image: "", error: "" });
    };
  };

  const onCropCancel = () => {
    onCloseModal({ state: true, type: modal.type, aspect: modal.aspectRatio });
  };

  return (
    <div
      className={`${
        !modal.state ? "flex" : "hidden"
      } absolute z-20 h-full w-full items-center`}
    >
      <div className="relative h-2/3 w-full bg-zinc-800 opacity-100">
        {image.error && (
          <p className="-z-10 py-3 text-center text-red-400">{image.error}</p>
        )}
        <div className="absolute right-1/2 top-6 flex h-4/6 w-11/12 translate-x-1/2 items-center justify-center bg-zinc-700 md:top-12 md:w-10/12">
          {image.image ? (
            <Cropper
              image={image.image}
              aspect={modal.aspectRatio}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          ) : (
            <>
              <span>Kéo thả hoặc nhấn vào để tải ảnh</span>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                className="absolute h-full w-full opacity-0"
                onChange={imageHandler}
              />
            </>
          )}
        </div>
        {image.image ? (
          <div className="absolute bottom-5 right-5 flex items-center gap-x-8 text-xl">
            <button
              className="rounded-lg bg-red-400 px-4 py-2"
              onClick={() => {
                onCropCancel(), setImage({ image: "", error: "" });
              }}
            >
              Hủy
            </button>
            <button
              className="rounded-lg bg-[#506DE4] px-4 py-2"
              onClick={() => {
                onCropDone(croppedArea);
                onCloseModal({ state: true, type: modal.type });
              }}
            >
              Xong
            </button>
          </div>
        ) : (
          <button
            className="absolute bottom-5 right-5 rounded-lg bg-red-400 px-4 py-2 text-xl"
            onClick={onCropCancel}
          >
            Hủy
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCropModal;
