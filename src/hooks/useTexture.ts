import { Assets, Texture } from "pixi.js";
import { useEffect, useState } from "react";



const useTexture = (assetPath: string) => {
    const [texture, setTexture] = useState<Texture>(Texture.EMPTY);

    useEffect(() => {
        let isActive = true;
        Assets.load(assetPath)
            .then((loadedTexture) => {
                if (isActive) {
                    setTexture(loadedTexture);
                }
            })
            .catch((error) => {
                console.error(`Falha ao carregar textura de ${assetPath}:`, error);
            });

        return () => {
            isActive = false;
        };
    }, []);

    return texture;
};

export default useTexture;
