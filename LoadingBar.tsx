import {
  Rect,
  runTiming,
  Shader,
  Skia,
  useCanvas,
  useClockValue,
  useDerivedValue,
  useValue,
  useValueEffect,
} from '@shopify/react-native-skia';
import React, { FC } from 'react';

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
  const { size } = useCanvas();
  const clock = useClockValue();
  const uniforms = useDerivedValue(() => ({ iTime: clock.current }), [clock]);
  const value = useValue(0);

  // The canvas has width === 0 in the first render, so we need to start the animation after the value is set
  useValueEffect(size, () => {
    runTiming(
      value,
      { from: 0, to: size.current.width, loop: true },
      {
        duration: 10000,
      },
    );
  });

  return (
    <>
      <Rect x={0} y={0} width={value} height={50}>
        <Shader source={source} uniforms={uniforms} />
      </Rect>
    </>
  );
};
