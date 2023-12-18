"use client"

import Link from 'next/link'
import React from 'react'
import { RiHeart3Line, RiHeart3Fill, RiEditFill, RiDeleteBin6Fill, RiMoreFill, RiMessage3Line, RiEmotionHappyLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { openModalAction } from '../../app/redux/features/modalEdit/modalEditAction';
import { openModalDeleteAction } from '../../app/redux/features/modalDelete/modalDeleteAction';

const UserPostDash = ({publication}) => {
    const [isLike, setIsLike] = useState(false);
    const [textCommend, setTextCommend] = useState('');

    const dispatch = useDispatch();

    const removeAboutAgo = (distance) => {
        return distance.replace(/(?:about|ago)/gi, '').trim();
      };
    
      const formatDistance = (date) => {
        const distance = formatDistanceToNow(new Date(date), { addSuffix: true });
        const cleanedDistance = removeAboutAgo(distance);
        return cleanedDistance;
      };

    const handleClick = () => {
        setIsLike(!isLike);
    }

    const handleChange = (event) => {
        setTextCommend(event.target.value);
    }


    const imageLoader = ({src}) => {
        return src
    }
    return (
        <div className=' flex flex-col xl:w-[60%] border-transparent pb-3 border-[2px] border-b-primary/30 bg-secondary-900 rounded-md overflow-hidden m-5 ' >
            <div>
                <div className='flex justify-between'>
                    <div className='flex gap-x-2 p-2 items-center'>
                        <div className='rounded-full w-[32px] h-[32px] bg-red-600 overflow-hidden '>
                           <Link href={`/explore/${publication.artistId}`}>
                            {publication.profilePic && 
                            <Image unoptimized loader={imageLoader} src={publication.profilePic} height={32} width={32} alt={publication.nameArtist} style={{width:'100%', height:'100%' , cursor:"pointer" }}/>
                            }
                            </Link>
                        </div>
                        <Link href={`/explore/${publication.artistId}`}>
                        <span className='text-[15px] cursor-pointer text-artistfont'>{`${publication.nameArtist}`}</span>
                        </Link>
                        <p className='text-artistfont/70 text-[13px]'>• {formatDistance(publication.createdAt)}</p>
                    </div>
                    
                </div>
                <div className="w-full flex flex-col justify-center items-center bg-secondary-100 mb-2 max-h-[500px] ">
                    {publication.image &&
                    <Image unoptimized src={publication.image} loader={imageLoader} width={1000} height={500} alt={publication.description} className='object-cover max-h-[500px]'/>
                    }
                </div>
                <div  className='cursor-pointer text-[30px] flex gap-x-2 mb-2 text-artistfont'>
                {
                        isLike
                        ? <RiHeart3Fill onClick={handleClick} className='text-red-500'/>
                        : <RiHeart3Line onClick={handleClick} />
                }
                    <RiMessage3Line/>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-1 text-artistfont'>Les gusta a 218 personas</p>
                    <p className='mb-1 text-artistfont'><span className='font-bold text-artistfont text-[16px] mr-2'>{name}</span>{publication?.description}</p>
                    <p className='text-artistfont/50 cursor-pointer mb-1'>Ver comentarios</p>
                    <form className='m-0 p-0'>
                        <div className='flex justify-between gap-x-3'>
                            <textarea type='text' onChange={handleChange} value={textCommend} placeholder='Añadir comentario...' rows={2} className='flex-1 py-0 h-auto resize-none text-[16px]  outline-none bg-transparent text-white/80 '/>
                            <div className='flex gap-x-2  w-[100px] '>
                                <button type='submit' className={`flex items-start pt-0.5 ${textCommend.length==0 && 'hidden'} `}>
                                    <span className='text-primary text-[17px] hover:text-artistfont'>Publicar</span>
                                </button>
                                <div className='pt-1 ml-auto'>
                                    <RiEmotionHappyLine className='cursor-pointer top-0 text-[17px] text-artistfont'/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
  )
}

export default UserPostDash