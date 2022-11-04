<style scoped>
.crypto-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 30px;
  margin-right: 30px;
  row-gap: 10px;

  /* justify-content: center; */
}

.crypto-price,
.crypto-list {
  /* background-color: lightpink; */
  border-style: solid;
  border-color: black;
  border-width: 1px;
  color: rgb(209, 208, 209);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 30px;
  font-weight: 400;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: rgba(244, 244, 244, 0.3);
  padding-top: 10px;
  padding-bottom: 10px;
  /* padding-left: 150px; */
  text-align: center;
}

.crypto-title {
  color: rgb(244, 244, 244);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
}
/* .search-bar {
  display: block;
} */

.header {
  height: 55px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background-color: rgb(7, 21, 43);
  /* border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(228, 228, 228); */
}

.middle-section {
  /* flex: 1; */
  /* margin-left: 70px;
  margin-right: 35px; */
  /* max-width: 500px; */
  display: flex;
  align-items: center;
  /* background-color: lightblue; */
  /* width: 300px; */
}

.search-bar {
  flex: 1;
  height: 30px;
  font-size: 15px;
  border-style: solid;
  border-color: rgb(192, 192, 192);
  border-radius: 2px;
  box-shadow: inset 1px 2px 3px rgba(0, 0, 0, 0.05);
}

.search-bar::placeholder {
  font-size: 15px;
}
</style>

<template>
  <div class="header">
    <div class="left-section"></div>
    <div class="middle-section">
      <input
        class="search-bar"
        type="text"
        placeholder="Search"
        v-model="search"
      />
    </div>
    <div class="right-section"></div>
  </div>

  <div class="crypto-grid">
    <div class="crypto-title">Crypto</div>
    <div class="crypto-title">Price (USD)</div>
    <template v-for="crypto in submit">
      <div class="crypto-list">
        <text>
          {{ crypto.id }}
        </text>
      </div>
      <div class="crypto-price">
        <text> ${{ parseFloat(crypto.priceUsd).toFixed(2) }} </text>
      </div>
    </template>
  </div>

  <!-- <RouterView /> -->
</template>

<script lang="ts">
// import { RouterLink, RouterView } from 'vue-router'

export default {
  async created() {
    // GET request using fetch with async/await
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const apiUrl = "http://api.coincap.io/v2/assets";
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    this.crypto = data.data;
  },
  data() {
    return {
      crypto: [],
      search: "",
    };
  },
  computed: {
    submit() {
      if (this.search) {
        // this.displayCrypto = this.crypto.filter()
        const searchList = this.crypto.filter((item) =>
          this.search
            .toLowerCase()
            .split(" ")
            .every((s) => item.id.toLowerCase().includes(s))
        );
        return searchList;
      } else {
        return this.crypto;
      }
    },
  },
};
</script>
