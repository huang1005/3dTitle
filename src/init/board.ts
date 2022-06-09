import { createApp } from 'vue'
import { IVMConfig } from "@/utils/type/type";
export function genBoard(config: IVMConfig,) {
  if (!config.component || !config.id) {
    return console.error("component or id is required");
  }
  const { component, id, options = {}, scene } = config
  let vm: HTMLElement;
  const Ctor = createApp(component)
  console.log(createApp(component));

  // vm = new Ctor(options)

}