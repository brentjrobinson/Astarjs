
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

var rows = 5;
var cols = 5;
var grid = new Array();
var openSet = [];  // contains nodes that need to be evaluated (end condition when empty)
var closedSet = [];// contains evaluated nodes 
var start;
var end;
var w,h;
var path = [];



function Node(i, j){
	this.x = i;
	this.y = j;	
	this.f = 0;
	this.g = 0;
	this.h = 0;	
	this.previous = undefined;
	this.neighbors = [];
	
	this.addNeighbors = function(grid) {
    var i = this.x;
    var j = this.y;
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
		fill(color);
		stroke(0);
		rect(this.x * w, this.y * h, w-1, h-1);
		
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
	end = grid[rows - 1][cols -1];
	//begin evaluating at the starting node (upper left)
	openSet.push(start);
	console.log(grid);
	
}

function draw() {
 
  if (openSet.length > 0)
	  {
		  //continue evaluation
		  var lowestF = 0;
		  for (var i = 0; i < openSet.length; i++)
			{
				if (openSet[i].f <  openSet[lowestF].f){
					lowestF = i;
				}
			}
		  
		  var current = openSet[lowestF];
		  
		  if (current === end)
			  {
				  console.log("We found the path!!")
			  }
		  
		  removeSpot(openSet, current);
		  closedSet.push(current);
		  
		  //begin evaluating neighbors for next move
		  var neighbors = current.neighbors;
		  for (var i = 0; i < neighbors.length; i++){
			  var neighbor = neighbors[i];
			  
			  if (!closedSet.includes(neighbor)){
			  var tempG = current.g + 1;
				  
				  if (openSet.includes(neighbor)){
					  if (tempG < neighbor.g){
						  //better spot found
						  neightbor.g = tempG;
					  } else {
						  neighbor.g = tempG;
						  openSet.push(neighbors)
					  }
				  //guess who long it will take to the end
			  neighbor.h = heuristic(neighbor, end);
			  neighbor.f = neighbor.g + neighbor.h;
			  neighbor.previous = current;
		  }
				  
	}
			  }
	  }
		  else {
			  //condition, no solution
		  }
	  
	background(255);
	
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
	
	for (var i = 0; i < path.length; i++)
		{
			path[i].show(color(0, 0, 255));
		}
	

}