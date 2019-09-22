import { Controller, Get } from "@alanchenchen/express-decorator";

@Controller()
export default class Home {
    @Get()
    private index(req: any, res: any) {
        res.send("hello decorator index");
    }
}