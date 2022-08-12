/* eslint-disable */

import '@lukit/css'
import { isElectron } from "@lukit/util";

console.log("================");
console.log("isElectron  >>>>>>", isElectron);
console.log("================");

class MyError extends Error {}
const err = new MyError()
console.log(err instanceof Error);
console.log(err instanceof MyError);
