import { Controller, Get } from "@alanchenchen/express-decorator";

@Controller()
export default class Home {
    @Get()
    index(req, res) {
        res.send("hello decorator index");
    }
}