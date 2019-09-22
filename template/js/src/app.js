import { Root, Listen, Router } from "@alanchenchen/express-decorator";
import home from "./controllers/home";

@Router(
    home
)
@Root()
export default class App  {
    @Listen()
    bootstrap() {
        console.log("server is running at http://localhost:3000");
    }
}