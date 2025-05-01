function setup() {
    cvn = createCanvas(800, 600);
    cvn.parent('canvas-holder');
    background('#d3f3d1');
    noLoop();
  }
  
  function drawBamboo(x, h) {
    let segments = int(random(6, 10));
    let segmentHeight = h / segments;
  
    stroke('#2e8b57');
    strokeWeight(12);
  
    for (let i = 0; i < segments; i++) {
      let y1 = i * segmentHeight;
      let y2 = y1 + segmentHeight;
      line(x, y1, x, y2);
  
      stroke('#145c37');
      strokeWeight(4);
      line(x - 6, y2, x + 6, y2);
  
      strokeWeight(12);
      stroke('#2e8b57');
    }
  }
  
  function draw() {
    const stalkSpacing = 80;
    const numStalks = floor(width / stalkSpacing);
    const startX = (width - (numStalks - 1) * stalkSpacing) / 2;
  
    for (let i = 0; i < numStalks; i++) {
      let x = startX + i * stalkSpacing;
      drawBamboo(x, height);
    }
  }