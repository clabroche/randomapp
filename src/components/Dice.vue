<template>
  <div class="root">
    <div id="ui">
      <div class="dice" ref="dice">
        <ol class="dice_list">
          <li class="dice_item" data-id="1" @click="pickNumber(1)">1</li>
          <li class="dice_item" data-id="2" @click="pickNumber(2)">2</li>
          <li class="dice_item" data-id="3" @click="pickNumber(3)">3</li>
          <li class="dice_item" data-id="4" @click="pickNumber(4)">4</li>
          <li class="dice_item" data-id="5" @click="pickNumber(5)">5</li>
          <li class="dice_item" data-id="6" @click="pickNumber(6)">6</li>
        </ol>
      </div>
    </div>
    <div class="landscape">
      <div class="moon"></div>
      <div class="layer l1">
        <div class="hills">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="layer l2">
        <div class="hills">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="layer l3">
        <div class="la" v-for="(o, i) of lights" :key="i">
          <div class="l"></div>
          <div class="l"></div>
        </div>
      </div>
    </div>
    <div class="result" ref="result">
      {{nb}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dice',
  data() {
    return {
      lights: Array(20).fill(null),
      nb:null 
    }
  },
  mounted() {
  },
  methods: {
    async pickNumber(nb) {
      clearTimeout(this.timeout)
      this.$refs.result.classList.remove('appear')
      setTimeout(() => {
        this.nb = nb
        this.$refs.result.classList.add('appear')
        this.timeout = setTimeout(() => {
          this.$refs.result.classList.remove('appear')
        }, 2000);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">$diceSize: 150px;
.root {
  height: 100%
}
.result {
  position: absolute;
  top: 100px;
  left: calc(50% - 100px);
  background-color: white;
  width: 200px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  font-weight: bold;
  border-radius: 20px;
  opacity: 0;
  &.appear {
    animation-duration: 2000ms;
    animation-name: appear;
  }
}

@keyframes appear {
  0% {
    opacity: 0
  }
  50% {
    opacity: 1
  }

  100% {
    opacity: 0
  }
}
li {
  list-style-type: none;
}

body {
  background: #000;
  height: 100vh;
  overflow: hidden;
}
#ui {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  
  .dice {
    transform-style: preserve-3d;
    animation: rotate 2000ms linear infinite;
    
    &_list {
      transform: translateY(-$diceSize / 2) translateX(-$diceSize / 2);
      transform-style: preserve-3d;
    }
    
    &_item {
      position: absolute;
      width: $diceSize;
      height: $diceSize;
      background: #97bddb99;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 7rem;
      font-family: 'Dosis', sans-serif;
      color: rgba(0, 0, 0, 0.6);
      border-radius: 20px; 
      border: 10px double rgba(255, 255, 255, 0.6);

      &[data-id='1'] {
      transform: translateZ($diceSize / 2);
      }
    &[data-id='2'] {
      transform: translateY($diceSize / 2) rotateX(270deg);
      }
    &[data-id='3'] {
      transform: translateX($diceSize / 2) rotateY(-270deg);
      }
    &[data-id='4'] {
      transform: translateX(-$diceSize / 2) rotateY(-90deg);
        }
    &[data-id='5'] {
      transform: translateY(-$diceSize / 2) rotateX(90deg);
        }
    &[data-id='6'] {
      transform: translateZ(-$diceSize / 2) rotateY(180deg);
        text-decoration: underline;
      }
}
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(720deg) rotateY(360deg);
  }
}


$c: #47a;
$cd: darken($c, 30%);
$crater: rgba(0,0,0,.1);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before, *:after {
  content: '';
  display: block;
  position: absolute;
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  overflow: hidden;
  background: $cd;
}

.landscape {
  position: relative;
  height: 100%;
  background: #222;
  overflow: hidden;
}

.moon {
  position: absolute;
  left: 50%;
  bottom: 100px;
  width: 350px;
  height: 350px;
  margin: 0 0 0 -175px;
  border-radius: 50%;
  background: #ccc;
}

.moon:after {
  top: 100px;
  left: 100px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: $crater;
  box-shadow:
    120px 80px 0 $crater,
    100px -60px 0 -20px $crater,
    -70px 40px 0 -20px $crater,
    -20px -50px 0 -15px $crater,
    -20px 120px 0 -15px $crater,
    50px 50px 0 -15px $crater;
    ;
}

/* Animation Setup */

.layer {
  position: absolute;
  bottom: 0;
  animation: 10s linear infinite alternate;
}

.l1 { z-index: 1; animation-name: l1; }
.l2 { z-index: 2; animation-name: l2; }
.l3 { z-index: 3; animation-name: l3; }

@keyframes l1 { 100% { transform: translate3d(-100px,0,0) } }
@keyframes l2 { 100% { transform: translate3d(-200px,0,0) } }
@keyframes l3 { 100% { transform: translate3d(-500px,0,0) } }

/* Lantern Layer */

.l3 {
  bottom: 0;
  width: 1000%;
  background: $cd;
}

.la {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 50px;
  background: $cd;
  margin-right: 20px;
}

.la:before {
  top: 5px;
  left: -10px;
  width: 22px;
  height: 2px;
  background: $cd;
}

.la:after {
  bottom: 0;
  left: -2px;
  width: 6px;
  height: 12px;
  background: $cd;
}

.l {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px #fff, 0 0 25px #fff, 0 0 50px #fff;
}

.l:nth-child(1) { left: -10px; }
.l:nth-child(2) { right: -10px; }

@for $i from 1 through 20 {
  .la:nth-child(#{$i}) {
    left: 100 * $i + px;
  }
}

/* Mountain Layer */

.hills div {
  border-radius: 8%;
  transform: rotate(45deg);
}

.hills div {
  position: absolute;
}

.l1 .hills div {
  bottom: -350px;
  width: 500px;
  height: 500px;
  background: lighten($cd, 5%);
}

.l2 .hills div {
  bottom: -400px;
  width: 500px;
  height: 500px;
  background: lighten($cd, 10%);
}

@for $i from 1 through 8 {
  .l1 .hills div:nth-child(#{$i}) {
    left: 400 * $i + -600px;
  }
}

@for $i from 1 through 8 {
  .l2 .hills div:nth-child(#{$i}) {
    left: 400 * $i + -400px;
  }
}

/* Codepen Preview Mode */

@media only screen and (max-height: 450px) {
  .landscape {
    margin-top: -150px;
  }
}
</style>
