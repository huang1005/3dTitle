import { createStore } from 'vuex'
import branch from "./modules/branch";
const modulesFiles = import.meta.globEager('./modules/*.ts')

const modules = Object.keys(modulesFiles).reduce((modules: { [x: string]: any; }, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles[modulePath]
    modules[moduleName] = value.default
    return modules
}, {})

export default createStore({
    modules,
});