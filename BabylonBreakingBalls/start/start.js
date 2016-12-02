        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var StartScene = function () {
		
	        // This creates a basic Babylon Scene object (non-mesh)
	        var scene = new BABYLON.Scene(engine);
	                
	        // This creates and positions a free camera (non-mesh)
	        var camera = new BABYLON.FreeCamera("camera1", 
                         new BABYLON.Vector3(0, 0, 0), scene);
	          
            
            var startScreen = new BABYLON.ScreenSpaceCanvas2D(scene, { 
                              id: "ScreenCanvas",  backgroundFill: "#0061ffff",
                              backgroundRoundRadius: 10, width: window.innerWidth,
                              height:window.innerHeight});
    
            var startButton = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "start", x: window.innerWidth * 0.25, 
             y: window.innerHeight * 0.4, width: window.innerWidth * 0.5, 
             height: window.innerHeight * 0.2, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("Start Game", { 
                  marginAlignment: "h: center, v: center", fontName:"40pt Arial" 
                })
            ]
            });
            startButton.pointerEventObservable.add(function (ppi, es) {
            window.location.replace("../main/index.html");
            }, BABYLON.PrimitivePointerInfo.PointerUp);
		  

            var hiScoreButton = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "hiscore", x: window.innerWidth * 0.25, 
             y: window.innerHeight * 0.15, width: window.innerWidth * 0.5, 
             height: window.innerHeight * 0.2, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("High Score", { 
                  marginAlignment: "h: center, v: center", fontName:"40pt Arial" 
                })
            ]
            });
            /*startButton.pointerEventObservable.add(function (ppi, es) {
            window.location.replace("../main/index.html");
            }, BABYLON.PrimitivePointerInfo.PointerUp);*/

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
   
