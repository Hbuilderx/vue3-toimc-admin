declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type TargetContext = '_self' | '_blank'
