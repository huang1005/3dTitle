import { get } from "@/utils/helper";

function createEventContainer() {
    return {}
}

function firEvent(container: any, name: string, arg: any[], append: any[] = []) {
    [...get(container, [name], []), ...append].forEach(fn => {
        fn && fn(...arg)
    })
}

function regEvent(container: any, typeOrRes: { name: string; fn: (pick: any) => void; }[]) {
    const sRe = (type: string | number, fn: any) => {
        let evts = get(container, [type]);
        if (!evts) {
            container[type] = [];
        }
        container[type].push(fn);
    }
    typeOrRes.forEach(type => {
        const { name, fn } = type
        sRe(name, fn)
    })
}
export {
    firEvent,
    regEvent,
    createEventContainer
}
