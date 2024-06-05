let Triangles = function(p) {
    // Your p5.js sketch code for Triangles
    
    let rows, cols, cellSize, numLines, lineWeight;
    let matrix, directionMatrix, colorMatrix;
    let bk = '#FFF8DC';
    let colorSet = ['#4793AF', '#DD5746', '#003C43', '#FFC470'];
  
    p.setup = function() {
      p.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      p.canvas.position(0, 0);
      p.canvas.style('z-index', '-1');
      
      lineWeight = 3; //default 3, 0 for none
      cellSize = 100; //width and height of cell
      numLines = 10;
      cols = p.int(p.displayWidth / cellSize + 1);
      rows = p.int(p.displayHeight / cellSize + 1);
      
      matrix = new Matrix();
      directionMatrix = matrix.directionMatrix;
      colorMatrix = matrix.colorMatrix;
      
      p.noLoop();
    }
  
  p.draw = function() {
    p.background(bk);
    
    for (let r = 0; r < rows; r++){
      let centerY = r * cellSize;
      
      for (let c = 0; c < cols; c++){
        let centerX = c * cellSize;
        
        let left_x = centerX - cellSize/2;
        let right_x = centerX + cellSize/2;
        let top_y = centerY - cellSize/2;
        let bott_y = centerY + cellSize/2;
        
        //assign color
        switch (colorMatrix[r][c]) {
          case 0: p.fill(colorSet[0]); break;
          case 1: p.fill(colorSet[1]); break;
          case 2: p.fill(colorSet[2]); break;
          case 3:
          case 4: p.fill(colorSet[3]); break;
        }
        
        //draw triangles
        p.noStroke();
        switch (directionMatrix[r][c]) {
        case 0: p.triangle(left_x, top_y, left_x, bott_y, right_x, bott_y); break; // Left/Bottom Triangle
        case 1: p.triangle(left_x, bott_y, left_x, top_y, right_x, top_y); break; // Left/Top Triangle
        case 2: p.triangle(left_x, top_y, right_x, top_y, right_x, bott_y); break; // Right/Top Triangle
        case 3:
        case 4: p.triangle(right_x, top_y, right_x, bott_y, left_x, bott_y); break; // Right/Bottom Triangle
        }
      }//end column loop
      
      //draw lines for the row
      p.strokeWeight(lineWeight);
      p.stroke(bk);
      
      let lineSpace = p.round(cellSize / numLines);
      
      for (let l = 0; l < numLines; l++) {
          let lineY  = centerY - (cellSize/2) + (lineSpace * l);
          if (lineY <= centerY + (cellSize/2)) { //do not draw past bounds of row
            p.line(0, lineY, p.width, lineY);
          }
        }
    }//end row loop
  }
  
  class Matrix {
    constructor(){
      this.directionMatrix = new Array(rows);
      this.colorMatrix = new Array(rows);
      
      for (let r = 0; r < rows; r++) {
        this.directionMatrix[r] = new Array(cols);
        this.colorMatrix[r] = new Array(cols);
        
        for (let c = 0; c < cols; c++) {
          let rndDirection = intRandom(4);
          let rndColor = intRandom(colorSet.length);
          
          this.directionMatrix[r][c] = rndDirection;
          this.colorMatrix[r][c] = rndColor;
        }//end column
      }//end row
    }
  }
  
  function intRandom(input){
    return Math.floor(Math.random() * input);
  }
  
  p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  }
  export default Triangles;