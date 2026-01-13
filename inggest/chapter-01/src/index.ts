import { Inngest } from "inngest"

const inngest = new Inngest({ id: "hello-world-app" })

const helloFunction = inngest.createFunction(
    { id: "hello-world-function" },
    { event: "test/hello-world" },
    async ({ event, step }) => {
        console.log("hello from inngest");
        console.log("event recieved", event.name);
        console.log("data", event.data);

        return {
            message: `hello ${event.data.name || "Hello World"}`,
            recievedAt: new Date().toISOString
        }
    }
)

console.log("FUNCTION CREATED", helloFunction.id());


const multiStepFunction = inngest.createFunction(
    { id: 'multi-step-function' },
    { event: "demo/multi-step" },
    async ({ event, step }) => {
        //step 1: 
        const result1 = await step.run("step-1",
            async () => {
                console.log("executing step-1. ..");
                return { data: "result from step 1 " }
            }
        )
        console.log('step-1-done', result1);

        //sleep:
        await step.sleep("await-sleep", "5s")
        console.log('step-2-done');

        //step 2: 
        const result2 = await step.run("step-2",
            async () => {
                console.log("executing step-2. ..");
                return { data: "result from step 2 ", previous: result1 }
            }
        )
        console.log('step-3-done', result2);

        return {
            message: "multi step workflow completed",
            results: [result1, result2]
            
        }
    }
)


console.log("MULTI STEP", multiStepFunction.id());
