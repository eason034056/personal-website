'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import * as THREE from 'three'

// 資訊氣泡組件
interface InfoBubbleProps {
  position: [number, number, number]
  title: string
  content: string
  isVisible: boolean
}

function InfoBubble({ position, title, content, isVisible }: InfoBubbleProps) {
  if (!isVisible) return null

  return (
    <Html position={position} center>
      <div className="info-bubble w-64 transform -translate-x-1/2 -translate-y-full">
        <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{content}</p>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
      </div>
    </Html>
  )
}

// 可點擊的書桌物件
interface DeskItemProps {
  position: [number, number, number]
  geometry: React.ReactNode
  color: string
  onClick: () => void
  isHovered: boolean
  onHover: (hovered: boolean) => void
}

function DeskItem({ position, geometry, color, onClick, isHovered, onHover }: DeskItemProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // 控制游標樣式
  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [isHovered])

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      // Hover 時輕微浮動
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.05
    } else if (meshRef.current) {
      meshRef.current.position.y = position[1]
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
    >
      {geometry}
      <meshStandardMaterial 
        color={isHovered ? '#6366f1' : color}
        emissive={isHovered ? '#1e1b4b' : '#000000'}
        emissiveIntensity={isHovered ? 0.1 : 0}
      />
    </mesh>
  )
}

// 書桌場景組件
export default function SceneAbout() {
  const [activeInfo, setActiveInfo] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // 書桌物件資訊
  const deskItems = [
    {
      id: 'laptop',
      position: [0, 0.6, 0] as [number, number, number],
      geometry: <boxGeometry args={[1.5, 0.1, 1]} />,
      color: '#2d3748',
      title: '我的工作環境',
      content: '我使用 MacBook Pro 進行開發，搭配多螢幕提高生產力。熟悉 VS Code、Git、Docker 等開發工具。'
    },
    {
      id: 'books',
      position: [-1.5, 0.8, 0.2] as [number, number, number],
      geometry: <boxGeometry args={[0.3, 0.4, 1.2]} />,
      color: '#c53030',
      title: '持續學習',
      content: '我相信持續學習的重要性，經常閱讀技術書籍和參與線上課程。最近專注於 AI/ML 和 3D 網頁技術。'
    },
    {
      id: 'coffee',
      position: [1.2, 0.65, -0.3] as [number, number, number],
      geometry: <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />,
      color: '#8b4513',
      title: '咖啡愛好者',
      content: '程式設計師必備！我喜歡在寫程式時來杯咖啡，有助於思考和專注。'
    },
    {
      id: 'plant',
      position: [1.8, 0.9, 0.5] as [number, number, number],
      geometry: <coneGeometry args={[0.2, 0.6, 8]} />,
      color: '#38a169',
      title: '工作環境',
      content: '我喜歡在工作空間放一些綠色植物，讓環境更舒適，也提醒自己保持生活平衡。'
    }
  ]

  return (
    <Canvas
      camera={{ 
        position: [3, 3, 5],
        fov: 60
      }}
      style={{ background: 'linear-gradient(to bottom, #f7fafc, #edf2f7)' }}
    >
      {/* 光照設定 */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8}
        castShadow
      />
      <pointLight position={[0, 3, 0]} intensity={0.3} />

      {/* 書桌 */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4, 0.5, 2]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* 書桌腿 */}
      {[[-1.8, -0.5, -0.8], [1.8, -0.5, -0.8], [-1.8, -0.5, 0.8], [1.8, -0.5, 0.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}

      {/* 可互動的書桌物件 */}
      {deskItems.map((item) => (
        <DeskItem
          key={item.id}
          position={item.position}
          geometry={item.geometry}
          color={item.color}
          onClick={() => setActiveInfo(activeInfo === item.id ? null : item.id)}
          isHovered={hoveredItem === item.id}
          onHover={(hovered) => setHoveredItem(hovered ? item.id : null)}
        />
      ))}

      {/* 資訊氣泡 */}
      {deskItems.map((item) => (
        <InfoBubble
          key={`info-${item.id}`}
          position={[item.position[0], item.position[1] + 1, item.position[2]]}
          title={item.title}
          content={item.content}
          isVisible={activeInfo === item.id}
        />
      ))}

      {/* 地板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* 環境貼圖 */}
      <Environment preset="apartment" />
      
      {/* 相機控制 */}
      <OrbitControls 
        enablePan={false}
        maxDistance={8}
        minDistance={3}
        maxPolarAngle={Math.PI / 2.5}
      />

      {/* TODO-LLM:SceneAbout:Add more interactive desk items and better lighting */}
    </Canvas>
  )
} 