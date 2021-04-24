import { RefObject } from 'react';

export type AnimationType = 'fadeIn' | 'fadeOut' | 'shake' | 'slideInUp' | 'slideInOut';
export type UseAnimatedType = AnimationType | [AnimationType, AnimationType];

export type AnimationTargets = Element | ReadonlyArray<Element> | null;

type FunctionBasedParameter = (element: HTMLElement, index: number, length: number) => number;

export interface AnimationOptions {
  maxDebounceSize?: number;
  duration?: number | FunctionBasedParameter;
  delay?: number | FunctionBasedParameter;
}

export interface GetAnimationOptions extends AnimationOptions {
  targets: AnimationTargets | null;
}

export interface UseAnimatedOptions {
  root?: Element | null;
  rootMargin?: string;
  autoTrigger?: boolean;
  autoTriggerOnce?: boolean;
  animationOpt?: AnimationOptions;
}

export interface UseAnimatedProps {
  targets?: AnimationTargets;
  type: UseAnimatedType;
  opt?: UseAnimatedOptions;
}

export interface UseAnimatedReturnProps<T extends Element> {
  trigger: () => void;
  ref: RefObject<T>;
}
