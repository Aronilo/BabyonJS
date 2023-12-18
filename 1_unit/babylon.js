// const canvas = document.getElementById("renderCanvas"); // Get the canvas element
//       const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

//       // Add your code here matching the playground format
//       const createScene = function () {
//         const scene = new BABYLON.Scene(engine);

//         BABYLON.MeshBuilder.CreateBox("box", {});

//         const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
//         camera.attachControl(canvas, true);
//         const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

//         return scene;
//       };

//       const scene = createScene(); //Call the createScene function

//       // Register a render loop to repeatedly render the scene
//       engine.runRenderLoop(function () {
//         scene.render();
//       });

//       // Watch for browser/canvas resize events
//       window.addEventListener("resize", function () {
//         engine.resize();
//       });



// Создаем сцену и движок
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

// Создание камеры
var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Создание света
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);


// Создаем массив с координатами вершин куба
// var vertices = [];
// vertices.push(new BABYLON.Vector3(-0.5, -0.5, -0.5)); // V0
// vertices.push(new BABYLON.Vector3(0.5, -0.5, -0.5)); // V1
// vertices.push(new BABYLON.Vector3(0.5, -0.5, 0.5)); // V2
// vertices.push(new BABYLON.Vector3(-0.5, -0.5, 0.5)); // V3
// vertices.push(new BABYLON.Vector3(-0.5, 0.5, -0.5)); // V4
// vertices.push(new BABYLON.Vector3(0.5, 0.5, -0.5)); // V5
// vertices.push(new BABYLON.Vector3(0.5, 0.5, 0.5)); // V6
// vertices.push(new BABYLON.Vector3(-0.5, 0.5, 0.5)); // V7

const indices = [
    [new BABYLON.Vector3(-0.5, -0.5, -0.5),
    new BABYLON.Vector3(0.5, -0.5, -0.5)],
    [new BABYLON.Vector3(0.5, -0.5, -0.5),
    new BABYLON.Vector3(0.5, -0.5, 0.5)],
    [new BABYLON.Vector3(0.5, -0.5, 0.5),
    new BABYLON.Vector3(-0.5, -0.5, 0.5)],
    [new BABYLON.Vector3(-0.5, -0.5, 0.5),
    new BABYLON.Vector3(-0.5, -0.5, -0.5)],
    [new BABYLON.Vector3(-0.5, 0.5, -0.5),
    new BABYLON.Vector3(0.5, 0.5, -0.5)],
    [new BABYLON.Vector3(0.5, 0.5, -0.5),
    new BABYLON.Vector3(0.5, 0.5, 0.5)],
    [new BABYLON.Vector3(0.5, 0.5, 0.5),
    new BABYLON.Vector3(-0.5, 0.5, 0.5)],
    [new BABYLON.Vector3(-0.5, 0.5, 0.5),
    new BABYLON.Vector3(-0.5, 0.5, -0.5)],
    [new BABYLON.Vector3(-0.5, -0.5, -0.5),
    new BABYLON.Vector3(-0.5, 0.5, -0.5)],
    [new BABYLON.Vector3(0.5, -0.5, -0.5),
    new BABYLON.Vector3(0.5, 0.5, -0.5)],
    [new BABYLON.Vector3(0.5, -0.5, 0.5),
    new BABYLON.Vector3(0.5, 0.5, 0.5)],
    [new BABYLON.Vector3(-0.5, -0.5, 0.5),
    new BABYLON.Vector3(-0.5, 0.5, 0.5)]
]
// var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
// camera.attachControl(canvas, true);

//нарисовать оси координат и функцию y = x с -5 до 5


// Создаем меш для ребер и применяем материал
var lines = BABYLON.MeshBuilder.CreateLineSystem("lines", { lines: indices});




// Запускаем рендеринг сцены
engine.runRenderLoop(function() {
    scene.render();
});

// Обновляем размеры канваса при изменении размера окна
window.addEventListener("resize", function() {
    engine.resize();
});



