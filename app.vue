<template>
  <div>
    <!-- Mouse Follower 3D Effects -->
    <div ref="mouseFollower" class="mouse-follower">
      <div class="cursor-glow"></div>
    </div>
    <div ref="mouseTrail" class="mouse-follower">
      <div class="cursor-trail"></div>
    </div>
    <div ref="mouseRing" class="mouse-follower">
      <div class="cursor-ring">
        <div class="cursor-particles"></div>
        <div class="cursor-particles"></div>
        <div class="cursor-particles"></div>
        <div class="cursor-particles"></div>
      </div>
    </div>
    
    <!-- Wireframe 3D Objects -->
    <div class="wireframe-3d wireframe-cube-container" style="top: 20%; left: 10%; animation-delay: 0s;">
      <div class="wireframe-cube-3d">
        <div class="cube-face cube-front"></div>
        <div class="cube-face cube-back"></div>
        <div class="cube-face cube-top"></div>
        <div class="cube-face cube-bottom"></div>
        <div class="cube-face cube-left"></div>
        <div class="cube-face cube-right"></div>
      </div>
    </div>
    <div class="wireframe-3d wireframe-pyramid-container" style="top: 60%; left: 85%; animation-delay: 3s;">
      <div class="wireframe-pyramid-3d">
        <div class="pyramid-face pyramid-base"></div>
        <div class="pyramid-face pyramid-front"></div>
        <div class="pyramid-face pyramid-back"></div>
        <div class="pyramid-face pyramid-left"></div>
        <div class="pyramid-face pyramid-right"></div>
      </div>
    </div>
    <div class="wireframe-3d wireframe-octahedron-container" style="top: 30%; left: 75%; animation-delay: 6s;">
      <div class="wireframe-octahedron-3d">
        <div class="octahedron-face"></div>
        <div class="octahedron-face"></div>
        <div class="octahedron-face"></div>
        <div class="octahedron-face"></div>
      </div>
    </div>
    <div class="wireframe-3d wireframe-sphere-container" style="top: 80%; left: 15%; animation-delay: 9s;">
      <div class="wireframe-sphere-3d">
        <div class="sphere-ring"></div>
        <div class="sphere-ring"></div>
        <div class="sphere-ring"></div>
        <div class="sphere-ring"></div>
      </div>
    </div>
    <div class="wireframe-3d wireframe-dodecahedron-container" style="top: 15%; left: 90%; animation-delay: 2s;">
      <div class="wireframe-dodecahedron-3d">
        <div class="dodeca-face"></div>
        <div class="dodeca-face"></div>
        <div class="dodeca-face"></div>
      </div>
    </div>
    <div class="wireframe-3d wireframe-torus-container" style="top: 70%; left: 5%; animation-delay: 5s;">
      <div class="wireframe-torus-3d">
        <div class="torus-ring"></div>
        <div class="torus-ring"></div>
      </div>
    </div>
    <div class="wireframe-3d wireframe-icosahedron-container" style="top: 45%; left: 95%; animation-delay: 8s;">
      <div class="wireframe-icosahedron-3d">
        <div class="icosa-face"></div>
        <div class="icosa-face"></div>
        <div class="icosa-face"></div>
      </div>
    </div>
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// サンプルデータの初期化
const { initSampleArticles } = useInitSampleData()
const { refreshUser, initAuthListener } = useAuth()

// Mouse follower refs
const mouseFollower = ref(null)
const mouseTrail = ref(null)
const mouseRing = ref(null)

// Mouse position tracking
let mouseX = 0
let mouseY = 0
let trailX = 0
let trailY = 0
let ringX = 0
let ringY = 0

const updateMouseFollower = () => {
  if (mouseFollower.value) {
    mouseFollower.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  }
  
  // Smooth trail follow
  trailX += (mouseX - trailX) * 0.1
  trailY += (mouseY - trailY) * 0.1
  if (mouseTrail.value) {
    mouseTrail.value.style.transform = `translate(${trailX}px, ${trailY}px)`
  }
  
  // Even smoother ring follow
  ringX += (mouseX - ringX) * 0.05
  ringY += (mouseY - ringY) * 0.05
  if (mouseRing.value) {
    mouseRing.value.style.transform = `translate(${ringX}px, ${ringY}px)`
  }
  
  requestAnimationFrame(updateMouseFollower)
}

onMounted(async () => {
  // アプリケーション起動時にサンプルデータを初期化
  initSampleArticles()
  
  // 認証状態を復元
  await refreshUser()
  
  // 認証状態変更のリスナーを初期化
  initAuthListener()
  
  // Mouse tracking
  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  updateMouseFollower()
  
  // Cleanup on unmount
  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
  })
})
</script>
