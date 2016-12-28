function SetEnvironment(scene){
    
    let sun = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 1000, 0), scene);

    let skybox = BABYLON.Mesh.CreateSphere("skybox", 10, 2000, scene);
    let skyMaterial = new BABYLON.SkyMaterial("skyMaterial",scene);
    skyMaterial.backFaceCulling = false;
    skybox.material = skyMaterial;
    skyMaterial.luminance = 0.1;
    skyMaterial.rayleigh = 0;
    skyMaterial.turbidity = 15;
    skyMaterial.useSunPosition = true;
    skyMaterial.sunPosition = sun.position;

    //Ground
    var waterTextureUrl = "http://1.bp.blogspot.com/-MwXleupp6FM/UHU5pF4jYjI/AAAAAAAADcA/OXjgoPBpy8Y/s1600/Tileable+classic+water+texture.jpg";
    let water = BABYLON.Mesh.CreateGround("water",5000, 5000, 1, scene, false);
    let waterMaterial = new BABYLON.StandardMaterial("water", scene);
    waterMaterial.diffuseTexture = new BABYLON.Texture(waterTextureUrl, scene);
    waterMaterial.diffuseTexture.uScale = waterMaterial.diffuseTexture.vScale = 500;
    water.position.y = -5.0;
    water.material = waterMaterial;
    
}