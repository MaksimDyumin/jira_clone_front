<template>
  <div class="layout-default">
    <div class="flex flex-column w-full min-h-full">
      <Header></Header>
      <div class="page-container h-full w-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.layout-default {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.page-container {
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 15px;
  margin-top: 110px
}

/* @media screen and (min-width: 1024px) {
  .page-container{
    margin: 0 10%;
  }
} */
</style>