
import useTexture from '../../hooks/useTexture';

import shootSprite from '../../assets/shoot.png';
import type { BulletProps } from '../../types/types';

const Shoot = ({ x, y }: BulletProps) => {
    const texture = useTexture(shootSprite);

    return (
        <pixiSprite
            texture={texture}
            anchor={0.5}
            x={x}
            y={y}
            scale={0.07}
        />
    );
};

export default Shoot;