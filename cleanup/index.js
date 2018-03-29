const util = require('util');
const exec = util.promisify(require('child_process').exec);
let allWorkDone = false;

const clearAllBuckets = async () => {
  const { stdout, stderr } = await run("aws s3api list-buckets");
  if(stderr) logAndExit(stderr);
  const bucketsData = JSON.parse(stdout);

  for(let bucket of bucketsData.Buckets) {
    try {
      await run(`aws s3 rm s3://${bucket.Name} --recursive`);
    } catch(error) {
      console.log(`Ignoring error ${error}`);
    }
  }
};


const pushApiCommonStackToTheEnd = (stacksData) => {
  return stacksData.Stacks.reduce((accumulator, stack) => {
    if (stack.StackName.includes("api-common")) {
      accumulator.push(stack);
    } else {
      accumulator.unshift(stack);
    }
    return accumulator;
  }, [])
};

const deleteStack = async (stack) => {
  const { stderr } = await run(`aws cloudformation delete-stack --stack-name ${stack.StackName}`);
  if(stderr) logAndExit(stderr);
  return run(`aws cloudformation wait stack-delete-complete --stack-name ${stack.StackName}`);
};

const deleteAllStacks = async () => {
  const { stdout, stderr } = await run("aws cloudformation describe-stacks");
  if(stderr) logAndExit(stderr);
  const stacksData = JSON.parse(stdout);
  const stacks = pushApiCommonStackToTheEnd(stacksData);

  Promise.all(stacks.map(stack => deleteStack(stack)))
    .then(outputs => {
      for(let output of outputs){
        if(output.stderr) logAndExit(output.stderr)
      }
      allWorkDone = true;
    })
};


const logAndExit = (error) => {
  console.error(error);
  process.exit(1);
};

const run = (command) => {
  console.log(`Running command ${command}`);
  return exec(command)
};

const deleteEveryThing = async () => {
  await clearAllBuckets();
  deleteAllStacks();
};

deleteEveryThing();


setTimeout(() => {
  if(allWorkDone) process.exit(0)
}, 1000);