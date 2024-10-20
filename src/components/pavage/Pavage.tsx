import React from "react";

interface PavageProps {
  supportHeight: number;
  supportWidth: number;
  carreauWidth: number;
  carreauHeight: number;
  carreauOffsetX: number;
  carreauOffsetY: number;
  carreauColor: string;
  jointColor: string;
  jointWidth: number;
}

const Pavage = (props: PavageProps) => {
  const CARREAU_WIDTH = props.carreauWidth;
  const CARREAU_HEIGHT = props.carreauHeight;
  const JOINT_WIDTH = props.jointWidth;
  // remove margin top of supportHeight and margin left of supportWidth
  // apply joint supportWidth once per carreau to have precision number
  const FULL_CARREAU_LINE_QUANTITY = Math.floor(
    (props.supportHeight - JOINT_WIDTH) / (CARREAU_HEIGHT + JOINT_WIDTH)
  );
  const FULL_CARREAU_COLUMN_QUANTITY = Math.floor(
    (props.supportWidth - JOINT_WIDTH) / (CARREAU_WIDTH + JOINT_WIDTH)
  );

  const HEIGHT_MIN =
    ((props.supportHeight - JOINT_WIDTH) % (CARREAU_HEIGHT + JOINT_WIDTH)) -
    JOINT_WIDTH;
  const WIDTH_MIN =
    ((props.supportWidth - JOINT_WIDTH) % (CARREAU_WIDTH + JOINT_WIDTH)) -
    JOINT_WIDTH;

  const ROWS =
    HEIGHT_MIN > 0
      ? FULL_CARREAU_LINE_QUANTITY + 1
      : FULL_CARREAU_LINE_QUANTITY;
  const COLUMNS =
    WIDTH_MIN > 0
      ? FULL_CARREAU_COLUMN_QUANTITY + 1
      : FULL_CARREAU_COLUMN_QUANTITY;

  const carreaux = [];
  for (let i = 0; i < ROWS; i += 1) {
    for (let j = 0; j < COLUMNS; j += 1) {
      const carreauWidth =
        j === COLUMNS - 1 && WIDTH_MIN > 0 ? WIDTH_MIN : CARREAU_WIDTH;
      const carreauHeight =
        i === ROWS - 1 && HEIGHT_MIN > 0 ? HEIGHT_MIN : CARREAU_HEIGHT;
      carreaux.push(
        <rect
          x={props.carreauOffsetX + JOINT_WIDTH + j * (CARREAU_WIDTH + JOINT_WIDTH)}
          y={props.carreauOffsetY + 
             props.supportHeight -
            carreauHeight -
            (JOINT_WIDTH + i * (CARREAU_HEIGHT + JOINT_WIDTH))
          }
          fill={props.carreauColor}
          stroke={props.jointColor}
          strokeWidth={JOINT_WIDTH}
          width={carreauWidth}
          height={carreauHeight}
        />
      );
    }
  }
  console.log({
    FULL_CARREAU_LINE_QUANTITY,
    FULL_CARREAU_COLUMN_QUANTITY,
    HEIGHT_MIN,
    WIDTH_MIN,
    nb_carreaux: carreaux.length
  });
  return <g>{...carreaux}</g>;
};
export default Pavage;
