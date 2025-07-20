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
    
    <!-- Photogrammetry 3D Objects -->
    <div class="photogrammetry-object mesh-sphere" style="top: 20%; left: 10%; animation-delay: 0s;"></div>
    <div class="photogrammetry-object wireframe-cube" style="top: 60%; left: 85%; animation-delay: 3s;"></div>
    <div class="photogrammetry-object point-cloud" style="top: 30%; left: 75%; animation-delay: 6s;"></div>
    <div class="photogrammetry-object scan-lines" style="top: 80%; left: 15%; animation-delay: 9s;"></div>
    <div class="photogrammetry-object mesh-sphere" style="top: 15%; left: 90%; animation-delay: 2s;"></div>
    <div class="photogrammetry-object wireframe-cube" style="top: 70%; left: 5%; animation-delay: 5s;"></div>
    <div class="photogrammetry-object point-cloud" style="top: 45%; left: 95%; animation-delay: 8s;"></div>
    
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
