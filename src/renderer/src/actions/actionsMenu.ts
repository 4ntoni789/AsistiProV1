import { ACTIVEMENU, SUBMENUACTIVE } from "@renderer/type";

export const ActivatedMenu = (value: any) => ({ type: ACTIVEMENU, value });

export const ActiveSubMenu = (value: any) => ({ type: SUBMENUACTIVE, value });