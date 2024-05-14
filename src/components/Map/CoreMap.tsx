import React, { HTMLProps, useEffect } from 'react';
import { init, zoomToGround } from './service/MapService';
import { container, zoom } from './style/CoreMap.scss';

interface CoreMapProps extends HTMLProps<HTMLDivElement> {
    id : string;
    zoomProps ?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    rotateLeftProps ?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    rotateRightProps ?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
}

function CoreMap({zoomProps, rotateLeftProps, rotateRightProps, ...mapProps}: CoreMapProps) {
    useEffect(() => {
        init(mapProps.id);
      }, [])
      return (
        <>
        <div {...mapProps} className={container} />
        <button className={zoom} onClick={() => zoomToGround()} {...zoomProps} >Zoom</button>
        </>
      );
}

export default CoreMap