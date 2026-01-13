import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    {id: "hello-world"},
    {event: "test/hello.world"},
    async ({event,step})=>{
        console.log("event triggered by" , event.name),
        console.log();
        
    }
)