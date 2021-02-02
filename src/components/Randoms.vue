<template>
  <div>
    <button @click="$router.push({name: 'dice'})" class="dice"><i class="fas fa-dice"></i></button>
    <div class="input">
      <input type="text" placeholder="Nom du jeu à créer..." v-model="createName">
      <button :disabled="!createName" @click="create()">
        <i class="fas fa-check"></i>
      </button>
    </div>
    <ul class="randoms">
      <li v-for="random of randomsSorted" :key="random.id" class="random" @click="goTo(random)">
        <div>
          {{random.name}}
        </div>
        <button @click.stop="deleteRandom(random)"><i class="fas fa-times"></i></button>
      </li>
    </ul>
  </div>
</template>

<script>
import randoms from '../services/randoms.js'
import sort from 'fast-sort'
export default {
  name: 'Randoms',
  data() {
    return {
      randoms: [],
      createName: ''
    }
  },
  computed: {
    randomsSorted() {
      return sort(this.randoms).desc(random => random.date)
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    getAll() {
      this.randoms = randoms.all()
    },
    deleteRandom(random){
      randoms.delete(random)
      this.getAll()
    },
    create(name = this.createName) {
      if(name) {
        randoms.save({ name })
      }
      this.createName = ''
      this.getAll()
    },
    goTo(random) {
      this.$router.push({name: 'random', params: {id: random.id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.randoms {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  .random {
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
.input {
  display: flex;
  padding: 10px;
  input {
    width:100%;
    padding: 5px;
  }
}
.dice {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 70px;
    height: 70px;
    border-radius: 100%;
    border: none;
    box-shadow: 1px 2px 5px 1px lightgrey;
    color: white;
    background-color: #85a9b7;
    font-weight: bold;
    i {
      font-size: 2em;
    }
}
</style>
