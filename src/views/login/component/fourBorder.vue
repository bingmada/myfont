<template>
  <div class="four-border">
    <img class="lt" src="../../../assets/img/lt.png" alt="">
    <img class="rt" src="../../../assets/img/rt.png" alt="">
    <img class="lb" src="../../../assets/img/lb.png" alt="">
    <img class="rb" src="../../../assets/img/rb.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'fourBorder'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$left-width: 279px;
.four-border {
    .lt {
        position: absolute;
        top: 0;
        left: -4px;
    }
    .rt {
        position: absolute;
        top: 0;
        left: 0;
        animation: showRT 2s;
        animation-fill-mode: forwards;
    }
    @keyframes showRT
    {
        from {left: 0;}
        to {left: $left-width;}
    }
    .lb {
        position: absolute;
        top: 0;
        left: -4px;
        animation: showLB 2s;
        animation-fill-mode: forwards;
    }
    @keyframes showLB
    {
        from {top: 0;}
        to {top: 30px;}
    }
    .rb {
        position: absolute;
        top: 0;
        left: 0;
        animation: showRB 2s;
        animation-fill-mode: forwards;
    }
     @keyframes showRB
    {
        from {left: 0; top: 0;}
        to {left: $left-width; top: 30px;}
    }
}
</style>
