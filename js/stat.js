'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function createRect(ctx, rectX, rectY, rectHeight) {
  ctx.fillRect(rectX, rectY, BAR_WIDTH, rectHeight);
}

function generateColor(name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0 , 1)';
  } else {
    return 'hsl(240,' + Math.floor(Math.random() * 100) + '%,50%)';
  }
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  var maxTime = getMaxElement(times);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP * 2 + FONT_GAP * 2);

  ctx.fillStyle = '#000';
  var rectX;
  var rectY;
  var rectHeight;
  for (var i = 0; i < names.length; i++) {
    rectX = CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    rectHeight = (BAR_HEIGHT * times[i]) / maxTime;
    rectY = CLOUD_Y + BAR_HEIGHT - rectHeight + BAR_GAP * 2 - GAP;
    ctx.fillStyle = generateColor(names[i]);
    createRect(ctx, rectX, rectY, rectHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], rectX, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), rectX, CLOUD_HEIGHT - rectHeight - FONT_GAP * 2 - GAP);
  }
};

