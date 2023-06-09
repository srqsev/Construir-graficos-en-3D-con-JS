import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene  = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);

const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry =  new THREE.TorusGeometry(20,5,16,100);
const material =  new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
 

 const ambientLight = new THREE.AmbientLight(0xffffff);
 scene.add(pointLight, ambientLight)

 const lightHelper = new THREE.PointLightHelper(pointLight)
 const gridHelper = new THREE.GridHelper(200,50);
 scene.add(lightHelper,gridHelper)

 const controls = new OrbitControls(camera, renderer.domElement);

 function addStar(){
   const geometry = new THREE.SphereGeometry(0.25);
   const material = new THREE.MeshStandardMaterial({color: 0xffffff})
   const star = new THREE.Mesh( geometry, material);


   const [x,y,z]= Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

   star.position.set(x,y,z);
   scene.add(star)
 }

 Array(250).fill().forEach(addStar)

 const spaceTexture = new THREE.TextureLoader().load('space1.jpg');
 scene.background = spaceTexture;

const avatarTexture = new THREE.TextureLoader().load('avatar.jpg');

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,3),
  new THREE.MeshBasicMaterial({map: avatarTexture})
);

const earthTexture = new THREE.TextureLoader().load('earth.jpg');

const earth = new THREE.Mesh
(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial(
  {
    map: earthTexture,
  }
  )
);

scene.add(earth)
earth.position.z = 40;
earth.position.setX(10);



scene.add(avatar);


function moveCamera(){
const t = document.body.getBoundingClientRect().top;
earth.rotation.x += 1.05;
earth.rotation.y += 0.075;
earth.rotation.z += 0.05;

avatar.rotation.y += 1.01;
avatar.rotation.z += 1.01;

camera.position.z = t * 0.01;
camera.position.x = t * 0.0002;
camera.rotation.y = t * 0.0002;
}



document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.y += 0.01;

  controls.update();
  
  renderer.render(scene, camera);
}

animate()

