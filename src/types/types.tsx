import type { Dispatch, RefObject, SetStateAction } from "react";

export type ScreenPlayProps = {
    playing: boolean;
};

export type SpaceshipProps = ScreenPlayProps & {
    position: RefObject<number>;
    onShoot: () => void;
};

export type BulletProps = {
    id: number;
    x: number;
    y: number;
};

export type ShotListProps = {
    setShotList: Dispatch<SetStateAction<BulletProps[]>>;
};