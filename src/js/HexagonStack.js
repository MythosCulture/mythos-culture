let HexagonStack = function(p) {
    // HexagonStack p5.js sketch code
    
    let cols, rows, cellWidth, cellHeight; //grid variables
    let radius, hexHoleRnd, translateY, vertSpaceAdj, horzSpaceAdj; //hexagon variables
    let stackNum, stackSmooth, dataMatrix, stackMatrix, hexHoleMatrix; //matrix/stack variables
  
    ///COLORS///
    let bk, colorMatrix;
    let BK = ["#87A5A5", "#BFA8BE", "#D9896D", "#F26666", "#A0DEAE", "#40352C"];
    let Color1 = ["#8C3E37", "#5E608C", "#F29B88", "#D9C2AD", "#A64B63", "#537D91"]; //darker colors
    let Color2 = ["#BF573F", "#E9F0F2", "#F2CC85", "#F2D6B3", "#F2AB6D", "#DEA895"]; // lighter colors
    //The indexes match intended palette so they should be used together (I.E. Color1[0] goes w/ Color2[0])
  
    p.setup = function() {
      p.canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      p.canvas.position(0, 0);
      p.canvas.style('z-index', '-1');
      bk = p.random(BK);
      
      //Hexagon parameters
      radius = 70;
      vertSpaceAdj = 1.6; //adjusts space between columns; bigger number = more space
      horzSpaceAdj = 1.8; //adjusts space between rows
      hexHoleRnd = 5;
      translateY = 20;
      stackNum = 7;
      stackSmooth = 200;
      
      cellWidth = radius * vertSpaceAdj;
      cellHeight = radius * horzSpaceAdj;
      cols = p.int(p.displayWidth / cellWidth + 1);
      rows = p.int(p.displayHeight / cellHeight + 1);
      
      dataMatrix = new Matrix();
      colorMatrix = dataMatrix.colorMatrix;
      hexHoleMatrix = dataMatrix.hexHoleMatrix;
      stackMatrix = dataMatrix.stackMatrix;
      stackMatrix = dataMatrix.runAverageMultiple(stackSmooth);
      
      p.noLoop();
    }
  
  p.draw = function() {
    p.background(bk);
    
    for (let r = 0; r < rows; r++) {
      // EVEN COLUMNS
      // Need to be drawn first so that the offset odd columns are drawn over them
      for (let c = 0; c < cols; c++) {
        let centerX = c * cellWidth;
        let centerY = r * cellHeight;
        
        if (c % 2 == 0) { 
          drawAllHex(centerX, centerY, radius, c, r);
        }
      }
      // ODD COLUMNS
      for (let c = 0; c < cols; c++) {
        let centerX = c * cellWidth;
        let centerY = r * cellHeight + cellHeight / 2;
        
        if (c % 2 != 0) {
          drawAllHex(centerX, centerY, radius, c, r);
        }
      }
    }//end of rows for loop
  }//end of function draw()
  
  function drawAllHex(centerX, centerY, radius, c, r) {
    let shadowColor = Color1[colorMatrix[r][c]];
    let baseColor = Color2[colorMatrix[r][c]];
    
    for (let i = 0; i < stackMatrix[r][c]; i++) {
      if (i == 1) {
        p.fill(shadowColor);
        HexagonShadow(centerX, centerY, radius, translateY);
        p.fill(baseColor);
        Hexagon(centerX, centerY, radius);
        HexHole(centerX, centerY, radius, translateY, shadowColor, bk, hexHoleMatrix[r][c]);
      }
      else if (i > 1) {
        p.fill(shadowColor);
        HexagonShadow(centerX, centerY - (i + 1 * translateY), radius, translateY + 3);
        p.fill(baseColor);
        Hexagon(centerX, centerY - (i + 1 * translateY), radius);
        HexHole(centerX, centerY - (i + 1 * translateY), radius, translateY, shadowColor, baseColor, hexHoleMatrix[r][c]);
      }
    }
  }//end of drawAllHex()
  function HexHole(centerX, centerY, radius, translateY, shadowColor, fillColor, hexChance) {
    if (hexChance == 1) { //randomly add hole to hexagon
      p.push();
      p.translate(centerX, centerY + translateY / 2); //translate so that 0,0 is center of shape
      p.fill(shadowColor);
      p.rotate(p.PI); //rotate at 0,0
      p.scale(1.1, 1);
      HexagonShadow(0, 0, radius - (radius / 2), translateY);
      p.fill(fillColor);
      Hexagon(0, 0, radius - (radius / 2));
      p.pop();
    }
  } //end HexHole()
  
  function Hexagon(centerX, centerY, radius) {
    p.noStroke();
    p.beginShape();
    //While a < TWO_PI (full circumference of a circle)
    //Increment by angle value, which will increment for the number of verticies originally given
    for (let a = 0; a < p.TWO_PI; a += p.TWO_PI / 6) {
      let sx = centerX + p.cos(a) * radius;
      let sy = centerY + p.sin(a) * radius;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  } //end Hexagon()
  
  function HexagonShadow(centerX, centerY, radius, translateY) {
    //creates a dropshadow  for Hexagon() by creating the same hexagon offset by specified amount
    //then drawing a rectangle 
    Hexagon(centerX, centerY + translateY, radius);
    p.noStroke();
    //the 4 coordinates of the quad
    //Could plug these into the quad() but this is easier to read the point values for me
    let xy1 = [centerX + radius, centerY]; //TL
    let xy2 = [centerX + radius, centerY + translateY]; //TR
    let xy3 = [centerX - radius, centerY]; //BL
    let xy4 = [centerX - radius, centerY + translateY]; //BR
    p.quad(xy1[0], xy1[1], xy2[0], xy2[1], xy3[0], xy3[1], xy4[0], xy4[1]);
  } //end HexagonShadow()
  
  /////////MATRIX CLASS/////////
  class Matrix {
    constructor() {
      this.stackMatrix = new Array(rows);
      this.colorMatrix = new Array(rows);
      this.hexHoleMatrix = new Array(rows);
      
      for (let r = 0; r < rows; r++) {
        this.stackMatrix[r] = new Array(cols);
        this.colorMatrix[r] = new Array(cols);
        this.hexHoleMatrix[r] = new Array(cols);
        
        for (let c = 0; c < cols; c++) {
          let rndNum = intRandom(stackNum);
          let rndColor = intRandom(Color1.length);
          let rndHole = intRandom(hexHoleRnd);
          
          this.stackMatrix[r][c] = rndNum;
          this.colorMatrix[r][c] = rndColor;
          this.hexHoleMatrix[r][c] = rndHole;
        }//end column
      }//end row
    }//end of Matrix(rows,cols)
    
    runAverageMultiple(num) {
      for (let i = 0; i < num; i++) {
        this.AverageValues();
      }
      return this.stackMatrix;
    }
    
    AverageValues() {
      let rndRow = intRandom(rows);
      let rndCol = intRandom(cols);
      //print("rndRow: " + rndRow)
      let searchMatrix = [
        [rndRow - 1, rndCol], //above
        [rndRow, rndCol - 1], //left1
        [rndRow - 1, rndCol - 1], //left1
        [rndRow, rndCol + 1], //right1
        [rndRow + 1, rndCol + 1], //right2
        [rndRow + 1, rndCol] //below
      ];
      let low = 0;
      let mid = 0;
      let high = 0;
      
      for (let i = 0; i < 6; i++) {
        let searchedRow = searchMatrix[i][0];
        let searchedColumn = searchMatrix[i][1];
        //checking for out of bounds values
        if ((searchedRow >= 0 && searchedRow < rows) && (searchedColumn >= 0 && searchedColumn < cols)) {
          //checks if searched value is lower, higher, or the same as the selected value and tallies result
          if (this.stackMatrix[searchedRow][searchedColumn] < this.stackMatrix[rndRow][rndCol]) {
            low++;
          }
          else if (this.stackMatrix[searchedRow][searchedColumn] > this.stackMatrix[rndRow][rndCol]) {
            high++;
          }
          else { 
            mid++;
          }
        }//end if
      }//end of for loop
    
      if (low > mid) {
        this.stackMatrix[rndRow][rndCol]--;
      }
      else if (high > mid) {
        this.stackMatrix[rndRow][rndCol]++; 
      }
    }//end of AverageValues()
  }//End of Matrix() class
  
  /////////// Utility Functions ///////////
  
  function printMatrix(givenarray) { //print matrix for testing values
    for (let i = 0; i < givenarray.length; i++) {
      for (let j = 0; j < givenarray[i].length; j++) {
        console.log(givenarray[i][j] + "\t");
      }
      console.log();
    }
  }
  
  function intRandom(input) {
    return p.int(p.random(input));
  }
  
  p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
  
  }
  export default HexagonStack;
  