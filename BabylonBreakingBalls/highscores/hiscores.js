        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        var ScoreScene = function () {
		
	        // This creates a basic Babylon Scene object (non-mesh)
	        var scene = new BABYLON.Scene(engine);
	                
	        // This creates and positions a free camera (non-mesh)
	        var camera = new BABYLON.FreeCamera("camera1", 
                         new BABYLON.Vector3(0, 0, 0), scene);
	          
            
            var startScreen = new BABYLON.ScreenSpaceCanvas2D(scene, { 
                              id: "ScreenCanvas"});
    
            var score1 = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "score1", x: 0, 
             y: window.innerHeight * 0.8, width: window.innerWidth, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("Score 1", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });
             
            var score2 = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "score2", x: 0, 
             y: window.innerHeight * 0.65, width: window.innerWidth, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("Score 2", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });

            var score3 = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "score3", x: 0, 
             y: window.innerHeight * 0.5, width: window.innerWidth, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("Score 3", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });

            var score4 = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "score4", x: 0, 
             y: window.innerHeight * 0.35, width: window.innerWidth, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("Score 4", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });

            var score5 = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "score5", x: 0, 
             y: window.innerHeight * 0.2, width: window.innerWidth, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("Score 5", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });

            var upButton = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "up", x: window.innerWidth * 0.4, 
             y: 0, width: window.innerWidth * 0.1, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("NEXT", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });

            var downButton = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "down", x: window.innerWidth * 0.2, 
             y: 0, width: window.innerWidth * 0.1, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("PREV", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });



            var backButton = new BABYLON.Rectangle2D(
            {
             parent: startScreen, id: "back", x: window.innerWidth * 0.6, 
             y: 0, width: window.innerWidth * 0.1, 
             height: window.innerHeight * 0.1, 
             fill: "#000a1cff", roundRadius: 10, 
             children: 
            [
                new BABYLON.Text2D("BACK", { 
                  marginAlignment: "h: center, v: center", fontName:"18pt Arial" 
                })
            ]
            });
            backButton.pointerEventObservable.add(function (ppi, es) {
            window.location.replace("../start/index.html");
            }, BABYLON.PrimitivePointerInfo.PointerUp);

        return scene;
        };
        
        var scene = ScoreScene();

        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
   
