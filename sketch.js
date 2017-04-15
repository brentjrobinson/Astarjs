
function removeSpot (array, elem)
{
	// remove array if found from back, this will be the most recent in the set
	for (var i = array.length -1; i >= 0; i-- )
		{
			if (array[i] == elem)
				{
					array.splice(i,1);
				}
		}
}

function heuristic(a, b) {
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

var rows = 15;
var cols = 15;
var grid = new Array();
var openSet = [];  // contains nodes that need to be evaluated (end condition when empty)
var closedSet = [];// contains evaluated nodes 
var start;
var end;
var w,h;
var path = [];



function Node(i, j){
	this.i = i;
	this.j = j;	
	this.f = 0;
	this.g = 0;
	this.h = 0;	
	this.previous = undefined;
	this.neighbors = [];
	
	this.wall = false;
  	if (random(1) < 0.4) {
    this.wall = true;
  }
	
	this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    
	if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
   
  }
	
	this.show = function(color){
		if (this.wall){
		fill(255);
				stroke(255);
		}
		else {
		fill(color);
		stroke(0);
		rect(this.x * w, this.y * h, w-1, h-1);
		}
		
	}
}

function setup() {
	
	createCanvas(400,400)
	console.log("Finding path...");
	w = width/cols;
	h = height / rows; 
	
	
  for (var i = 0; i < cols; i++) {
    	grid[i] = new Array(rows);
  	}

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Node(i, j);
    }
  }
	
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
	
	start = grid[0][0];
	end = grid[rows-1][cols-1];
	//begin evaluating at the starting node (upper left)
	openSet.push(start);
	
}

function draw() {
 
  // Am I still searching?
  if (openSet.length > 0) {

    // Best next option
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    // Did I finish?
    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    // Best option moves from openSet to closedSet
    removeSpot(openSet, current);
    closedSet.push(current);
 var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
     // Valid next spot?
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);

        // Is this a better path than before?
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        // Yes, it's a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
		  else {
			  //condition, no solution
			  console.log("NO SOLUTION!!!");
			  noLoop();
			  return;
		  }
	  
	for (var i = 0; i < cols; i++) {
    	for (var j = 0; j < rows; j++) {
      		grid[i][j].show(255);
    	}
  	}
	
	for (var i = 0; i < closedSet.length; i++)
		{
			closedSet[i].show(color(255,0,0));
		}
	for (var i = 0; i < openSet.length; i++)
		{
			openSet[i].show(color(0,255,0));
		}
	 	
	// highlight string of parents to the end
	 path = [];
	 var temp = current;
  	 path.push(temp);
     while (temp.previous) {
     path.push(temp.previous);
     temp = temp.previous;
  }
	
	for (var i = 0; i < path.length; i++)
		{
			path[i].show(color(0, 0, 255));
		}
	

	}
  }
}