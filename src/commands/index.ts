import PingCommand, { getData as getPingData } from "./ping";
import CreateCommand, { getData as getCreateData } from "./create";

export {
  PingCommand,
  CreateCommand
}

export default [
  getPingData,
  getCreateData
]