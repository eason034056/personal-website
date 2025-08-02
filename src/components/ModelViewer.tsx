'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function ModelViewer({ modelPath, scale = [1, 1, 1] }: { modelPath: string, scale?: number[] }) {
  const modelRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(modelPath)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return <primitive ref={modelRef} object={scene} scale={scale} position={[0, -1, 0]} />
} 