var gamecanvas = document.getElementById("gamecanvas");

// to get rid of the margins of the body
document.body.style.display = "block";
document.body.style.top = "0px";
document.body.style.left = "0px";
document.body.style.margin = "0px";
document.body.style.margin = "0px";

// set the size of the canvas to the size of the screen
gamecanvas.setAttribute("width", window.innerWidth);
gamecanvas.setAttribute("height", window.innerHeight);

// get the paint mode
var canvascontext = gamecanvas.getContext("2d");


document.game = {};
document.game.direction = 0;
document.game.player = {};
document.game.player.x = 100;
document.game.player.y = 100;
document.game.player.speed = 2;
document.game.player.color = "black";
document.game.player.children = [];

document.game.food = {};
document.game.food.x = 50;
document.game.food.y = 50;
document.game.food.speed = 0;
document.game.food.color = "red";
document.game.food.hasCollisionWith = function(enemyObject){
    if(document.game.food.x==enemyObject.x&&document.game.food.y==enemyObject.y){
        return true;
    }
    var xA = document.game.food.x;
    var xB = document.game.food.x + 10;
    var yA = document.game.food.y;
    var yB = document.game.food.y + 10;
    if((xB>=enemyObject.x||xB>=enemyObject.x+10)&&(xA<=enemyObject.x||xA<=enemyObject.x+10) && (yB>=enemyObject.y||yB>=enemyObject.y+10)&&(yA<=enemyObject.y||yA<=enemyObject.y+10)){
        return true;
    }
    return false;
};


document.body.addEventListener("keydown", function (evt) {
    var pressedKey = evt.key;
    document.game.direction = pressedKey;
});

window.setInterval(function () {
    // this clears the screen
    canvascontext.reset();
    // this sets the direction of the snakehead
    if(document.game.direction=='a'){
        document.game.player.x -= document.game.player.speed;
    }
    if(document.game.direction=='d'){
        document.game.player.x += document.game.player.speed;
    }
    if(document.game.direction=='w'){
        document.game.player.y -= document.game.player.speed;
    }
    if(document.game.direction=='s'){
        document.game.player.y += document.game.player.speed;
    }
    // detect possible collision
    if(document.game.food.hasCollisionWith(document.game.player)){
        var us = document.game.player.children.push({...document.game.food});
        document.game.food.color = `rgb( ${Math.round(Math.random()*255)},${Math.round(Math.random()*255)},0)`;
        document.game.food.x = Math.round(Math.random()*gamecanvas.width);
        document.game.food.y = Math.round(Math.random()*gamecanvas.height);
    }
    
    // color of snake head 
    canvascontext.fillStyle = document.game.player.color;
    // head of snake
    canvascontext.fillRect(document.game.player.x,document.game.player.y,10,10);
    for(var i = 0 ; i < document.game.player.children.length ; i++){
        var currentChild = document.game.player.children[i];
        canvascontext.fillStyle = currentChild.color;
        if(document.game.direction=='a'){
            canvascontext.fillRect(document.game.player.x + (11*i), document.game.player.y , 10,10);
        }
        if(document.game.direction=='d'){
            canvascontext.fillRect(document.game.player.x - (11*i), document.game.player.y , 10,10);
        }
        if(document.game.direction=='w'){
            canvascontext.fillRect(document.game.player.x, document.game.player.y + (11*i) , 10,10);
        }
        if(document.game.direction=='s'){
            canvascontext.fillRect(document.game.player.x, document.game.player.y - (11*i) , 10,10);
        }
    }
    // this draws the food
    canvascontext.fillStyle = document.game.food.color;
    canvascontext.fillRect(document.game.food.x, document.game.food.y, 10,10);
}, 50);


