import { useState } from 'react';
import spaceshipSprite from '../../assets/nave.png';
import { GAME_HEIGHT, GAME_WIDTH } from '../../const/game-world';
import UseControls from '../../hooks/useControls';
import useTexture from '../../hooks/useTexture';
import type { ScreenPlayProps } from '../../types/types';
import { useTick } from '@pixi/react';

const SHIP_SPEED = 5;
const HALF_SHIP = 22; 

const Spaceship = ({ playing }: ScreenPlayProps) => {
    const texture = useTexture(spaceshipSprite);
    const keys = UseControls();
    const [x, setX] = useState(GAME_WIDTH / 2);

    useTick((ticker) => {
        const dir = 
        (keys.current.has('ArrowRight') ? 1 : 0) -
        (keys.current.has('ArrowLeft') ? 1 : 0)

        setX((prev) => {
            const next = prev + dir * SHIP_SPEED * ticker.deltaTime;
            return Math.max(HALF_SHIP, Math.min(GAME_WIDTH - HALF_SHIP, next))
        })
    });

    return (
        playing ? (
            <pixiSprite
                texture={texture}
                anchor={0.5}
                x={x}
                y={GAME_HEIGHT - 60}
                scale={0.07}
            />
        ) : <></>
    );
}

export default Spaceship;
