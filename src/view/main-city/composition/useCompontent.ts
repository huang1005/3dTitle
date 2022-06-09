
import StationBoard from "@/components/board/station-board.vue";
import { genBoard } from "@/init/board";
import { get, set, isObject } from "@/utils/helper";

function initCompontent(batchArgs: batchArgsConfig) {
    const { store, scene } = batchArgs
    const station = store.state["modules/station"]
    Object.keys(station).reduce((prev, _curr) => {
        // let vm = genBoard({
        //     position: "1",
        //     component: StationBoard,
        //     id: "1"
        //     store,
        //     scene: scene,
        // })

        return [...prev, _curr]
    }, [] as string[])
}

export function useCompontent() {
    return {
        initCompontent
    }
}