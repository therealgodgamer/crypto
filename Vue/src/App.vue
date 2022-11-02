<script lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
  import axios from 'axios'

  export default{
  
  async created() {
    // GET request using fetch with async/await
        var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers:{
    'Content-Type': 'application/json',
    'Content-Encoding': 'gzip'
  },
};
    const apiUrl = "http://api.coincap.io/v2/assets";
    const response = await fetch(apiUrl,requestOptions);
    
    console.log(response)
    const data = await response.text();
    console.log(data)


    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", apiUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);

    // this.crypto = data;
    // console.log(this.crypto)
    
    // const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL')

    // pricesWs.onmessage = function (msg) {
    // console.log(msg.data)

    // }



},
data(){
    return{
      crypto:null
    }
  },
}

</script>

<template>
  <header>
    Hi
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
} */



</style>
