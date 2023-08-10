import React from 'react';

function PalaceCarouselItem(props) {
  const { palace, onPalaceClick } = props;
  return (
    <div
      className="carousel-item w-full flex flex-col items-center justify-center cursor-pointer"
      key={palace._id}
      onClick={() => onPalaceClick(palace)}
    >
      <div className="h-64 flex items-center justify-center overflow-hidden">
        <img src={palace.PalaceCoverImg} className="object-cover" alt="" />
      </div>
      <div className='carousel-body bg-neutral/50 py-1 px-4 -mt-8 text-gray-200 self-start rounded-br'>
        <p className='text-m'>{palace.PalaceName}</p>
      </div>
    </div>
  );
}

// <div className="carousel-item w-full flex flex-col items-center justify-center cursor-pointer" key={palace._id} onClick={() => window.reg_view.showModal()}>
//   <div className="h-64 flex items-center justify-center overflow-hidden">
//     <img src={palace.PalaceCoverImg} className="object-cover" alt="" />
//   </div>
//   <div className='carousel-body bg-neutral/50 py-1 px-4 -mt-8 text-gray-200 self-start rounded-br'>
//     <p className='text-m'>{palace.PalaceName}</p>
//   </div>
// </div>
export default PalaceCarouselItem;