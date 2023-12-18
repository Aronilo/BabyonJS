
// Создаем сцену и движок
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

// Создание камеры
var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);

// Создание света
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

const axes = new BABYLON.Debug.AxesViewer(scene, 1)
axes.update(new BABYLON.Vector3(0,0,0),new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(0, 1, 0), false)

// Создаем оси координат

var axisX = BABYLON.MeshBuilder.CreateLines("axisX", { points: [new BABYLON.Vector3(-5, 0, 0), new BABYLON.Vector3(5, 0, 0)] }, scene);

var axisY = BABYLON.MeshBuilder.CreateLines("axisY", { points: [new BABYLON.Vector3(0, -5, 0), new BABYLON.Vector3(0, 5, 0)] }, scene);


// Создаем график
var points = [];
var points = [];

for (var x = -5; x <= 5; x += 0.1) {
        var y = Math.pow(x, 2);
        points.push(new BABYLON.Vector3(x, y, 0));
}

var line = BABYLON.MeshBuilder.CreateLines("line", { points: points }, scene);

// Создаем график

const stairWidth = new Array(257);
const stairHeight = new Array(256);

const x1 = 3.6541528853610088;
const A = 4.92867323399e-3; /// area under rectangle

function setupNormalTables() {
    stairHeight[0] = Math.exp(-0.5 * x1 * x1);
    stairWidth[0] = A / stairHeight[0];
    stairWidth[256] = 0;
    for (let i = 1; i <= 255; ++i) {
        stairWidth[i] = Math.sqrt(-2 * Math.log(stairHeight[i - 1]));
        stairHeight[i] = stairHeight[i - 1] + A / stairWidth[i];
    }
}

function NormalZiggurat() {
    let iter = 0;
    do {
        const B = BasicRandGenerator();
        const stairId = B & 255;
        let x = Uniform(0, stairWidth[stairId]); // get horizontal coordinate
        if (x < stairWidth[stairId + 1])
            return (B > 0) ? x : -x;
        if (stairId == 0) // handle the base layer
        {
            let z = -1;
            let y;
            if (z > 0) // we don't have to generate another exponential variable as we already have one
            {
                x = Exponential(x1);
                z -= 0.5 * x * x;
            }
            if (z <= 0) // if previous generation wasn't successful
            {
                do {
                    x = Exponential(x1);
                    y = Exponential(1);
                    z = y - 0.5 * x * x; // we storage this value as after acceptance it becomes exponentially distributed
                } while (z <= 0);
            }
            x += x1;
            return (B > 0) ? x : -x;
        }
        // handle the wedges of other stairs
        if (Uniform(stairHeight[stairId - 1], stairHeight[stairId]) < Math.exp(-0.5 * x * x))
            return (B > 0) ? x : -x;
    } while (++iter <= 1e9); /// one billion should be enough
    return NaN; /// fail due to some error
}

function Normal(mu, sigma) {
    return mu + NormalZiggurat() * sigma;
}

setupNormalTables();


engine.runRenderLoop(function () {
        scene.render();
});

// Обновляем размеры канваса при изменении размера окна
window.addEventListener("resize", function() {
        engine.resize();
});

engine.runRenderLoop(function () {
    scene.render();
});

// Обновляем размеры канваса при изменении размера окна
window.addEventListener("resize", function() {
    engine.resize();
});



