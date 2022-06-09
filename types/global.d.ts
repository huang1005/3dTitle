interface IuseStore extends Store<State> {
    state: State;
    getters: Getters;
    dispatch: Dispatch,
    commit: Commit
}

declare interface batchArgsConfig {
    Cesium: any,
    layer: any,
    viewer: any,
    scene: any,
    store: IuseStore
}

declare interface CesiumConfig {
    Cartographic: { fromCartesian: (arg0: any) => any; },
    Math: { toDegrees: (arg0: any) => any; };
}


