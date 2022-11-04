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

.footer {
  height: 55px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 20px;
}

a:hover {
  cursor: pointer;
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
        <text>
          ${{
            parseFloat(crypto.priceUsd).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          }}
        </text>
      </div>
    </template>
  </div>

  <div class="footer">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li
          v-if="!onSearch"
          class="page-item"
          :class="page === 1 ? 'disabled' : ''"
        >
          <a class="page-link" @click="prevPage">Previous</a>
        </li>
        <li
          v-else
          class="page-item"
          :class="searchPage === 1 ? 'disabled' : ''"
        >
          <a class="page-link" @click="prevSearchPage">Previous</a>
        </li>

        <li
          v-if="!onSearch"
          class="page-item"
          :class="page === lastPage ? 'disabled' : ''"
        >
          <a class="page-link" @click="nextPage">Next</a>
        </li>
        <li
          v-else
          class="page-item"
          :class="searchPage === lastSearchPage ? 'disabled' : ''"
        >
          <a class="page-link" @click="nextSearchPage">Next</a>
        </li>
      </ul>
    </nav>
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
      page: 1,
      loading: false,
      perPage: 10,
      searchPage: 1,
      onSearch: false,
      searchList: [],
    };
  },
  computed: {
    submit() {
      if (this.search) {
        // this.displayCrypto = this.crypto.filter()
        this.onSearch = true;
        this.searchList = this.crypto.filter((item) =>
          this.search
            .toLowerCase()
            .split(" ")
            .every((s) => item.id.toLowerCase().includes(s))
        );
        let start = (this.searchPage - 1) * this.perPage;
        let end = start + this.perPage;
        this.loading = false;
        console.log(this.searchList);
        console.log(this.searchList.slice(start, end));
        console.log(this.searchPage);
        return this.searchList.slice(start, end);
      } else {
        this.onSearch = false;
        let start = (this.page - 1) * this.perPage;
        let end = start + this.perPage;
        this.loading = false;
        return this.crypto.slice(start, end);
      }
    },
    showRepos() {
      let start = (this.page - 1) * this.perPage;
      let end = start + this.perPage;
      this.loading = false;
      return this.crypto.slice(start, end);
    },
    lastPage() {
      // console.log("last");
      let length = this.crypto.length;
      return Math.round(length / this.perPage);
    },
    lastSearchPage() {
      let length = this.searchList.length;
      return Math.round(length / this.perPage);
    },
  },
  methods: {
    prevPage() {
      this.loading = true;
      this.page--;
    },
    nextPage() {
      this.loading = true;
      this.page++;
    },
    prevSearchPage() {
      this.loading = true;
      this.searchPage--;
    },
    nextSearchPage() {
      this.loading = true;
      this.searchPage++;
    },
  },
};
</script>
