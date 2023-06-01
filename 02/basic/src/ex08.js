import * as THREE from 'three';
import gsap from 'gsap';
// ----- 주제: 라이브러리를 이용한 애니메이션

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	// const renderer = new THREE.WebGLRenderer({ canvas: canvas });
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true,
        alpha: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
    // console.log(window.devicePixelRatio);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // renderer.setClearAlpha(0.9);
    // // renderer.setClearColor(0x00ff00);
    // renderer.setClearAlpha(0.5);

	// Scene
	const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('black', 3, 7);
    // scene.background = new THREE.Color('blue');

	// Camera
	// Perspective Camera(원근 카메라)
	// const camera = new THREE.PerspectiveCamera(
	// 	75, // 시야각(field of view)
	// 	window.innerWidth / window.innerHeight, // 종횡비(aspect)
	// 	0.1, // near
	// 	1000 // far
	// );
	// camera.position.x = 1;
	// camera.position.y = 2;
	// camera.position.z = 5;
	// scene.add(camera);

	// Orthographic Camera(직교 카메라)
	const camera = new THREE.OrthographicCamera(
		-(window.innerWidth / window.innerHeight), // left
		window.innerWidth / window.innerHeight, // right,
		1, // top
		-1, // bottom
		0.1,
		1000
	);
	camera.position.y = 1;
	camera.position.z = 5;
	camera.lookAt(0, 0, 0);
	camera.zoom = 0.5;
	camera.updateProjectionMatrix();
	scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 10;
    scene.add(light);

	// Mesh
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({
		// color: 0xff0000
		// color: '#ff0000'
		color: 'red'
	});
	
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh)
	// 그리기
    // const clock = new THREE.Clock();
    let oldTime = Date.now();

    function draw(){
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime

       
        renderer.render(scene, camera);
        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }

    // gsap
    gsap.to(
        mesh.position,
        {
            duration: 1,
            y: 2,
            z: 3
        }
    )
    
    function setSize(){
        // 카메라
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener('resize', setSize);

    draw();
}