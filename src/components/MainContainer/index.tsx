import { useEffect, useRef, useState } from 'react';
import { extend, Application as PixiApplication } from '@pixi/react';

import useDimensions from '../../hooks/useDimensions';
import useTexture from '../../hooks/useTexture';
import { GAME_HEIGHT, GAME_WIDTH, SPACESHIP_POSITION, LASER_SPAWN_Y } from '../../const/game-world';

import background1 from '../../assets/background.png';
import background2 from '../../assets/background2.png';
import { Container, Sprite } from 'pixi.js';
import ButtonPlay from '../ButtonPlay';
import Header from '../Header';
import Spaceship from '../Scapeship';
import type { BulletProps } from '../../types/types';
import Shoot from '../Shoot';
import ShotMovement from '../ShotMovement';


extend({ Container, Sprite })

const MainContainer = () => {
  const { width, height, scale } = useDimensions();
  const levelBackgroundFist = useTexture(background1);
  const levelBackgroundSecond = useTexture(background2);
  const [showFirstBackground, setShowFirstBackground] = useState(true);
  const [playing, setPlaying] = useState(false);
  const nextBulletKey = useRef<number>(1);

  const [shotList, setShotList] = useState<BulletProps[]>([]);
  const spaceshipPosition = useRef<number>(SPACESHIP_POSITION);

  const shoot = () => {
    const newShoot: BulletProps = {
      id: nextBulletKey.current++,
      x: spaceshipPosition.current,
      y: LASER_SPAWN_Y,
    };

    setShotList(prev => [...prev, newShoot]);
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    interval = setInterval(() => {
      setShowFirstBackground(prev => !prev);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-container" style={{ width, height }}>
      <PixiApplication width={width} height={height}>
        <pixiContainer scale={scale}>
          <pixiSprite
            texture={levelBackgroundFist}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            visible={showFirstBackground}
          />
          <pixiSprite
            texture={levelBackgroundSecond}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            visible={!showFirstBackground}
          />
          <Spaceship
            playing={playing}
            position={spaceshipPosition}
            onShoot={shoot}
          />
          {/* TODO(human): crie um componente dentro do PixiApplication que, 
          a cada quadro (useTick), faça os tiros subirem e remova os que saíram da 
          tela */}
          <ShotMovement
            setShotList={setShotList}
          />
          {shotList.map((s) => (
            <Shoot
              id={s.id}
              key={s.id}
              y={s.y}
              x={s.x}
            />
          ))}
        </pixiContainer>
      </PixiApplication>
      <Header
        playing={playing}
      />
      <ButtonPlay
        playing={playing}
        onClick={() => setPlaying(true)}
      />
    </div>
  );
};

export default MainContainer;