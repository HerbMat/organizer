<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'Home'}">Home</router-link>
      <router-link :to="{ name: 'DrawBoard'}">Draw</router-link>
    </nav>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
  }

  body > * {
    overflow: auto;
  }

  #app {
    display: grid;
    grid-template:
      [row1-start] "header header" 3rem [row1-end]
      [row2-start] "sidebar content" 1fr [row2-end]
    / 6rem 1fr;
    height: 100vh;
    width: 100vw;
  }
  #app > nav {
    background-image: linear-gradient(to bottom, cornflowerblue , blue);;
    padding-left: 3rem;
    padding-top: 1rem;
    grid-area: header;
    display: grid;
    grid-template-columns: repeat(7, 3rem);
    grid-template-rows: auto;

    a {
      color: white;
      font-weight: 600;
      text-decoration: none;
    }
  }

  .row {
    width: 100%;
  }

  #app > main {
    grid-area: sidebar / sidebar / content / content;
    text-align: center;
    padding: 1rem
  }
</style>
