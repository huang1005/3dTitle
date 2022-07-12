import { h, defineComponent, Component } from "vue";
import { IconifyIconOffline } from "../index";
import { iconType } from "./types";

export function useRenderIcon(icon: string, attrs?: iconType): Component {
    // iconfont
    const ifReg = /^IF-/;
    // typeof icon === "function" 属于SVG

    return defineComponent({
        name: "Icon",
        render() {
            return h(IconifyIconOffline, {
                icon: icon,
                ...attrs
            });
        }
    });

}

