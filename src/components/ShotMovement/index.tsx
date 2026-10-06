
import { useTick } from '@pixi/react';
import type { BulletProps, ShotListProps } from '../../types/types';

const ShotMovement = ({ setShotList }: ShotListProps) => {
    useTick((ticker) => {
        setShotList(prev => prev.map(n => {
            const alteredShot: BulletProps = {
                id: n.id,
                x: n.x,
                y: n.y - (5 * ticker.deltaTime),
            }
            return alteredShot;
        }));
    });
    return null;
};

export default ShotMovement;