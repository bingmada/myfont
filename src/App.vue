<template>
  <div id="app">
    <transition appear enter-active-class="animated fadeIn">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
