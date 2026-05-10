<template>
    <div class="nav">
        <h1>
            <a href="#/" class="nav-title">
                <b>Mythos</b>Culture
            </a>
        </h1>
        <NavButton buttonText="Gallery" url="#/gallery"/>
        
        <NavButton buttonText="Github" :url="github"/>
    </div>
</template>

<script setup>
    import NavButton from './NavButton.vue';
    const linkedin = "https://www.linkedin.com/in/sylvester-negron-b11618149/"
    const github = "https://github.com/MythosCulture"
</script>

<style>
.nav{
    display: flex;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
    justify-content: center;
    align-items: center;
    
    background-color: #4b2530;
}
.nav-title{
    text-decoration: none;
    padding: 0px 20px 10px 20px;
    letter-spacing: 5px;
    color: #fefded;
    font-weight: 400;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>