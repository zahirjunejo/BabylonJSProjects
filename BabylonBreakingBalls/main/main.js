        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
		var ballSpeed = 0.05;

        var MainScene = function () {
		
	        // This creates a basic Babylon Scene object (non-mesh)
	        var scene = new BABYLON.Scene(engine);
	                
	        // This creates and positions a free camera (non-mesh)
	        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -20), scene);
	        camera.attachControl(canvas);

            var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
            
            //Setup the bat for the scene. Dont know what else to call it.
	        var bat = BABYLON.Mesh.CreateBox("bat", 0.5, scene);
            bat.scaling.x = 5.0;
            bat.position.y = -5.0;

            //Setup the ball
            var ball = BABYLON.Mesh.CreateSphere("ball", 5, 0.5,scene);
            ball.position.y = -4.0;

            //Setup the walls
            // Top Wall
            var topWall = BABYLON.Mesh.CreateBox("topWall", 0.5, scene);
            topWall.position.y = 6.0;
            topWall.scaling.x = 25.0;

            // Left Wall
            var leftWall = BABYLON.Mesh.CreateBox("leftWall", 0.5, scene);
            leftWall.position.x = -6.0;
            leftWall.position.y = 1.0;
            leftWall.scaling.y = 20.0;


            // Right Wall
            var rightWall = BABYLON.Mesh.CreateBox("rightWall", 0.5, scene);
            rightWall.position.x = 6.0;
            rightWall.position.y = 1.0;
            rightWall.scaling.y = 20.0;

            var enemy1 = BABYLON.Mesh.CreateBox("enemy1", 1.0, scene);
            enemy1.position.x = -3.0;
            enemy1.position.y = 3.0;
            
            var enemy2 = BABYLON.Mesh.CreateBox("enemy2", 1.0, scene);
            enemy2.position.x = 0.0;
            enemy2.position.y = 3.0;

            var enemy3 = BABYLON.Mesh.CreateBox("enemy3", 1.0, scene);
            enemy3.position.x = 3.0;
            enemy3.position.y = 3.0;

            var enemy4 = BABYLON.Mesh.CreateBox("enemy4", 1.0, scene);
            enemy4.position.x = -3.0;
            enemy4.position.y = 0.0;
            
            var enemy5 = BABYLON.Mesh.CreateBox("enemy5", 1.0, scene);
            enemy5.position.x = 0.0;
            enemy5.position.y = 0.0;

            var enemy6 = BABYLON.Mesh.CreateBox("enemy6", 1.0, scene);
            enemy6.position.x = 3.0;
            enemy6.position.y = 0.0;

            scene.registerBeforeRender(function(){

            	ball.position.x += ballSpeed;
            	ball.position.y += ballSpeed;


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
   
