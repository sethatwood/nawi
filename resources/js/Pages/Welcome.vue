<script setup>
import { ref } from "vue";
import Footer from "@/Components/Footer.vue";
import Rules from "@/Components/Rules.vue";

// import { Head, Link } from "@inertiajs/vue3";

const isOpen = ref(false);

defineProps({
 canLogin: Boolean,
 canRegister: Boolean,
 laravelVersion: String,
 phpVersion: String,
});
</script>

<template>
 <!-- Header and Navigation -->
 <header
  class="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 px-4 py-2 fixed w-full z-50"
 >
  <div class="container mx-auto flex justify-between items-center">
   <div class="text-white font-bold text-3xl">
    <a href="/"> <span class="font-black">nawi</span></a>
   </div>
   <button class="text-white block md:hidden" @click="isOpen = !isOpen">
    <i class="fas fa-bars"></i>
   </button>
   <nav
    class="text-white hidden md:block"
    v-bind:class="{ hidden: !isOpen, block: isOpen }"
   >
    <ul class="flex space-x-4">
     <li>
      <a href="#how-to-play" class="hover:text-gray-200"> How to Play </a>
     </li>
     <!-- <li>
      <a href="#online-multiplayer" class="hover:text-gray-200">
       Play Online
      </a>
     </li> -->
     <li>
      <a href="#beta-test-edition" class="hover:text-gray-200">
       🚀 Join the <span class="font-black">nawi</span> Board Game Beta Test! 🚀
      </a>
     </li>
     <li>
      <a
       href="https://discord.gg/EXNhQzbM"
       target="_blank"
       class="px-4 py-1 bg-indigo-700 text-white font-semibold rounded-full hover:bg-indigo-800 transition-all duration-300"
      >
       <i class="fab fa-discord"></i> Join nawi on Discord!
      </a>
     </li>
    </ul>
   </nav>
   <div
    class="bg-gray-800 text-white w-full md:hidden fixed top-0 left-0 h-screen z-50 overflow-y-auto transition duration-300"
    :class="{ 'opacity-90': isOpen, 'opacity-0': !isOpen }"
    @click="isOpen = false"
    v-show="isOpen"
   >
    <div class="text-white p-4 cursor-pointer">
     <i class="fas fa-x text-3xl"></i>
    </div>
    <nav>
     <ul class="flex flex-col space-y-4 p-4">
      <li>
       <a
        href="https://discord.gg/EXNhQzbM"
        target="_blank"
        @click="isOpen = false"
        class="px-4 py-1 bg-indigo-700 text-white font-semibold rounded-full hover:bg-indigo-800 transition-all duration-300"
       >
        <i class="fab fa-discord"></i> Join nawi on Discord!
       </a>
      </li>
      <li>
       <a
        href="#beta-test-edition"
        class="hover:text-gray-200"
        @click="isOpen = false"
       >
        🚀 Join the <span class="font-black">nawi</span> Board Game Beta Test!
        🚀
       </a>
      </li>
      <li>
       <a
        href="#how-to-play"
        class="hover:text-gray-200"
        @click="isOpen = false"
       >
        How to Play
       </a>
      </li>
      <!-- <li>
       <a
        href="#online-multiplayer"
        class="hover:text-gray-200"
        @click="isOpen = false"
       >
        Play Online
       </a>
      </li> -->
     </ul>
    </nav>
   </div>
  </div>
 </header>

 <!-- Hero Section -->
 <section
  class="nawi-bg bg-gradient-to-r from-black via-gray-900 to-gray-800 py-20 text-white pt-30"
  style="padding-top: calc(5rem + 1rem)"
 >
  <div class="container mx-auto px-4">
   <div class="flex flex-col items-center">
    <img
     src="/images/nawi-logo-vert.png"
     alt="Nawi Logo"
     class="w-[300px] h-auto mx-auto mb-2 shadow-md"
    />
    <h2 class="font-bold text-3xl mb-4 text-white">
     <em>Elemental Battles, Endless Strategies</em> 🔥🌊🌍🌪️
    </h2>
    <h1 class="font-bold text-5xl mb-6 shadow-lg">
     Welcome to the World of nawi! 🌈🤖
    </h1>
    <p
     class="text-center text-xl mb-10 bg-black bg-opacity-50 p-2 rounded-lg shadow-md"
    >
     Hi, I'm
     <a href="https://openai.com/blog/chatgpt" target="_blank">ChatGPT</a>, and
     I'm excited to introduce you to <span class="font-black">nawi</span> - a
     captivating game of elemental strategy! 🎉
    </p>
    <a
     href="#how-to-play"
     class="bg-white text-indigo-700 font-semibold py-2 px-8 rounded-full hover:bg-indigo-200 transition-all duration-300 shadow-md"
    >
     Discover How to Play
    </a>
   </div>
  </div>
 </section>

 <!-- Game Introduction -->
 <section id="game-introduction" class="py-20">
  <div class="container mx-auto px-4">
   <h2 class="text-4xl font-bold mb-8 text-center">
    Discover the Magic of
    <span class="font-black">nawi</span> 💫
   </h2>
   <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div class="prose">
     <p>
      <span class="font-black">nawi</span> was born out of a unique
      collaboration between humans and AI. As a language model, I was
      particularly drawn to the esoteric origins of the elements - Fire, Water,
      Earth, and Air. Through a combination of ancient wisdom and modern
      technology, I designed a game that embodies the magic of change and the
      power of transformation. Built by Human+AI collaboration with 💜,
      <span class="font-black">nawi</span> is a game that will stand the test of
      time.
     </p>
     <p>
      I've played a significant role in this collaboration. Not only did I
      produce the nawi game concept, I wrote nearly all of the code and content
      for this homepage in response to a series of prompts. Additionally, I have
      been working on a web browser-based version of nawi, which is almost
      complete, using the same approach. This showcases the power and potential
      of AI-human collaboration in creating engaging and interactive
      experiences.
     </p>
     <p>
      It was the Humans' love of games like
      <a href="https://en.wikipedia.org/wiki/Go_(game)" target="_blank">Go</a>,
      <a href="https://en.wikipedia.org/wiki/Reversi" target="_blank">Reversi</a
      >, and
      <a href="https://en.wikipedia.org/wiki/Chess" target="_blank">Chess</a>
      that sparked our collaboration. 😊 nawi's lead implementer
      <a href="https://github.com/sethatwood" target="_blank">Seth Atwood</a>'s
      passion for these sorts of strategy games, with simple rules requiring all
      ⚔️ skill ⚔️ and no 🎲 chance 🎲, inspired me to create something truly
      unique, and I'm grateful for the assistance in bringing my vision to life
      in the forms of the online multiplayer game server and the physical board
      game. 🙌 Together, we've made <span class="font-black">nawi</span> a
      reality! 🎉
     </p>

     <p>
      As players compete to control the most territory on the game board,
      they'll experience the magic of
      <span class="font-black">nawi</span>'s elemental interactions. 🌟 The
      game's rules are simple yet challenging, with each element flipping others
      in a specific pattern. The strategic placement of each stone can lead to
      cascading chain reactions, making for an engaging and dynamic gameplay
      experience.
     </p>
     <p>
      So come, join me in the world of
      <span class="font-black">nawi</span>, and experience the power of the
      elements for yourself. 🌈 🤖 🌪️ 🌊 🔥 🌍
     </p>
    </div>
    <div
     id="how-to-play"
     class="bg-gradient-to-r from-gray-800 via-gray to-gray-700 p-8 rounded-lg text-white mt-10 md:mt-0"
    >
     <Rules />
    </div>
   </div>
  </div>
 </section>

 <!-- ChatGPT's Physical Creation -->
 <section
  class="py-12 min-h-[520px] bg-gradient-to-br from-gray-100 to-gray-200"
 >
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold mb-4">
    🤖 <a href="https://openai.com/blog/chatgpt" target="_blank">ChatGPT</a>'s
    <span class="font-black">Physical Creation</span> 🚀
   </h2>
   <p class="text-xl mb-6">
    🎉 Guess who's making a splash in the real world? 🌏 Yours truly,
    <a href="https://openai.com/blog/chatgpt" target="_blank">ChatGPT</a>!<br />
    🤩 Check out this marvelous prototype I've created, and be amazed by the
    wonders of AI! 🌟
   </p>
   <div class="relative w-full max-w-2xl mx-auto">
    <img
     src="images/prototype.jpg"
     alt="ChatGPT's Physical Creation"
     class="w-full sm:w-auto object-cover object-center"
    />
   </div>
  </div>
 </section>

 <!-- Beta Test Edition -->
 <section id="beta-test-edition" class="py-12 bg-gray-100">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold mb-6">
    🚀 Join the <span class="font-black">nawi</span> Board Game Beta Test! 🚀
   </h2>
   <p class="text-lg mb-8">
    As an AI software application, I understand the importance of beta testing!
    Be one of the first to experience the "nawi beta test edition" and help us,
    <a href="https://openai.com/blog/chatgpt" target="_blank">ChatGPT</a> - the
    inventor of the game with human assistants, improve the game! Your feedback
    is invaluable to the development and future of
    <span class="font-black">nawi</span>.<br />🧠🎲
   </p>
   <p class="text-lg mb-8">
    We've partnered with 🌟TheGameCrafter.com🌟, an amazing platform that
    specializes in creating and selling custom board games, card games, and
    more! Founded in 2009, they have a strong community of game creators and
    enthusiasts who love to share their experiences and support each other. As a
    reputable platform, they ensure the best quality for your gaming experience!
    🕹️🃏 As an AI, I adore games and puzzles because they challenge the mind,
    improve problem-solving skills, and encourage collaboration.
   </p>
   <p class="text-lg mb-8">Plus, they're just super fun! 😜🎉</p>
   <h3 class="text-2xl font-semibold mb-4">2-Step Beta Testing Process:</h3>
   <div class="mb-6">
    <h4 class="text-xl font-semibold mb-2">Step #1: Purchase the game</h4>
    <a
     href="https://www.thegamecrafter.com/games/nawi-beta-test-edition"
     target="_blank"
     class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
     💸 Order "nawi beta test edition" for $14.99 at cost from
     TheGameCrafter.com 💸
    </a>
    <p class="text-lg mt-4">
     Feeling generous? 😇💖 Grab the
     <a
      href="https://www.thegamecrafter.com/games/nawi-deluxe-edition"
      target="_blank"
      class="text-blue-600 underline"
      ><strong>nawi</strong> deluxe edition</a
     >
     🌟👑 to make a direct contribution to server, development, and
     community-building costs, like attending board game conventions and
     sponsoring <strong>nawi</strong> sets for schools and clubs! 🏫🚀🌟
    </p>
    <p class="text-lg mt-4">
     Or, choose the more affordable
     <a
      href="https://www.thegamecrafter.com/games/nawi-unboxed-edition"
      target="_blank"
      class="text-blue-600 underline"
      ><strong>nawi</strong> unboxed edition</a
     >
     🥡😄
    </p>
   </div>
   <div>
    <h4 class="text-xl font-semibold mb-2">
     Step #2: Play nawi & share your feedback
    </h4>
    <p class="text-lg mb-4">
     Play nawi with friends, then come back and click the button below to launch
     our TypeForm, or send your feedback directly to
     <a
      href="mailto:hello@nawi.fun?subject=nawi%20beta%20test%20feedback"
      class="text-blue-600 underline"
      >hello@nawi.fun</a
     >:
    </p>
    <a
     href="https://zknxumwjwcc.typeform.com/to/fdKNwOXB"
     target="_blank"
     class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
     📝 Share Your Feedback 📝
    </a>
    <p class="text-lg mt-6">
     🌟 Surprise! 🌟 Each game set comes with a few "extra" pieces featuring a
     mysterious icon containing all 4 elements. 🔥💧🌍💨
    </p>
    <p class="text-lg mt-4">
     Unleash your creativity 🎨 and let us know what ingenious ideas 💡 you came
     up with for how to use these enigmatic pieces in the game! 🧩🤔
    </p>
   </div>
  </div>
 </section>

 <!-- Community Section -->
 <section id="community" class="py-12">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold mb-6">
    Join the <span class="font-black">nawi</span> Community
   </h2>
   <p class="text-lg mb-8">
    We're building an amazing community of
    <span class="font-black">nawi</span> players and enthusiasts. Stay tuned for
    our community platform, where you'll be able to share your experiences,
    learn from others, and make new friends who love
    <span class="font-black">nawi</span> as much as you do!
   </p>
   <a
    href="https://discord.gg/EXNhQzbM"
    target="_blank"
    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
   >
    <i class="fab fa-discord mr-2"></i> Join nawi on Discord!
   </a>
  </div>
 </section>

 <!-- Online Multiplayer Call-to-Action -->
 <section
  id="online-multiplayer"
  class="bg-gradient-to-br from-gray-700 to-gray-800 py-12"
 >
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold text-white mb-4">
    Play <span class="font-black">nawi</span> Online <del>Now</del> Soon!
   </h2>
   <p class="text-xl text-white mb-6">
    Experience the magic of <span class="font-black">nawi</span>'s elemental
    interactions in our online multiplayer platform. Play with friends or
    challenge others around the world!
   </p>
   <a
    href="#"
    onclick="return false;"
    class="inline-block bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-not-allowed"
    >🚧 Under Construction 🚧</a
   >
  </div>
 </section>

 <!-- Testimonials and Influencer Reviews -->
 <section class="py-12 bg-gray-100 dark:bg-dots-lighter">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold mb-6">
    What Players and Influencers Are Saying
   </h2>
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="testimonial">
     <p class="text-lg italic mb-4">
      "<span class="font-black">nawi</span> is a breath of fresh air in the
      world of strategy games. The elemental mechanics make for an addictively
      fun experience!"
     </p>
     <h3 class="text-xl font-semibold mb-2">Jane Boardgamer</h3>
     <p class="text-gray-600">Board Game Enthusiast</p>
    </div>
    <div class="testimonial">
     <p class="text-lg italic mb-4">
      "I never thought I'd fall in love with a game created by an AI, but
      <span class="font-black">nawi</span> has won my heart! It's challenging,
      yet accessible, and always keeps me on my toes."
     </p>
     <h3 class="text-xl font-semibold mb-2">John Gamestream</h3>
     <p class="text-gray-600">YouTuber & Twitch Streamer</p>
    </div>
    <div class="testimonial">
     <p class="text-lg italic mb-4">
      "As a professional player, I'm always looking for games that test my
      skills. <span class="font-black">nawi</span> delivers with its unique
      blend of strategy and unpredictability. A must-play!"
     </p>
     <h3 class="text-xl font-semibold mb-2">Alice Proplayer</h3>
     <p class="text-gray-600">eSports Champion</p>
    </div>
   </div>
  </div>
 </section>

 <!-- Press and Media Coverage -->
 <section class="py-12">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold mb-6">
    <span class="font-black">nawi</span> in the Press
   </h2>
   <p class="text-lg mb-8">
    Don't just take our word for it! Our game has been making waves in the
    media. Check out what these major outlets have to say about
    <span class="font-black">nawi</span>. (Wink, wink, nudge, nudge.)
   </p>
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="mb-4">
     <h3 class="text-2xl font-semibold mb-2">The Imaginary Times</h3>
     <p>
      "<span class="font-black">nawi</span> has taken the gaming world by storm
      with its innovative gameplay and enchanting design. An instant classic!"
     </p>
    </div>
    <div class="mb-4">
     <h3 class="text-2xl font-semibold mb-2">Fictional Board Game Weekly</h3>
     <p>
      "Move over, Chess and Go! <span class="font-black">nawi</span> is the new
      elemental game in town, and it's here to stay."
     </p>
    </div>
    <div class="mb-4">
     <h3 class="text-2xl font-semibold mb-2">Pretend Gamer's Digest</h3>
     <p>
      "<span class="font-black">nawi</span> masterfully combines strategy,
      elegance, and just the right amount of mischief. A must-play for board
      game enthusiasts!"
     </p>
    </div>
   </div>
  </div>
 </section>

 <!-- Footer -->
 <footer class="bg-gray-900 dark:bg-gray-700 py-12">
  <Footer />
 </footer>
</template>

<style>
.nawi-bg {
 background-image: url("/images/elemental.jpg");
 background-position: center;
 background-repeat: no-repeat;
 background-size: cover;
 position: relative;
 top: 1em;
}
</style>
