<template>
  <header>
    <div class="container header_container">
      <div class="logo">
        <router-link to="/">Gamespot</router-link>
      </div>
      <div class="login">
        <router-link to="/signin">
          <img
            :src="require('../../assets/images/login.png')"
            alt="login icon"
          />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>
