'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import * as THREE from 'three'
import Character from './Character'

// 籃球場地板組件
function Court() {
  return (
    <group>
      {/* 地板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8B4513" /> {/* 木質地板顏色 */}
      </mesh>
      
      {/* 籃球場線條 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <ringGeometry args={[3, 3.1, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

// 浮動的籃球組件
function FloatingBasketball() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // 使用 useFrame 讓籃球浮動和旋轉
  useFrame((state) => {
    if (meshRef.current) {
      // 上下浮動效果
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5 + 2
      // 緩慢旋轉
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[3, 2, -2]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#FF6B35" /> {/* 籃球橘色 */}
    </mesh>
  )
}

// 3D 文字組件
function Welcome3DText() {
  return (
    <Text
      position={[0, 4, -3]}
      fontSize={1.5}
      color="white"
      anchorX="center"
      anchorY="middle"
      font="/fonts/inter-bold.woff"  // 字體檔案路徑
    >
      Welcome to My World
    </Text>
  )
}

// 主要的 Landing 場景組件
export default function SceneLanding() {
  const [characterAnimation, setCharacterAnimation] = useState('idle')

  // 處理角色點擊事件
  const handleCharacterClick = () => {
    setCharacterAnimation('wave')
    
    // 播放點擊音效（稍後實作）
    // playClickSound()
    
    // 觸發投籃動畫（稍後用 Spine 實作）
    // triggerThrowAnimation()
    
    // 2 秒後回到待機動作
    setTimeout(() => {
      setCharacterAnimation('idle')
    }, 2000)
  }

  return (
    <Canvas
      camera={{ 
        position: [0, 2, 8],  // 攝影機位置：稍微抬高，向後拉
        fov: 50  // 視角範圍
      }}
      style={{ background: 'linear-gradient(to bottom, #87CEEB, #4682B4)' }}  // 天空漸層背景
    >
      {/* 環境光照 - 提供整體亮度 */}
      <ambientLight intensity={0.6} />
      
      {/* 方向光 - 模擬太陽光 */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
      />

      {/* 場景組件 */}
      <Court />
      <FloatingBasketball />
      <Welcome3DText />
      
      {/* 主角角色 - 可點擊互動 */}
      <Character 
        position={[0, 0, 0]}
        animation={characterAnimation}
        onClick={handleCharacterClick}
      />

      {/* 環境貼圖 - 提供反射效果 */}
      <Environment preset="sunset" />
      
      {/* 軌道控制 - 讓用戶可以旋轉視角 */}
      <OrbitControls 
        enablePan={false}  // 禁用平移
        enableZoom={false}  // 禁用縮放
        enableRotate={true}  // 允許旋轉
        maxPolarAngle={Math.PI / 2}  // 限制垂直旋轉角度
        minPolarAngle={Math.PI / 4}
      />

      {/* TODO-LLM:SceneLanding:Add more interactive elements and particles */}
    </Canvas>
  )
} 