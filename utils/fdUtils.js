const fs = require('fs').promises;
const { promisify } = require('util');

const exec = promisify(require('child_process').exec);


const positions = ['f', 'r', 'b', 'l']

function getArmsToRotate(input) {
    const regexPattern = /rotate [a-z]+ [a-z]+ arm([0-9]) \([0-9]\)/g;

    const array = [...input.matchAll(regexPattern)];
    const rotations = array.map(a => a[1]);

    return rotations;
}

async function processAndReplace(arms, init, goals, inputFile, outputFile) {
    try {
        const fileContent = await fs.readFile(inputFile, 'utf-8');

        const processedContent = fileContent
            .replace(/%ARMS%/g, arms)
            .replace(/%INITIAL%/g, init)
            .replace(/%GOAL%/g, goals);
        await fs.writeFile(outputFile, processedContent, 'utf-8');

        const fdPath = 'fast-downward-23.06/fast-downward.py';

        const command = `${fdPath} planning/twist-domain.pddl ${outputFile} --heuristic "h=ff()" --search "astar(h)"`;

        const { stdout, stderr } = await exec(command);


        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
        }

        // fs.unlink(outputFile);
        return getArmsToRotate(stdout);
    } catch (error) {
        console.error(`Error executing command or deleting file: ${error.message}`);
    }
}

function generateInitalArm(n, arms) {
    const indexCurrent = positions.indexOf(arms[n].current);
    var indexParent;
    if(arms[n].parent == -1){
        indexParent = 0
    } else {
        indexParent = positions.indexOf(arms[arms[n].parent].current);
    }
    var relativeDirection = (indexCurrent - indexParent) % 4
    if(relativeDirection < 0) {
        relativeDirection+=4;
    }
    const result = positions[relativeDirection];
    return result;
}

function generateGoal(arms, n) {
    const result = arms[n].goal;
    return result;
}
function generateGoals(arms) {
    const goals = []
    for (let i = 0; i < arms.length; i++) {
        goals.push(`(arm-at arm${i} ${generateGoal(arms, i)})`)
    }
    return goals.join('\n');
}
async function calculateRotations(input) {
    // Convert the buffer to a string and remove trailing newline
    const letterData = require(`../letters/${input}.json`);
    const nrArms = letterData.arms.length;

    const armsString = Array.from({ length: nrArms }, (_, index) => `arm${index}`).join(' ');
    const init = Array.from({ length: nrArms }, (_, index) => `(arm-at arm${index} ${generateInitalArm(index, letterData.arms)})`).join('\n');
    const goals = generateGoals(letterData.arms);

    return await processAndReplace(armsString, init, goals, 'planning/twist-problem-template.pddl', `planning/twist-problem-${input}.pddl`)
}

export default calculateRotations;
