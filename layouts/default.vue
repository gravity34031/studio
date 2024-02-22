<template>
<div class="background wrapper container-fluid" data-bs-theme="dark">

    <Navbar />

    <div class="main-container container-xxl px-2 mt-5">
        <div class="overflow-hidden">
            <slot />
        </div>
    </div>

    <Footer />

</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>