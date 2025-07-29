'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// 角色組件的 Props 介面
interface CharacterProps {
  position: [number, number, number]
  animation: string
  onClick: () => void
}

// 主角色組件
export default function Character({ position, animation, onClick }: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // TODO: 載入真實的 3D 角色模型
  // const { scene, animations } = useGLTF('/models/character.glb')
  
  // 暫時用簡單的幾何體代替 3D 角色
  // 這是一個佔位符，之後會被真實的 3D 模型取代

  // 呼吸動畫效果
  useFrame((state) => {
    if (groupRef.current) {
      // 根據動畫狀態執行不同動作
      switch (animation) {
        case 'idle':
          // 待機動作：輕微的上下浮動（模擬呼吸）
          groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
          groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
          break
        case 'wave':
          // 揮手動作：左右搖擺
          groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 5) * 0.3
          groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 10) * 0.1
          break
        default:
          // 預設動作
          groupRef.current.position.y = position[1]
          groupRef.current.rotation.y = 0
          groupRef.current.rotation.z = 0
      }

      // Hover 效果：角色會稍微放大和發光
      if (isHovered) {
        groupRef.current.scale.setScalar(1.1)
      } else {
        groupRef.current.scale.setScalar(1.0)
      }
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* 角色身體 - 暫時用簡單的膠囊形狀 */}
      <mesh position={[0, 1, 0]}>
        <capsuleGeometry args={[0.3, 1.2, 4, 8]} />
        <meshStandardMaterial 
          color={isHovered ? "#6366f1" : "#4f46e5"}  // Hover 時變亮
          emissive={isHovered ? "#1e1b4b" : "#000000"}  // Hover 時發光
        />
      </mesh>

      {/* 角色頭部 */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial 
          color="#ffdbac"  // 膚色
          emissive={isHovered ? "#332621" : "#000000"}
        />
      </mesh>

      {/* 眼睛 */}
      <mesh position={[-0.15, 2.1, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 2.1, 0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 嘴巴 - 在 hover 時變成笑臉 */}
      <mesh position={[0, 1.9, 0.35]} rotation={[0, 0, isHovered ? -0.3 : 0]}>
        <torusGeometry args={[0.08, 0.02, 4, 8, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 手臂 - 在揮手動畫時會動 */}
      <mesh position={[-0.5, 1.2, 0]} rotation={[0, 0, animation === 'wave' ? -0.5 : 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.5, 1.2, 0]} rotation={[0, 0, animation === 'wave' ? 0.5 : 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* 腿部 */}
      <mesh position={[-0.2, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[0.2, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* 互動提示圈 - 只在 hover 時顯示 */}
      {isHovered && (
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1.0, 32]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.5}
          />
        </mesh>
      )}

      {/* TODO-LLM:Character:Replace with actual GLTF model */}
      {/* 這個佔位符角色將被真實的 3D 模型取代 */}
    </group>
  )
} 