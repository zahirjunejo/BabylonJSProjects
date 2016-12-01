        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var StartScene = function () {
		
	        // This creates a basic Babylon Scene object (non-mesh)
	        var scene = new BABYLON.Scene(engine);
	                
	        // This creates and positions a free camera (non-mesh)
	        var camera = new BABYLON.FreeCamera("camera1", 
                         new BABYLON.Vector3(0, 0, 0), scene);
	          
            
            var startScreen = new BABYLON.ScreenSpaceCanvas2D(scene, { 
                              id: "ScreenCanvas",  backgroundFill: "#4040404F",
                              backgroundRoundRadius: 10 });
		    
		    return scene;
        };
        
        var scene = StartScene();

        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
   
