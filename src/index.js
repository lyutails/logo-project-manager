'use strict'

import './style.scss';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import cube_gltf from './3D/logo_cube.glb';
// import cube from './3D/logo_cube_blend.obj';
// import cube_texture from './3D/logo_cube_blend.mtl';
// import checker from './refs/checker.jpg';

const body = document.createElement('div');
body.classList.add('body');
document.body.appendChild(body);

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
body.appendChild(wrapper);

const colourOne = document.createElement('div');
colourOne.classList.add('colour_one');
wrapper.appendChild(colourOne);

const colourTwo = document.createElement('div');
colourTwo.classList.add('colour_two');
wrapper.appendChild(colourTwo);

const colourThree = document.createElement('div');
colourThree.classList.add('colour_three');
wrapper.appendChild(colourThree);

const logoContainer = document.createElement('div');
logoContainer.classList.add('logo_container');
wrapper.appendChild(logoContainer);

const glass = document.createElement('div');
glass.classList.add('glass');
logoContainer.appendChild(glass);

const textContainer = document.createElement('div');
textContainer.classList.add('text_container');
glass.appendChild(textContainer);

const lineUp = document.createElement('span');
lineUp.classList.add('line_up');
textContainer.appendChild(lineUp);
 
const project = document.createElement('div');
project.classList.add('project');
textContainer.appendChild(project);
project.innerText = 'project';

const manager = document.createElement('div');
manager.classList.add('project');
textContainer.appendChild(manager);
manager.innerText = 'manager';

const lineDown = document.createElement('span');
lineDown.classList.add('line_down');
textContainer.appendChild(lineDown);

const canvasApply = document.querySelector('.canvas');
logoContainer.appendChild(canvasApply);

// global THREE

    function main() {

    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas, 
        alpha: true,
        antialias: true,
    });
    //renderer.setClearColor(0xffffff, 0);

    const fov = 45;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 10);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0.2, 0);
    controls.update();
    controls.enableZoom = false;

    const scene = new THREE.Scene();

    // {
    //     const planeSize = 2;

    //     const loader = new THREE.TextureLoader();
    //     const texture = loader.load(checker);
    //     texture.wrapS = THREE.RepeatWrapping;
    //     texture.wrapT = THREE.RepeatWrapping;
    //     texture.magFilter = THREE.NearestFilter;
    //     const repeats = planeSize / 2;
    //     texture.repeat.set(repeats, repeats);
        
    //     const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    //     const planeMat = new THREE.MeshPhongMaterial({
    //         map: texture,
    //         side: THREE.DoubleSide,
    //     });
    //     const mesh = new THREE.Mesh(planeGeo, planeMat);
    //     mesh.rotation.x = Math.PI * - 0.5;
    //     scene.add(mesh);
    // }

    {
        const skyColor = 0xabecff;
        const groundColor = 0x2c74f9;
        const intensity = 1;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 8, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
    }

    let loadedModel;
    const loader = new GLTFLoader();
    loader.load(
        cube_gltf, function(gltf) {
            loadedModel = gltf;
            scene.add(gltf.scene);
            loadedModel.scene.rotation.y = Math.PI / 5;
            loadedModel.scene.position.y = -1.4;
            loadedModel.scene.scale.set(6, 6, 6);
            loadedModel.scene.translateX(0.4);
            loadedModel.scene.translateY(-0.55);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '%loaded');
        },
        function(error) {
            console.log('An error happened');
        }       
    );

    const anim = () => {
        if (loadedModel) {
            const scalar = 1;            
            loadedModel.scene.scale.set(7.5, 7.5, 7.5);
            //loadedModel.scene.rotation.x += 0.01;
            loadedModel.scene.rotation.y += 0.014;
            //loadedModel.scene.rotation.z += 0.01;
        }
        requestAnimationFrame(anim);
    };
    anim();

    // const loader = new OBJLoader();
    // loader.load(
    //     cube, function(object) {
    //         scene.add(object);
    //     },
    //     function(xhr) {
    //         console.log((xhr.loaded / xhr.total * 100) + '%loaded');
    //     },
    //     function(error) {
    //         console.log('An error happened');
    //     }
    // );

    // const loader = new OBJLoader();
    // const loaderMTL = new MTLLoader();
    // loaderMTL.load(cube_texture, (materials) => {
    //     loader.setMaterials(materials);
    //     loader.load(
    //         cube, function(object) {
    //             scene.add(object);
    //         },
    //         function(xhr) {
    //             console.log((xhr.loaded / xhr.total * 100) + '%loaded');
    //         },
    //         function(error) {
    //             console.log('An error happened');
    //         }
    //     );
    // })   

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();