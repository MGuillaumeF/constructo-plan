import React, { HTMLProps } from 'react';
import { container } from './style/Svg.scss';

interface Props extends HTMLProps<HTMLDivElement> {
    svgContent : string;
    width :string | number;
    height :string | number;
}
function Svg({svgContent, className, width, height, style, ...props}: Props) {
  return (
    <div className={[className ?? '', container].join(' ')} style={{...style, width, height}} {...props} dangerouslySetInnerHTML={{__html: svgContent}} />
  )
}

export default Svg