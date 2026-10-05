# Space Explosion

Jogo de nave espacial em 2D feito para estudar **PixiJS 8** com **React 19** e **TypeScript**. O jogador controla uma nave na parte de baixo da tela, em um mundo com fundo animado.

> Projeto de estudo, em desenvolvimento.

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [PixiJS](https://pixijs.com) | 8.x | Renderização 2D no canvas |
| [@pixi/react](https://react.pixijs.io) | 8.x | Componentes React para o Pixi (`<pixiSprite>`, `<pixiContainer>`) |
| React | 19.x | Interface (menu, botão, título) e estado do jogo |
| TypeScript | 6.x | Tipagem |
| Vite | 8.x | Servidor de desenvolvimento e build |

A fonte do jogo é a **Orbitron**, carregada pelo Google Fonts no `index.html`.

## Como rodar

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # verificação de tipos (tsc) + build de produção
npm run preview   # serve o build localmente
npm run lint      # ESLint
```

## Como jogar

| Tecla | Ação |
|---|---|
| Clique em **Clique para começar** | Inicia o jogo |
| Seta esquerda | Move a nave para a esquerda |
| Seta direita | Move a nave para a direita |
| Espaço | Atirar *(planejado)* |

## Status

- [x] Fundo animado (duas imagens alternando a cada 600 ms)
- [x] Mundo de tamanho fixo (960×540, 16:9) ajustado à janela
- [x] Tela inicial com título e botão Play piscando
- [x] Nave posicionada na base do mundo
- [x] Movimento horizontal da nave com as setas, com limite nas bordas
- [ ] Tiros (Espaço), com intervalo entre disparos
- [ ] Meteoros descendo
- [ ] Colisões (tiro × meteoro, meteoro × nave)
- [ ] Explosões, pontuação e vidas
- [ ] Tela de game over e reinício
- [ ] Sons

## Estrutura do projeto

```
src/
├── assets/               Imagens (fundos, nave, laser, meteoros)
├── components/
│   ├── MainContainer/    Canvas do Pixi + fundo animado + decide menu/jogo
│   ├── Header/           Título "SPACE EXPLOSION" (HTML, pisca no menu)
│   ├── ButtonPlay/       Botão de início (HTML, pisca no menu)
│   └── Scapeship/        Nave do jogador (sprite do Pixi + movimento)
├── const/game-world.ts   Tamanho do mundo (GAME_WIDTH × GAME_HEIGHT)
├── helpers/commom.tsx    calculateDimensions (escala) e tickScreen (pisca)
├── hooks/
│   ├── useControls.ts    Teclas pressionadas (useRef + Set)
│   ├── useDimensions.ts  Escala do mundo conforme a janela
│   └── useTexture.ts     Carrega uma textura com Assets.load
└── types/types.tsx       Tipos compartilhados
```

## Como funciona

### Mundo fixo e escala

O jogo vive em um mundo de **960 × 540** (`const/game-world.ts`). As posições e velocidades são sempre em pixels *desse* mundo, e não da tela. O `calculateDimensions` calcula uma `scale` (a menor entre `janela/mundo` nos dois eixos) e o `<pixiContainer scale={scale}>` amplia ou reduz tudo junto. Assim o jogo se comporta igual em qualquer tamanho de janela e a imagem não é deformada.

### HTML por cima do canvas

Texto e botões são **HTML**, e não objetos do Pixi: o `Header` e o `ButtonPlay` ficam como irmãos do `<PixiApplication>`, posicionados com `position: absolute` sobre o `.main-container` (que é `position: relative` e tem o tamanho do canvas). Dentro do `<PixiApplication>` só podem existir elementos do Pixi.

### Estado do jogo

O `MainContainer` guarda `playing`. Antes do Play aparecem o título e o botão piscando; depois, os dois somem e a nave é renderizada.

### Movimento

O `useControls` guarda as teclas pressionadas em um `Set` dentro de um `useRef`, sem causar re-render. O `Spaceship` lê esse conjunto a cada quadro no `useTick`, calcula a direção, soma `velocidade × deltaTime` e limita a posição às bordas do mundo.

## Convenções e armadilhas do `@pixi/react` v8

- As tags `<pixiContainer>` e `<pixiSprite>` só existem depois de `extend({ Container, Sprite })`.
- Texturas são carregadas com `Assets.load` (hook `useTexture`), e o sprite recebe `texture={...}`.
- `useTick` só funciona em componentes **dentro** do `<PixiApplication>`.
- **Nunca** deixe texto solto dentro da árvore do Pixi, nem um fragmento com espaço (`<> </>`): o React lança *"Text instances are not yet supported"* e o canvas deixa de atualizar.
- O `@pixi/react` v8 exige React 19.

## Assets

As imagens ficam em `src/assets` e são importadas pelo Vite. Mantenha-as **pequenas e com fundo transparente (PNG RGBA)**: sprites de milhares de pixels pesam e obrigam a usar escalas minúsculas.

## Próximos passos

1. Tiros com a barra de espaço (lista de tiros, subida, remoção fora da tela, intervalo entre disparos).
2. Meteoros que nascem no topo e descem.
3. Colisões com caixas retangulares menores que o sprite.
4. Explosões, pontuação, vidas e tela de game over.
