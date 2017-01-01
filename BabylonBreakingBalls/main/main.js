var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var initBallSpeed = 0.05;
var ballSpeed = initBallSpeed;
var xDirection = 1;
var yDirection = 1; 
var keyState = {};
var blockCount = 0;
var score = 0;
var lives = 3;
var pause = false;


var Restart = function(){
    window.location.replace("../main/index.html");
};

var Quit = function(){
    window.location.replace("../start/index.html");
}

var SetupBoard = function(scene){ 

	for(i=0;i<10;i+=2){
		for(j=0;j<6;j+=2){

	        var enemy = BABYLON.Mesh.CreateBox("enemy" + i + "" + j, 
	        	              1.0, scene);
	        enemy.position.x = i - 4;
	        enemy.position.y = j;
            blockCount++;
		}
	}


};

var MainScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);
            
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", 
                   new BABYLON.Vector3(0, 0, -18), scene);
    //camera.attachControl(canvas, true);
    var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    
    //Setup the bat for the scene. Dont know what else to call it.
    var bat = BABYLON.Mesh.CreateBox("bat", 0.5, scene);
    bat.scaling.x = 5.0;
    bat.position.y = -5.0;

    //Setup the ball
    var ball = BABYLON.Mesh.CreateSphere("ball", 5, 0.5,scene);
    ball.position.y = bat.position.y + 1;
    ball.position.x = bat.position.x;

    //Register keypress actions with the ball
    scene.actionManager = new BABYLON.ActionManager(scene);

    window.addEventListener('keydown',function(e){
	    keyState[e.keyCode || e.which] = true;
   },true);

  	window.addEventListener('keyup',function(e){
  	    keyState[e.keyCode || e.which] = false;
  	},true);

//       scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
//       	BABYLON.ActionManager.OnEveryFrameTrigger,
			 //  function (evt) {
		
    // }));

    //Setup the walls
    // Top Wall
    var topWall = BABYLON.Mesh.CreateBox("topWall", 0.5, scene);
    topWall.position.y = 6.0;
    topWall.scaling.x = 25.0;

    // Left Wall
    var leftWall = BABYLON.Mesh.CreateBox("leftWall", 0.5, scene);
    leftWall.position.x = -6.0;
    leftWall.position.y = 1.0;
    leftWall.scaling.y = 25.0;

    // Right Wall
    var rightWall = BABYLON.Mesh.CreateBox("rightWall", 0.5, scene);
    rightWall.position.x = 6.0;
    rightWall.position.y = 1.0;
    rightWall.scaling.y = 25.0;

    SetupBoard(scene);

    // TODO: Setup the GUI here
    var gameGUI = new BABYLON.ScreenSpaceCanvas2D(scene, { id: "gameGUI"});
    // Quit button
    var quitButton = new BABYLON.Rectangle2D(
    {
     parent: gameGUI, id: "quit", x: window.innerWidth * 0.3, 
     y: 0, width: window.innerWidth * 0.1, 
     height: window.innerHeight * 0.1, 
     fill: "#000a1cff", roundRadius: 10, 
     children: 
    [
        new BABYLON.Text2D("QUIT", { 
          marginAlignment: "h: center, v: center", 
          fontName:"18pt Arial" 
        })
    ]
    });
    quitButton.pointerEventObservable.add(function (ppi, es) {
    Quit();
    }, BABYLON.PrimitivePointerInfo.PointerUp);

    // Lives
    var livesText = new BABYLON.Rectangle2D(
    {
     parent: gameGUI, id: "lives", x: window.innerWidth * 0.45, 
     y: 0, width: window.innerWidth * 0.1, 
     height: window.innerHeight * 0.1, 
     children: 
    [
        new BABYLON.Text2D("Lives: " + lives, { 
          marginAlignment: "h: center, v: center", 
          fontName:"18pt Arial" 
        })
    ]
    });

    // Score
    var scoreText = new BABYLON.Rectangle2D(
    {
     parent: gameGUI, id: "score", x: window.innerWidth * 0.6, 
     y: 0, width: window.innerWidth * 0.1, 
     height: window.innerHeight * 0.1, 
     children: 
      [
        new BABYLON.Text2D("Score: " + score, { 
          marginAlignment: "h: center, v: center", 
          fontName:"18pt Arial" 
        })
      ]
    });


    scene.registerAfterRender(function(){
        if(pause)
            return;
       
    	ball.position.x += ballSpeed * xDirection;
    	ball.position.y += ballSpeed * yDirection;
        
        if(ball.position.y < -7){
            if(blockCount <= 0){
              SetupBoard(scene);
            }
            lives--;
            livesText.children[0].text = "Lives: " + lives;
        	ball.position.y = bat.position.y + 1;
        	ball.position.x = bat.position.x;
        	ballSpeed = initBallSpeed;
        	xDirection = yDirection = 1;
        }



    	if(ball.intersectsMesh(rightWall, true)){
      		xDirection = -1;
    	}

            if(ball.intersectsMesh(leftWall, true)){    
    		xDirection = 1;
    	}
    	
    	if(ball.intersectsMesh(topWall, true)){
    		yDirection = -1;
    	}

    	if(ball.intersectsMesh(bat, true)){
    		 yDirection = 1;

        	 if(blockCount <= 0){
                 SetupBoard(scene);
             }

    		 if(ballSpeed <= 0.25){
    		     ballSpeed+=0.01;
    		 }

    	}
        
        // Handling collision with the blocks
		for(i=0;i<10;i+=2){
			for(j=0;j<6;j+=2){

		        var testMesh = scene.getMeshByName("enemy" + i + "" + j);

                if(testMesh && !testMesh.isDisposed() && 
                	ball.intersectsMesh(testMesh, false))
				{  
                   //xDirection *= -1;                           
                   yDirection *= -1;
                   testMesh.dispose();
                   blockCount--;
                   score+=10;
                   scoreText.children[0].text = "Score: " + score;
				}

			}
		}

        if(lives <= 0){
            //window.location.replace('../highscores/index.html')
            //TODO: Make dialog box for saving score appear.
            $("#GameOverDialog")
                .modal({backdrop: 'static', keyboard: false});
            pause = true;

        }


			if (keyState[37] || keyState[65]){
            if(bat.position.x > leftWall.position.x + (bat.scaling.x / 3))
		     bat.position.x-=ballSpeed*2;
		}    

		if (keyState[39] || keyState[68]){
            if(bat.position.x < rightWall.position.x - (bat.scaling.x / 3))
		     bat.position.x+=ballSpeed*2;
		}


    });

    return scene;
};

var scene = MainScene();
scene.clearColor = new BABYLON.Color3( 0.0, 0.0, 0.0);
SetEnvironment(scene);
engine.runRenderLoop(function () {
    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

