     

        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);

		function SetupSkyBox(scene){
			    
				// Skybox
				var skybox = BABYLON.Mesh.CreateBox("skybox", 100.0, scene);
				var myskyboxMaterial = new BABYLON.StandardMaterial("skybox", scene);
				myskyboxMaterial.backFaceCulling = false;
				myskyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skyTron/skybox",scene);
				myskyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
				myskyboxMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
				myskyboxMaterial.specularColor = new BABYLON.Color3(0,0,0);
				myskyboxMaterial.disableLighting = true;
				skybox.material = myskyboxMaterial;
				
				return skybox;
		}
		
        var MainScene = function () {
		
	        // This creates a basic Babylon Scene object (non-mesh)
	        var scene = new BABYLON.Scene(engine);
	                
	        // This creates and positions a free camera (non-mesh)
	        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -20), scene);
	        camera.attachControl(canvas);                                            
	        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
	                
	        // Default intensity is 1. Let's dim the light a small amount
	        light.intensity = 0.7;
			var skybox = SetupSkyBox(scene);
		    
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
   
