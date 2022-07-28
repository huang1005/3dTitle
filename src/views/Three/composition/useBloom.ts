import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

let finalComposer: any;
let bloomComposer: any; // 效果合成器
let bloomLayer: any; // 图层对象
let darkMaterial: any; //基础网格材质
let taaRenderPass: any;
const BLOOM_SCENE = 1;
const bloomParams = {
    exposure: 2,
    bloomThreshold: 0.1,
    bloomStrength: 1.6,
    bloomRadius: 0.4,
};

const bloomVertext = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const bloomFragment = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;
varying vec2 vUv;
void main() {
  gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
}
`;
function initBloom({ THREE, scene, $, camera, renderer, control, mesh }: any) {
    darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
    bloomLayer = new THREE.Layers();
    bloomLayer.set(BLOOM_SCENE);
    bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;

    taaRenderPass = new (TAARenderPass as any)(scene, camera);
    taaRenderPass.sampleLevel = 2;

    // 添加基本的渲染通道
    const renderPass = new RenderPass(scene, camera);

    const bloomPass = new (UnrealBloomPass as any)(new THREE.Vector2(window.innerWidth, window.innerHeight));
    bloomPass.threshold = bloomParams.bloomThreshold;
    bloomPass.strength = bloomParams.bloomStrength;
    bloomPass.radius = bloomParams.bloomRadius;
    const copyPass = new ShaderPass(CopyShader);
    bloomComposer.addPass(renderPass);
    bloomComposer.addPass(taaRenderPass);
    // 把通道加入到组合器
    bloomComposer.addPass(bloomPass);
    bloomComposer.addPass(copyPass);


    const finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture },
            },
            vertexShader: bloomVertext,
            fragmentShader: bloomFragment,
            defines: {},
        }),
        "baseTexture",
    );
    finalPass.needsSwap = true;
    // 初始化实际效果合成器
    finalComposer = new EffectComposer(renderer);

    finalComposer.addPass(renderPass);
    finalComposer.addPass(taaRenderPass);
    finalComposer.addPass(finalPass);
    finalComposer.addPass(copyPass);

}
export function useBloom() {
    return {
        initBloom
    }
}