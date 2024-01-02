import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

const possible = ['f', 'r', 'b', 'l'];

export function isGoodDirection(arm, data) {
  const indexCurrent = possible.indexOf(arm.current);
  const indexGoal = possible.indexOf(arm.goal);
  var indexParent = 0;
  var currentChild = data.arms.indexOf(arm);
  while(data.arms[currentChild].parent != -1) {
    currentChild = data.arms[currentChild].parent;
    indexParent = (indexParent + possible.indexOf(data.arms[currentChild].goal) ) % 4;
  }
  console.log(data.arms.indexOf(arm) + " : "  + indexCurrent + " " + indexParent + " " + indexGoal);
  const relativeDirection = (indexCurrent - indexParent) > 0 ? (indexCurrent - indexParent) % 4 : (indexCurrent - indexParent + 4) % 4;
  return relativeDirection === indexGoal;
}
function modifyDirections(parent, data) {

  const treeMap = letterToMap(data);
  parent.current = possible[(possible.indexOf(parent.current) + 1) % possible.length];
  const children = treeMap.get(parent);
  if (!children || children.length === 0) {
    return; // No children to render
  }
  for (const child of children) {
    modifyDirections(child, data);
  }
}
export function rotate(data, index, setLetterData) {
  const arm = data.arms[index];
  modifyDirections(arm, data);
  setLetterData(data);
}

function drawCircle(x, y, radius, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function renderTreeLines(data, parent, startX, startY, ctx) {
  const treeMap = letterToMap(data);
  const children = treeMap.get(parent);
  const lineLength = parent.lenght * 5;
  let currentX = startX;
  let currentY = startY;
  switch (parent.current) {
    case 'r':
      currentX -= lineLength;
      break;
    case 'l':
      currentX += lineLength;
      break;
    case 'b':
      currentY -= lineLength;
      break;
    case 'f':
      currentY += lineLength;
      break;
    default:
      break;
  }
  if (parent !== -1) {

    drawCircle(startX, startY, 5, ctx);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }
  if (!children || children.length === 0) {
    return; // No children to render
  }

  for (const child of children) {
    if (parent.current) {
      child.parentDirection = parent.parentDirection + possible.indexOf(parent.current);
    }

    // Recursively render lines for each child
    renderTreeLines(data, child, currentX, currentY, ctx);
  }
}

function letterToMap(letterData) {
  const arms = letterData.arms;
  const map = new Map();
  for (let i = 0; i < arms.length; i++) {
    if (arms[i].parent == -1) {
      if (map.get(-1) === undefined) {
        map.set(-1, [arms[i]]);
      } else {
        map.get(-1).push(arms[i]);
      }
    } else {
      if (map.get(arms[arms[i].parent]) === undefined) {
        map.set(arms[arms[i].parent], [arms[i]]);
      } else {
        map.get(arms[arms[i].parent]).push(arms[i]);
      }
    }
  }
  return map;
}
export function renderLines(data, ctx, width, height) {
  const treeMap = letterToMap(data);
  const startX = width / 2;
  const startY = height / 2;
  ctx.clearRect(0, 0, width, height);
  if (treeMap.get(-1).length === 1) {
    renderTreeLines(data, -1, startX, startY, ctx);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    if(data.origin == "right") {
    ctx.lineTo(startX + 25, startY);
    } else {
      ctx.lineTo(startX - 25, startY);
    }
    ctx.stroke();
  } else {
    treeMap.get(-1)[0].parentDirection = 0;
    treeMap.get(-1)[1].parentDirection = 0;
    renderTreeLines(data, treeMap.get(-1)[0], startX - 13, startY, ctx)
    renderTreeLines(data, treeMap.get(-1)[1], startX + 12, startY, ctx)
    ctx.beginPath();
    ctx.moveTo(startX - 13, startY);
    ctx.lineTo(startX + 12, startY);
    ctx.stroke();
  }
}