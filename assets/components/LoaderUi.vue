<template>
  <div class="loader-wrapper">
    <span class="loading">Loading</span>
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  .loading {
    padding-right: 15px;
    font-weight: 600;
    font-family: fantasy;
    text-align: center;
  }
  .loader {
    width: 20px;
    height: 20px;
    border: 2px solid orange;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
