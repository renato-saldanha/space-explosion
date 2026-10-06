import { useRef, useState } from 'react';
import spaceshipSprite from '../../assets/nave.png';
import { GAME_WIDTH, SPACESHIP_POSITION, SPACESHIP_Y } from '../../const/game-world';
import UseControls from '../../hooks/useControls';
import useTexture from '../../hooks/useTexture';
import type { SpaceshipProps } from '../../types/types';
import { useTick } from '@pixi/react';

const SHIP_SPEED = 5;
const HALF_SHIP = 22;
const SHOOT_INTERVAL = 500;

const Spaceship = ({ playing, position, onShoot }: SpaceshipProps) => {
    const texture = useTexture(spaceshipSprite);
    const keys = UseControls();
    const [x, setX] = useState(SPACESHIP_POSITION);
    const cronometro = useRef(0);

    if (playing) {
        useTick((ticker) => {
            const dir =
                (keys.current.has('ArrowRight') ? 1 : 0) -
                (keys.current.has('ArrowLeft') ? 1 : 0)

            const next_position = position.current + dir * SHIP_SPEED * ticker.deltaTime;
            position.current = Math.max(HALF_SHIP, Math.min(GAME_WIDTH - HALF_SHIP, next_position));

            setX(position.current);
            cronometro.current += ticker.deltaMS;

            if (keys.current.has('Space') && cronometro.current >= SHOOT_INTERVAL) {
                onShoot();
                cronometro.current = 0;
            };
        });
    };

    return (
        playing ? (
            <pixiSprite
                texture={texture}
                anchor={0.5}
                x={x}
                y={SPACESHIP_Y}
                scale={0.07}
            />
        ) : <></>
    );
}

export default Spaceship;
