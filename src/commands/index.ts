import PingCommand, {getData as getPingData} from "./ping";
import CreateCommand, {getData as getCreateData} from "./create";
import ListCommand, {getData as getListData} from "./list";

export {
    PingCommand,
    CreateCommand,
    ListCommand
}

export default [
    getPingData,
    getCreateData,
    getListData
]