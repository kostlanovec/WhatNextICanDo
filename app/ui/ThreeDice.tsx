// components/ThreeDice.tsx
"use client";

import { useRef, useEffect } from "react";
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const ThreeDice = () => {
    const texts = [
        "Jdi zkusit šerm.",
        "Jdi na výlet.",
        "Přečti knihu.",
        "Zkus něco nového.",
        "Vychutnej si kávu.",
        "Prozkoumej město.",
        "Zatanči si.",
        "Napiš dopis.",
        "Jdi na koncert.",
        "Přejeď na kole.",
        "Zahraj si hru.",
        "Podívej se na film.",
        "Navštiv muzeum.",
        "Zkus nový recept.",
        "Přečti si článek.",
        "Podívej se na hvězdy.",
        "Navštiv přátele.",
        "Udělej si relaxaci.",
        "Zajdi na trh.",
        "Zkus meditaci.",
        "Jdi na procházku."
      ];
  const containerRef = useRef<HTMLDivElement>(null);
  const diceRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);

      camera.position.z = 0.5;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      const loader = new OBJLoader();


      loader.load(
        'Models/dice.obj',
        function (object: any) {
          var box = new THREE.Box3().setFromObject(object);
          var center = new THREE.Vector3();
          box.getCenter(center);
          object.position.sub(center);

          object.traverse(function (child: any) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({ color: 0x353935});
            }
          });

          diceRef.current = object;
          scene.add(object);

          object.userData = { clickable: true }

          const onMouseClick = (event: MouseEvent) => {
            event.preventDefault();
              rollDice();
              ClearText();
          };

          window.addEventListener('click', onMouseClick);
        },
        function (xhr: any) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error: any) {
          console.log('An error happened');
        }
      );

      const renderScene = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      renderScene();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }
  }, []);

  let animationId: number;

  const rollDice = () => {
    if (diceRef.current) {
      const getRandomText = () => {
        const randomIndex = Math.floor(Math.random() * texts.length);
        return texts[randomIndex];
      };
  
      const updateDiceText = () => {
        diceRef.current?.traverse(function (child: any) {
          if (child.isMesh) {
            createTextTexture(getRandomText());
          }
        });
      };
  
      // Random target rotation
      const targetRotation = {
        x: diceRef.current.rotation.x + Math.random() * 2 * Math.PI,
        y: diceRef.current.rotation.y + Math.random() * 2 * Math.PI,
        z: diceRef.current.rotation.z + Math.random() * 2 * Math.PI
      };
  
      const initialPosition = { ...diceRef.current.position };
      const maxDistance = 1;
      const targetPosition = {
        x: (Math.random() - 0.5) * 2 * maxDistance,
        y: (Math.random() - 0.5) * 2 * maxDistance,
        z: (Math.random() - 0.5) * 2 * maxDistance
      };
  
      const duration = 3000;
      const startTime = performance.now();
  
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
  
        if (diceRef.current) {
          diceRef.current.rotation.x = THREE.MathUtils.lerp(diceRef.current.rotation.x, targetRotation.x, progress);
          diceRef.current.rotation.y = THREE.MathUtils.lerp(diceRef.current.rotation.y, targetRotation.y, progress);
          diceRef.current.rotation.z = THREE.MathUtils.lerp(diceRef.current.rotation.z, targetRotation.z, progress);
      
          const middleProgress = Math.min(progress * 2, 1);
          const returnProgress = Math.max((progress - 0.5) * 2, 0);
      
          diceRef.current.position.x = THREE.MathUtils.lerp(initialPosition.x, targetPosition.x, middleProgress) * (1 - returnProgress);
          diceRef.current.position.y = THREE.MathUtils.lerp(initialPosition.y, targetPosition.y, middleProgress) * (1 - returnProgress);
          diceRef.current.position.z = THREE.MathUtils.lerp(initialPosition.z, targetPosition.z, middleProgress) * (1 - returnProgress);
      }
      
  
        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        } else {
          updateDiceText();
        }
      };
  
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      animationId = requestAnimationFrame(animate);
    }
  };

  const createTextTexture = (text: string) => {
    let textDiv = document.getElementById('textTextureDiv');

    if (!textDiv) {
        textDiv = document.createElement('div');
        textDiv.id = 'textTextureDiv';
        textDiv.style.position = 'absolute';
        textDiv.style.color = "white";
        textDiv.style.padding = "10px";
        textDiv.style.top = '50%';
        textDiv.style.left = '50%';
        textDiv.style.transform = 'translate(-50%, -50%)';
        textDiv.style.textAlign = 'center';
        document.body.appendChild(textDiv);
    }

    textDiv.innerHTML = text;
  };

  const ClearText =() => {
    let textDiv = document.getElementById('textTextureDiv');

    if (!textDiv) {
        return;
    }

    else{
        textDiv.innerHTML = "";
    }
  }

  return (
    <div ref={containerRef} className="w-full h-full relative"></div>
  );
};

export default ThreeDice;
