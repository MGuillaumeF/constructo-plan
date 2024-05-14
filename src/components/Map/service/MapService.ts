import OpenLayerMap from 'ol/Map'
import View from 'ol/View'
import { getTopLeft, getWidth } from 'ol/extent'
import TileLayer from 'ol/layer/Tile'
import { get as getProjection, transform } from "ol/proj"
import { WMTS } from 'ol/source'
import WMTSTileGrid from 'ol/tilegrid/WMTS'

let map : OpenLayerMap | undefined;


export const init = (id : string) => {
    const resolutions : number[] = []
    const matrixIds : string[] = []
    const size = getWidth(getProjection("EPSG:3857")?.getExtent()!) / 256
    for (let i = 0; i < 19; i += 1) {
        resolutions[i] = size /Math.pow(2, i)
        matrixIds[i] = String(i);
    }
    map = new OpenLayerMap({
        layers:[
            new TileLayer({
                opacity:1,
                source: new WMTS({
                    url : 'https://wmts.geopf.fr/wmts',
                    layer: "CADASTRALPARCELS.PARCELLAIRE_EXPRESS",
                    matrixSet:'PM',
                    format: "image/png",
                    projection: getProjection("EPSG:3857")!,
                    tileGrid : new WMTSTileGrid({
                        origin : getTopLeft(getProjection("EPSG:3857")!.getExtent()),
                        resolutions,
                        matrixIds
                    }),
                    style: 'PCI vecteur',
                    wrapX : true
                })
            })
        ],
        target : id,
        view: new View({
            center : [-11158582, 4813697],
            zoom: 4
        }),
        controls:[]
    })
    zoomTo(3.198701, 48.057246, 6)
}

export const zoomTo = (long : number, lat:number, zoom:number) => {
    if (map) {
        map.getView().setCenter(transform([long, lat], 'EPSG:4326', 'EPSG:3857'))
        map.getView().setZoom(zoom)
    }
}
export const zoomToGround = () => {
    zoomTo(3.198701, 48.057246,18)
}


export const rotateTo = (rotation : number) => {
    if (map) {
        map.getView().setRotation(rotation % 1)
    }
}
export const rotateStepToAdd = (rotation : number) => {
    if (map) {
        map.getView().setRotation((map.getView().getRotation() + rotation))
    }
}
export const rotateStepToSub = (rotation : number) => {
    if (map) {
        map.getView().setRotation((map.getView().getRotation() - rotation))
    }
}