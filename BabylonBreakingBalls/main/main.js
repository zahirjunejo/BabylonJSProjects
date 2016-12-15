        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var initBallSpeed = 0.05;
		var ballSpeed = initBallSpeed;
		var xDirection = 1;
		var yDirection = 1; 
		var keyState = {};
		var blockCount = 0;


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
	        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -20), scene);
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

            scene.registerAfterRender(function(){
               
            	ball.position.x += ballSpeed * xDirection;
            	ball.position.y += ballSpeed * yDirection;
                
                if(ball.position.y < -7){
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
                

				for(i=0;i<10;i+=2){
					for(j=0;j<6;j+=2){

				        var testMesh = scene.getMeshByName("enemy" + i + "" + j);

		                if(testMesh && !testMesh.isDisposed() && 
		                	ball.intersectsMesh(testMesh, false))
						{  
		                   xDirection *= -1;
		                   yDirection *= -1;
		                   testMesh.dispose();
		                   blockCount--;
						}

					}
				}


 				if (keyState[37] || keyState[65]){
				     bat.position.x-=ballSpeed*2;
				}    

				if (keyState[39] || keyState[68]){
				     bat.position.x+=ballSpeed*2;
				}


            });

		    return scene;
        };
        
        var scene = MainScene();

        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
   
