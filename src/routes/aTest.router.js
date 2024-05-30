import CustomRouter from "./custom/custom.router.js";
import { testQuery } from "../controllers/querys.controller.js";

export default class testExtendRouter extends CustomRouter {
  init() {

    this.get('/', ["PUBLIC"], async (req, res) => {
      console.log("testExtendRouter");
      testQuery(req, res);
    });

  }
}