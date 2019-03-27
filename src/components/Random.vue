<template>
  <div class="">
    <div class="random-container" @click="generate">
      <transition name="appear">
        <div class="random-text" v-if="generatedWord">{{generatedWord.name}}</div>
      </transition>
      <div class="placeholder">Cliquez sur l'encart...</div>
    </div>
    
    <h3>Mots</h3>
    <div class="input">
        <input type="text" v-model="createWordName" placeholder="Nom du mot à créer..." >
      <button :disabled="!createWordName" @click="createWord()"><i class="fas fa-check"></i></button>
    </div>
    <ul class="words">
      <li v-for="word of random.words" :key='word.id' class="word">
        <div>{{word.name}}</div>
        <div><button class="fas fa-times" @click="deleteWord(word)"></button></div>
      </li>
    </ul>
  </div>
</template>

<script>
import randoms from '../services/randoms.js'
export default {
  name: 'HelloWorld',
  data() {
    return {
      random: {},
      createWordName: '',
      generatedWord: null
    }
  },
  mounted() {
    this.get()
  }, 
  methods: {
    get() {
      this.random = randoms.get(this.$route.params.id)
    },
    update() {
      randoms.update(this.random)
    },
    generate() {
      this.generatedWord = ''
      this.$forceUpdate()
      this.$nextTick(() => {
        const index = Math.floor(+(Math.random() * this.random.words.length))
        this.generatedWord = this.random.words[index]
      })
    },
    deleteWord(word) {
      this.random.words = this.random.words.filter(_word => word.id !== _word.id)
      this.update()
      this.get()
    },
    createWord(wordString = this.createWordName) {
      this.random.words.push({
        id: (Math.random() *10000 ).toFixed(0),
        name: wordString
      })
      randoms.update(this.random)
      this.createWordName = ''
      this.get()
      this.update()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.random-container {
  position: relative;
  height: 200px;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfe9ec;
  .random-text {
    font-size: 3em;
  }
  .placeholder {
    bottom: 0;
    right: 0;
    position: absolute;
    color: darkgrey
  }
}
.words {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  .word {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid lightgrey;
    margin: 10px; 
    margin-bottom: 5px; 
    margin-top: 5px; 
    box-shadow: 2px 2px 3px -1px lightgrey;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
}
h3 {
  width: calc(100% - 20px);
  margin: auto;
  margin-top: 20px;
}
.input {
  display: flex;
  padding: 10px;
  input {
    width:100%;
    padding: 5px;
  }
}

.appear-enter-active, .appear-leave-active {
  transition: all .3s ease;
}
.appear-enter, .appear-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
