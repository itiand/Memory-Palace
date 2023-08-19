import React from "react";
import { PalaceContext } from "../providers/palaceProvider";
import "../view/PalaceCarouselItem.scss";

function PalaceCarouselItem(props) {
  const { palace, onPalaceClick } = props;
  // const { palace } = PalaceContext;
  return (
    <div
      className="carousel-item flex w-full cursor-pointer flex-col items-center justify-center"
      key={palace._id}
      onClick={() => onPalaceClick(palace)}
    >
      <div className="cover flex h-96 items-center justify-center overflow-hidden text-2xl opacity-100 hover:opacity-90">
        <img src={palace.PalaceCoverImg} className="object-cover" />
        <div className="carousel-body -mt-8 self-start rounded bg-neutral/50 px-4 py-1 text-gray-200">
          <p className="carousel-body-palace_name text-6xl">
            {palace.PalaceName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PalaceCarouselItem;
