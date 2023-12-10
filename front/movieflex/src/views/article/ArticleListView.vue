<template>
  <div class="articles-body">
    <div class="mini-btn" 
    style="margin-bottom: 20px; text-align: center;"
    >
      <RouterLink :to="{ name: 'ArticleCreate' }">
        <div class="review" style="color: white">리뷰 생성</div>
      </RouterLink>
    </div> 
      <!-- <div v-if="articleStore.articleList"> -->
    <div class="cards">
      <div
        class="card"
        v-for="article in articleStore.articleList"
        :key="article.id"
      >
        <ArticleCard :article="article" />
      </div>
    </div>
  </div>
</template>
      
<script setup>
import { onMounted } from "vue";
import { useArticleStore } from "@/stores/articleStore";
import ArticleCard from "@/components/article/ArticleCard.vue";

const articleStore = useArticleStore();

onMounted(() => {
  articleStore.initializeArticleList();
});
</script>

<style scoped> 
.articles-body{
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #313131;
  /* justify-content: space-around; */
  gap: 20px;
}

a{
  text-decoration-line: none;
}
.cards{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.card{
  width: 18rem;
  height: 26rem;
  perspective: 1000px;
  margin: 0 5%;
  border: #313131;
  border-radius: 10%;
}

</style>

      