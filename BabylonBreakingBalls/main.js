     

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
		
        var createScene = function () {
		
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
                
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -20), scene);
                                                    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
                
				
					var skybox = SetupSkyBox(scene);
				
                    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
                    var asteroid1 = BABYLON.Mesh.CreateSphere("asteroid1", 10, 2, scene);
        			var asteroid2 = asteroid1.clone("asteroid2");
        			var asteroid3 = asteroid1.clone("asteroid3"); 
            			 
        		    asteroid2.position.x = 5;
        			 
        			asteroid3.position.x = -5;
        		
				// Change this to scene.pick() function because this one is deprecated
        		scene.onPointerDown = function(event, pickResult){
						
        			if(pickResult.hit && pickResult.pickedMesh.name != "skybox"){
				  
					var brokenParts = new BABYLON.ParticleSystem("gunshot", 2000, scene);
				    brokenParts.particleTexture = new BABYLON.Texture("textures/fireball.png", scene);
					brokenParts.direction1 = new BABYLON.Vector3(-7, -8, 1);
					brokenParts.direction2 = new BABYLON.Vector3(7, 8, 1);
					brokenParts.manualEmitCount = 300;
					brokenParts.emitter = new BABYLON.Vector3(pickResult.pickedMesh.position.x,
					                                          pickResult.pickedMesh.position.y,
					    									  pickResult.pickedMesh.position.z); 
					
					brokenParts.start();	
					
		            // put in any x between 1 and 20
        			pickResult.pickedMesh.position.x = Math.floor((Math.random() * 20))-10; 				  
        				 
					// put in any y between 1 and 40
					pickResult.pickedMesh.position.y = Math.floor((Math.random() * 10))-5; 
					
					}
				   
        		};
        		
				
                    return scene;
        
        };
        
        var scene = createScene();

        engine.runRenderLoop(function () {
            scene.render();
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
   
