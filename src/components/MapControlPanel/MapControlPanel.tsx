import React from 'react'
import { rotateStepToAdd, rotateStepToSub, rotateTo } from '../Map/service/MapService'
import Svg from '../Svg/Svg'
import search from './icones/search.svg'
import { container } from './style/MapControlPanel.scss'

type Props = {}

function MapControlPanel({}: Props) { 
  return (
    <div className={container}>
        <div><button onClick={() => rotateTo(0)}><img src="" alt="" /></button><button onClick={() => rotateStepToSub(0.1)}>-</button><button onClick={() => rotateStepToAdd(0.1)}>+</button></div>
        <div><button><Svg svgContent={search} height={'24px'} width={'24px'}/></button><button>-</button><button>+</button></div>
    </div>
  )
}

export default MapControlPanel