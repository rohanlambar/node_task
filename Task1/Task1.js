import {createServer} from "http"
import { parse } from "url";


const server = createServer((req,res)=>{
    console.log("server received request",req.url);
    const receivedUrl = parse(req.url);
    switch(receivedUrl.pathname){
               case "/":
                        res.end("Hello world");
                        break;
                case "/about":
                        res.end("About us");
                        break;
                case "/contact":
                        res.end("Contact us");
                        break;
                default:
                        res.end("404 page not found");
                        break;               
                
    }
});



server.listen(8000,()=>{console.log("server is listining of port 8000")})
