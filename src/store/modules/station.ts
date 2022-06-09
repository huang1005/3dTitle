const state = {
    one: {
        location: [122.124490311495, 37.5168228457094, 6.00010832771659],
        supplyRes: "one", // 所供小区 小区配置里的第一个小区
        isNoBox: false, // 只要board不要box
        info: {
            name: "戚谷疃站",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
            isAI: false,
            imge: "mapassets/imgs/AI_circle.png",
            heat: "高温水热电厂", // 所属热源
            heatBranch: "博通热源东线", // 热源分支
            heatInhousing: [{ name: "和谐家园" }, { name: "海林社区" }], // 供热小区
        },
    },
    two: {
        location: [122.05107691852824, 37.49980801065763, 10],
        supplyRes: "two", // 所供小区Id
        isNoBoard: true, // 只要box不要board
        info: {
            name: "安平巷",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
            isAI: false,
            imge: "mapassets/imgs/AI_circle.png",
            heat: "高温水热电厂", // 所属热源
            heatBranch: "博通热源东线", // 热源分支
            heatInhousing: [{ name: "和谐家园" }, { name: "海林社区" }], // 供热小区
        },
    },
    three: {
        location: [122.11192759026525, 37.51041331101794, 10],
        supplyRes: "two", // 所供小区
        info: {
            name: "光明社区",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
        },
    },
    four: {
        location: [122.03519308935861, 37.5040105353473, 10],
        supplyRes: "two", // 所供小区
        info: {
            name: "金猴西海",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
            heat: "高温水热电厂", // 所属热源
            heatBranch: "博通热源西线", // 热源分支
            heatInhousing: [{ name: "安居小区" }, { name: "翠微园" }], // 供热小区
        },
    },
    five: {
        location: [122.095551349846, 37.5142934901553, 8.42707450408489],
        supplyRes: "two",
        isNoBox: false, // 只要board不要box
        info: {
            name: "神道口B区站",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
        },
    },
    six: {
        location: [122.05867134643579, 37.50167024827821, 10],
        supplyRes: "one",
        isNoBoard: true, // 只要box不要board
        info: {
            name: "洪福庄园",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
        },
    },
    seven: {
        location: [122.0748015824378, 37.505867444368896, 10],
        supplyRes: "one",
        info: {
            name: "柴峰小区",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
        },
    },
    eight: {
        location: [122.09420110378944, 37.503232196948574, 10],
        supplyRes: "one",
        info: {
            name: "名流花园",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
        },
    },
    nine: {
        location: [122.067328742945, 37.5215156705832, 11.9999986831099],
        supplyRes: "three",
        isNoBox: false, // 只要board不要box
        info: {
            name: "昌鸿K区站",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
        },
    },
    ten: {
        location: [122.05127234697743, 37.510920638187315, 10],
        supplyRes: "one",
        info: {
            name: "一品雅苑",
            oneSupplyPressure: "0.36",
            oneReturnPressure: "0.28",
            oneSupplyTemperature: "72.03",
            oneReturnTemperature: "67.11",
            temperatureDifference: "72.03",
            differentialPressure: "0.36",
        },
    },
}
const getters = {
    stationArray(state: {}) {
        return Object.keys(state).map(name => ({
            id: `station_${name}`
        }));
    }
}
const mutations = {

}
export default {
    state,
    getters,
    mutations,
};