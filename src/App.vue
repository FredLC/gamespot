<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header-Footer/Header';
import Footer from './components/Header-Footer/Footer';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
@import './assets/style.css';
</style>
