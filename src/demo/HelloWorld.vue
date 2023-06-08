<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="handleClick">{{ count }}</button>
    <input type="text" v-model="todo" />
    <button class="addTodo" @click="addTodo">add</button>
    <button class="loadUser" @click="loadUser">load</button>
    <p v-if="user.loading" class="loading">loading</p>
    <div v-else class="userName">{{ user.data && user.data.username }}</div>
    <p v-if="user.error" class="error">error!</p>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
    </ul>
    <HelloItem :msg="msg" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue'
import HelloItem from './HelloItem.vue'
import axios from 'axios'
defineProps({ msg: { type: String, default: 'hello vitest' } })
const emits = defineEmits(['send'])
const count = ref(1)

const handleClick = () => count.value++

const todo = ref('todo')
const todos = ref<string[]>([])

const addTodo = () => {
  todos.value.push(todo.value)
  emits('send', todo.value)
}

const user = reactive({
  data: null as any,
  loading: false,
  error: false
})

const loadUser = () => {
  user.loading = true
  axios
    .get('https://jsonplaceholder.typicode.com/users/1')
    .then((res) => {
      user.data = res.data
    })
    .catch(() => (user.error = true))
    .finally(() => (user.loading = false))
}
</script>

<style scoped></style>
