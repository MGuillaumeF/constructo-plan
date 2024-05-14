import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Wall from "./components/indoor/wall/Wall";
import Pavage from "./components/pavage/Pavage";
import { forms, vertical } from "./index.scss";
import reportWebVitals from "./reportWebVitals";

function App() {
  const [carreau, setCarreau] = useState({
    carreauWidth: 604,
    carreauHeight: 300,
    jointWidth: 3
  });
  const [window, setWindow] = useState({
    height: 950,
    width: 600,
    border: 20,
    allege: 1200,
    left: 1200
  });
  const [door, setDoor] = useState({
    height: 2100,
    width: 880,
    border: 20,
    left: 40
  });
  const [walls, setWalls] = useState({
    douche: 2290,
    window: 1900,
    empty: 2290,
    door: 1900,
    height: 2500
  });

  const RECEVEUR_LONGUEUR = 1200;
  const RECEVEUR_LARGEUR = 900;
  const RECEVEUR_HAUTEUR = 30;

  const PAROIE_DOUCHE_HEIGHT = 1900;
  const PAROIE_DOUCHE_LARGEUR = 1200;

  const WALL_HEIGHT = walls.height;
  const FIRST_WALL_WIDTH = walls.douche;
  const SECOND_WALL_WIDTH = walls.window;
  const THIRD_WALL_WIDTH = walls.empty;
  const FOURTH_WALL_WIDTH = walls.door;

  const FULL_WIDTH =
    FIRST_WALL_WIDTH + SECOND_WALL_WIDTH + THIRD_WALL_WIDTH + FOURTH_WALL_WIDTH;

  const FIRST_WALL_X_OFFSET = 0;
  const SECOND_WALL_X_OFFSET = FIRST_WALL_X_OFFSET + FIRST_WALL_WIDTH;
  const THIRD_WALL_X_OFFSET = SECOND_WALL_X_OFFSET + SECOND_WALL_WIDTH;
  const FOURTH_WALL_X_OFFSET = THIRD_WALL_X_OFFSET + THIRD_WALL_WIDTH;

  const COLLE_EPAISSEUR = 5;
  const CARREAU_EPAISSEUR = 8.2;
  return (
    <>
      {/* <CoreMap id="map"/>
      <MapControlPanel /> */}
      <div style={{ height: "600px", overflow: "auto", maxWidth: "100vw" }}>
        <Wall
          width={FULL_WIDTH}
          height={WALL_HEIGHT}
          forreinObjects={[
            <Pavage
              supportHeight={WALL_HEIGHT}
              supportWidth={FULL_WIDTH}
              {...carreau}
            />,
            // bordure de fenêtre
            <rect
              fill="white"
              strokeWidth={3}
              stroke="black"
              width={window.width + 2 * window.border}
              height={window.height + 2 * window.border}
              x={SECOND_WALL_X_OFFSET + window.left - window.border}
              y={WALL_HEIGHT - window.allege - (window.height + window.border)}
            />,
            // fenêtre
            <rect
              fill="white"
              strokeWidth={3}
              stroke="black"
              width={window.width}
              height={window.height}
              x={SECOND_WALL_X_OFFSET + window.left}
              y={WALL_HEIGHT - window.allege - window.height}
            />,
            // meuble
            <rect
              fill="#333"
              strokeWidth={3}
              stroke="black"
              width={1210}
              height={570}
              x={FIRST_WALL_X_OFFSET + COLLE_EPAISSEUR + CARREAU_EPAISSEUR}
              y={WALL_HEIGHT - 880}
            />,
            <rect
              fill="#222"
              strokeWidth={3}
              stroke="black"
              width={1210}
              height={260}
              x={FIRST_WALL_X_OFFSET + COLLE_EPAISSEUR + CARREAU_EPAISSEUR}
              y={WALL_HEIGHT - 880}
            />,
            <rect
              fill="#222"
              strokeWidth={3}
              stroke="black"
              width={1210}
              height={260}
              x={FIRST_WALL_X_OFFSET + COLLE_EPAISSEUR + CARREAU_EPAISSEUR}
              y={WALL_HEIGHT - 880 + 310}
            />,
            <rect
              fill="white"
              strokeWidth={3}
              stroke="white"
              width={1210}
              height={20}
              x={FIRST_WALL_X_OFFSET + COLLE_EPAISSEUR + CARREAU_EPAISSEUR}
              y={WALL_HEIGHT - 880}
            />,
            // paroie
            <rect
              fill="cyan"
              strokeWidth={3}
              stroke="cyan"
              width={10}
              height={PAROIE_DOUCHE_HEIGHT}
              x={
                FIRST_WALL_X_OFFSET +
                FIRST_WALL_WIDTH -
                RECEVEUR_LARGEUR -
                10 -
                COLLE_EPAISSEUR +
                CARREAU_EPAISSEUR
              }
              y={WALL_HEIGHT - PAROIE_DOUCHE_HEIGHT}
            />,
            // platine de douche
            <circle
              fill="white"
              strokeWidth={3}
              stroke="black"
              r={20}
              cx={FIRST_WALL_X_OFFSET + FIRST_WALL_WIDTH - (RECEVEUR_LARGEUR / 2) + 75}
              cy={WALL_HEIGHT - RECEVEUR_HAUTEUR - 1100}
            />,
            <circle
              fill="white"
              strokeWidth={3}
              stroke="black"
              r={20}
              cx={FIRST_WALL_X_OFFSET + FIRST_WALL_WIDTH - (RECEVEUR_LARGEUR / 2) - 75}
              cy={WALL_HEIGHT - RECEVEUR_HAUTEUR - 1100}
            />,
            // receveur
            <rect
              fill="white"
              strokeWidth={3}
              stroke="black"
              width={RECEVEUR_LARGEUR}
              height={RECEVEUR_HAUTEUR}
              x={
                FIRST_WALL_X_OFFSET +
                FIRST_WALL_WIDTH -
                RECEVEUR_LARGEUR -
                COLLE_EPAISSEUR +
                CARREAU_EPAISSEUR
              }
              y={WALL_HEIGHT - RECEVEUR_HAUTEUR}
            />,
            // paroie
            <rect
              fill="cyan"
              strokeWidth={3}
              stroke="cyan"
              width={PAROIE_DOUCHE_LARGEUR}
              height={PAROIE_DOUCHE_HEIGHT}
              x={SECOND_WALL_X_OFFSET + COLLE_EPAISSEUR + CARREAU_EPAISSEUR}
              y={WALL_HEIGHT - PAROIE_DOUCHE_HEIGHT}
              opacity={0.3}
            />,
            // receveur
            <rect
              fill="white"
              strokeWidth={3}
              stroke="black"
              width={RECEVEUR_LONGUEUR}
              height={RECEVEUR_HAUTEUR}
              x={SECOND_WALL_X_OFFSET + COLLE_EPAISSEUR + CARREAU_EPAISSEUR}
              y={WALL_HEIGHT - RECEVEUR_HAUTEUR}
            />,
            // bordure de porte
            <rect
              fill="white"
              strokeWidth={3}
              stroke="black"
              width={door.width + 2 * door.border}
              height={door.height + door.border}
              x={FOURTH_WALL_X_OFFSET + door.left - door.border}
              y={WALL_HEIGHT - (door.height + door.border)}
            />,
            // porte
            <rect
              fill="white"
              strokeWidth={3}
              stroke="black"
              width={door.width}
              height={door.height}
              x={FOURTH_WALL_X_OFFSET + door.left}
              y={WALL_HEIGHT - door.height}
            />,
            // wall 1
            <rect
              fill="transparent"
              strokeWidth={3}
              stroke="red"
              width={FIRST_WALL_WIDTH}
              height={WALL_HEIGHT}
              x={FIRST_WALL_X_OFFSET}
              y={0}
            />,
            // wall 2
            <rect
              fill="transparent"
              strokeWidth={3}
              stroke="red"
              width={SECOND_WALL_WIDTH}
              height={WALL_HEIGHT}
              x={SECOND_WALL_X_OFFSET}
              y={0}
            />,
            // wall 3
            <rect
              fill="transparent"
              strokeWidth={3}
              stroke="red"
              width={THIRD_WALL_WIDTH}
              height={WALL_HEIGHT}
              x={THIRD_WALL_X_OFFSET}
              y={0}
            />,
            // wall 4
            <rect
              fill="transparent"
              strokeWidth={3}
              stroke="red"
              width={FOURTH_WALL_WIDTH}
              height={WALL_HEIGHT}
              x={FOURTH_WALL_X_OFFSET}
              y={0}
            />
          ]}
        />
      </div>
      <div className={forms}>
        <form
          className={vertical}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const copy = { ...carreau };
            data.forEach((value: FormDataEntryValue, key: string) => {
              if (!isNaN(Number(value))) {
                switch (key) {
                  case "carreau_width":
                    copy.carreauWidth = Number(value);
                    break;
                  case "carreau_height":
                    copy.carreauHeight = Number(value);
                    break;
                  case "joint_width":
                    copy.jointWidth = Number(value);
                    break;
                }
              }
            });
            setCarreau(copy);
          }}
        >
          <h2>Calcul du motif du carrlage</h2>
          <div>
            <input
              type="number"
              name="carreau_width"
              id="carreau_width"
              defaultValue={carreau.carreauWidth}
              required
            />
            <label htmlFor="carreau_width">Largeur de Carreau (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="carreau_height"
              id="carreau_height"
              defaultValue={carreau.carreauHeight}
              required
            />
            <label htmlFor="carreau_height">Longeur de Carreau (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="joint_width"
              id="joint_width"
              defaultValue={carreau.jointWidth}
              required
            />
            <label htmlFor="joint_width">Épaisseur de joint (mm)</label>
          </div>

          <input type="submit" value="Calculer" />
        </form>
        <form
          className={vertical}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const copy = { ...window };
            data.forEach((value: FormDataEntryValue, key: string) => {
              if (!isNaN(Number(value))) {
                switch (key) {
                  case "width":
                    copy.width = Number(value);
                    break;
                  case "height":
                    copy.height = Number(value);
                    break;
                  case "border":
                    copy.border = Number(value);
                    break;
                  case "allege":
                    copy.allege = Number(value);
                    break;
                  case "left":
                    copy.left = Number(value);
                    break;
                }
              }
            });
            setWindow(copy);
          }}
        >
          <h2>Calcul de la position de la fenêtre</h2>
          <div>
            <input
              type="number"
              name="width"
              id="window_width"
              defaultValue={window.width}
              required
            />
            <label htmlFor="window_width">Largeur de la fenêtre (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="height"
              id="window_height"
              defaultValue={window.height}
              required
            />
            <label htmlFor="window_height">Longeur de fenêtre (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="border"
              id="window_border"
              defaultValue={window.border}
              required
            />
            <label htmlFor="window_border">Habillage de fenêtre (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="allege"
              id="window_allege"
              defaultValue={window.allege}
              required
            />
            <label htmlFor="window_allege">Allège de fenêtre (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="left"
              id="window_left"
              defaultValue={window.left}
              required
            />
            <label htmlFor="window_left">
              Distance avec le mur gauche (mm)
            </label>
          </div>
          <input type="submit" value="Calculer" />
        </form>
        <form
          className={vertical}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const copy = { ...door };
            data.forEach((value: FormDataEntryValue, key: string) => {
              if (!isNaN(Number(value))) {
                switch (key) {
                  case "width":
                    copy.width = Number(value);
                    break;
                  case "height":
                    copy.height = Number(value);
                    break;
                  case "border":
                    copy.border = Number(value);
                    break;
                  case "left":
                    copy.left = Number(value);
                    break;
                }
              }
            });
            setDoor(copy);
          }}
        >
          <h2>Calcul de la position de la porte</h2>
          <div>
            <input
              type="number"
              name="width"
              id="door_width"
              defaultValue={door.width}
              required
            />
            <label htmlFor="door_width">Largeur de la porte (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="height"
              id="door_height"
              defaultValue={door.height}
              required
            />
            <label htmlFor="door_height">Longeur de porte (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="border"
              id="door_border"
              defaultValue={door.border}
              required
            />
            <label htmlFor="door_border">Habillage de porte (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="left"
              id="door_left"
              defaultValue={door.left}
              required
            />
            <label htmlFor="door_left">Distance avec le mur gauche (mm)</label>
          </div>
          <input type="submit" value="Calculer" />
        </form>
        <form
          className={vertical}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const copy = { ...walls };
            data.forEach((value: FormDataEntryValue, key: string) => {
              if (!isNaN(Number(value))) {
                switch (key) {
                  case "door":
                    copy.door = Number(value);
                    break;
                  case "douche":
                    copy.douche = Number(value);
                    break;
                  case "empty":
                    copy.empty = Number(value);
                    break;
                  case "window":
                    copy.window = Number(value);
                    break;
                  case "height":
                    copy.height = Number(value);
                    break;
                }
              }
            });
            setWalls(copy);
          }}
        >
          <h2>Calcul de la taille des murs</h2>
          <div>
            <input
              type="number"
              name="douche"
              id="wall_douche"
              defaultValue={walls.douche}
              required
            />
            <label htmlFor="wall_douche">
              Largeur du mur de la douche (mm)
            </label>
          </div>
          <div>
            <input
              type="number"
              name="height"
              id="wall_window"
              defaultValue={walls.window}
              required
            />
            <label htmlFor="wall_window">
              Largeur du mur de la fenêtre (mm)
            </label>
          </div>
          <div>
            <input
              type="number"
              name="empty"
              id="wall_empty"
              defaultValue={walls.empty}
              required
            />
            <label htmlFor="wall_empty">Largeur du mur vide (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="door"
              id="wall_door"
              defaultValue={walls.door}
              required
            />
            <label htmlFor="wall_door">Largeur du mur de la porte (mm)</label>
          </div>
          <div>
            <input
              type="number"
              name="height"
              id="wall_height"
              defaultValue={walls.height}
              required
            />
            <label htmlFor="wall_height">Hauteur de plafond (mm)</label>
          </div>
          <input type="submit" value="Calculer" />
        </form>
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
reportWebVitals(console.log);
