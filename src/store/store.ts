import { hookstate } from "@hookstate/core";

let store = hookstate({
    events: [],
    home: [],
    theevent: {},
    user: {}
})

export default store;
