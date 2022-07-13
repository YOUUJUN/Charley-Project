<template>
    <section>
        <div ref="three" class="three-wrap"></div>
    </section>
</template>

<script>
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default {
    data() {
        return {};
    },

    created() {
        console.log("three", THREE);
        console.log("GLTFLoader", GLTFLoader);
    },

    mounted() {
        this.createThreeScene();

    },

    methods: {
        createThreeScene() {
            let vm = this
            const camera = new THREE.PerspectiveCamera(
                70,
                window.innerWidth / window.innerHeight,
                0.01,
                10
            );
            camera.position.z = 1;

            const scene = new THREE.Scene();

            const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const material = new THREE.MeshNormalMaterial();

            const mesh = new THREE.Mesh(geometry, material);
            // scene.add(mesh);

            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            // renderer.setAnimationLoop(animation);

            // animation

            function animation(time) {
                mesh.rotation.x = time / 2000;
                mesh.rotation.y = time / 1000;

                renderer.render(scene, camera);
            }


            const loader = new GLTFLoader();

            loader.load( '/m1911_pistol/scene.gltf', function ( gltf ) {

                scene.add( gltf.scene );

                renderer.render(scene, camera);

                vm.$refs.three.appendChild(renderer.domElement);

            }, undefined, function ( error ) {

                console.error( error );

            } );

        },






        
    },
};
</script>

<style scoped>
</style>