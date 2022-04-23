import {
  Rect,
  Shader,
  Skia,
  useCanvasSize,
  useClockValue,
  useDerivedValue,
  useTiming,
} from '@shopify/react-native-skia';
import React, { FC, useEffect } from 'react';

const source = Skia.RuntimeEffect.Make(`
uniform float iTime;
half4 main(float2 fragCoord) {
  return half4(mix(float3(0, 0.75, 0), float3(0, 1 ,0), sin((fragCoord.x + (-iTime / 3)) / 100)), 1);
}
`);

if (!source) {
  throw new Error("Couldn't compile the shader");
}

export const LoadingBar: FC = () => {
  const canvasSize = useCanvasSize().current;
  const width = canvasSize.width;
  const height = canvasSize.height;
  const clock = useClockValue();
  const uniforms = useDerivedValue(() => ({ iTime: clock.current }), [clock]);
  const value = useTiming(
    { to: width, loop: true, from: 0 },
    {
      duration: 10000,
    },
  );

  // Somehow it is necessary to rerender once to start the useTiming animation
  // Note this also breaks on fast refresh
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rerender, setRerender] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRerender(r => r + 1);
    }, 100);
  }, []);

  return (
    <>
      <Rect x={0} y={0} width={value} height={height}>
        <Shader source={source} uniforms={uniforms} />
      </Rect>
    </>
  );
};
