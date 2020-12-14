import { BasePage } from "../base/base-page";

export type PageConstructor<T = {}> = new (...args: any[]) => BasePage;
export type Callback = (...args: any[]) => void;

