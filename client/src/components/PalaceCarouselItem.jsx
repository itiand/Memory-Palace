import React from 'react';
import { PalaceContext } from "../providers/palaceProvider";
import '../view/PalaceCarouselItem.scss';

function PalaceCarouselItem(props) {
  const { palace, onPalaceClick } = props;
  // const { palace } = PalaceContext;
  return (
    <div
      className="carousel-item w-full flex flex-col items-center justify-center cursor-pointer"
      key={palace._id}
      onClick={() => onPalaceClick(palace)}
    >
      <div className="cover h-96 flex items-center justify-center overflow-hidden opacity-100 hover:opacity-90 text-2xl">
        <img src={palace.PalaceCoverImg} className="object-cover" />
        <div className='carousel-body bg-neutral/50 py-1 px-4 -mt-8 text-gray-200 self-start rounded'>
          <p className='text-6xl carousel-body-palace_name'>{palace.PalaceName}</p>
        </div>
      </div>

    </div>
  );
}


export default PalaceCarouselItem;
