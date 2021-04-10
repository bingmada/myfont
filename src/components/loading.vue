<template>
    <div class="background">
        <div class="beat-content">
            <img class="beat-img" width="70" src="../assets/img/loading.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="scss" scoped>
.background{
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0 , 0, .5);
  z-index: 2000;
}
.beat-content{
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    padding-left: 5px;
    position: absolute;
    display: inline-block;
}
.beat-content::before{
    content: '';
    height: 10px;
    width: 100px;
    background: #fff; opacity: .4; border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 0;
    animation: shadow 1s linear infinite;
}
.beat-img {
    position: relative;
    left: 10px;
    top: -39px;
    animation: rotate1 1s linear infinite;
}

@keyframes shadow {
    0%, 100% {transform: scaleX(1);}
    50% {transform: scaleX(1.2);}
}

@keyframes rotate1 {
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(2px);
    }
    50% {
        transform: translateY(4px) scale(1.1, 0.9);
    }
    75% {
        transform: translateY(2px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
