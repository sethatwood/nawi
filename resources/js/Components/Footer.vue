<template>
 <div
  class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-200 mt-8"
 >
  <h3 class="text-lg font-semibold mb-4">
   Built by Human+AI collaboration with 💜
  </h3>
  <p class="mb-4">
   Email us at
   <a href="mailto:hello@nawi.fun" class="text-blue-400 hover:text-blue-500"
    >hello@nawi.fun</a
   >
   |
   <a
    href="https://github.com/sethatwood/nawi"
    target="_blank"
    class="text-blue-400 hover:text-blue-500"
    >GitHub</a
   >
  </p>
  <div class="flex justify-center items-center space-x-4">
   <a
    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fnawi.fun"
    target="_blank"
    class="text-white hover:text-blue-400"
   >
    <i class="fab fa-facebook-square text-2xl"></i>
   </a>
   <a
    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fnawi.fun&text=Check%20out%20nawi%20-%20a%20captivating%20game%20of%20elemental%20strategy%20built%20by%20Human%2BAI%20collaboration%20with%20%F0%9F%92%9C"
    target="_blank"
    class="text-white hover:text-blue-400"
   >
    <i class="fab fa-twitter-square text-2xl"></i>
   </a>
   <a
    href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fnawi.fun&title=nawi%20-%20A%20captivating%20game%20of%20elemental%20strategy&summary=Check%20out%20nawi%20-%20a%20captivating%20game%20of%20elemental%20strategy%20built%20by%20Human%2BAI%20collaboration%20with%20%F0%9F%92%9C&source="
    target="_blank"
    class="text-white hover:text-blue-400"
   >
    <i class="fab fa-linkedin text-2xl"></i>
   </a>
  </div>
  <div class="flex justify-center items-center mt-4">
   <!-- javascript snippet to always show &copy; 2023[en dash][current year] -->
   <div>
    &copy; 2023&ndash;{{ new Date().getFullYear() }}
    <a href="/" class="text-blue-400 hover:text-blue-500">nawi.fun</a>
   </div>
  </div>
 </div>
</template>
