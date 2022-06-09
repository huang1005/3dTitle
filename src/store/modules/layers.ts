import { url } from "inspector";

const state = {
    // 地图
    map: {
        url: '/3dTiles/wh/tileset.json'
    },
    // 换热站
    residenceOne: {
        url: "/3dTiles/residenceOne/tileset.json",
    },

};


const getters = {
    getLayers: (state: { [x: string]: { [x: string]: any; }; }) => (name: string) => {
        return state[name] && state[name]["url"] || "map"
    }
}
const mutations = {

}
export default {
    state,
    getters,
    mutations,
};