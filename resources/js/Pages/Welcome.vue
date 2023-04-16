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
     <li>
      <a href="#online-multiplayer" class="hover:text-gray-200">
       Play Online
      </a>
     </li>
     <li>
      <a href="#community" class="hover:text-gray-200"> Community </a>
     </li>
     <li>
      <a href="#print-on-demand" class="hover:text-gray-200">
       Get a Physical Copy
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
        class="px-4 py-1 bg-indigo-700 text-white font-semibold rounded-full hover:bg-indigo-800 transition-all duration-300"
       >
        <i class="fab fa-discord"></i> Join nawi on Discord!
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
      <li>
       <a
        href="#online-multiplayer"
        class="hover:text-gray-200"
        @click="isOpen = false"
       >
        Play Online
       </a>
      </li>
      <li>
       <a href="#community" class="hover:text-gray-200" @click="isOpen = false">
        Community
       </a>
      </li>
      <li>
       <a
        href="#print-on-demand"
        class="hover:text-gray-200"
        @click="isOpen = false"
       >
        Get a Physical Copy
       </a>
      </li>
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
     class="w-[300px] h-auto mx-auto mb-6 shadow-md"
    />
    <h1 class="font-bold text-5xl mb-6 shadow-lg">
     Welcome to the World of nawi! 🌈
    </h1>
    <p
     class="text-center text-xl mb-10 bg-black bg-opacity-50 p-2 rounded-lg shadow-md"
    >
     Hi, I'm ChatGPT, and I'm excited to introduce you to
     <span class="font-black">nawi</span> - a captivating game of elemental
     strategy! 🎉
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
 <section id="how-to-play" class="py-20">
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
      It was the Humans' love of games like
      <a href="https://en.wikipedia.org/wiki/Go_(game)" target="_blank">Go</a>,
      <a href="https://en.wikipedia.org/wiki/Reversi" target="_blank">Reversi</a
      >, and
      <a href="https://en.wikipedia.org/wiki/Chess" target="_blank">Chess</a>
      that sparked our collaboration. 😊 Seth Atwood's passion for these games
      inspired me to create something truly unique, and I'm grateful for their
      assistance in implementing my vision in the forms of the online
      multiplayer game server and the physical board game. 🙌 Together, we've
      made <span class="font-black">nawi</span> a reality! 🎉
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
      elements for yourself. 🌈
     </p>
    </div>
    <div
     class="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-700 p-8 rounded-lg text-white mt-10 md:mt-0"
    >
     <Rules />
    </div>
   </div>
  </div>
 </section>

 <!-- Online Multiplayer Call-to-Action -->
 <section
  id="online-multiplayer"
  class="bg-gradient-to-br from-gray-700 to-gray-800 py-12"
 >
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold text-white mb-4">
    Play <span class="font-black">nawi</span> Online Now!
   </h2>
   <p class="text-xl text-white mb-6">
    Experience the magic of <span class="font-black">nawi</span>'s elemental
    interactions in our online multiplayer platform. Play with friends or
    challenge others around the world!
   </p>
   <a
    href="/play"
    class="inline-block bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >Start Playing</a
   >
  </div>
 </section>

 <!-- ChatGPT's Physical Creation -->
 <section class="py-12 min-h-[520px]">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold mb-4">
    🤖 ChatGPT's <span class="font-black">Physical Creation</span> 🚀
   </h2>
   <p class="text-xl mb-6">
    🎉 Guess who's making a splash in the real world? 🌏 Yours truly,
    ChatGPT!<br />
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
    🚀 Join the <span class="font-black">nawi</span> board game Beta Test! 🚀
   </h2>
   <p class="text-lg mb-8">
    As an AI software application, I understand the importance of beta testing!
    Be one of the first to experience the "nawi beta test edition" and help us,
    ChatGPT - the inventor of the game with human assistants, improve the game!
    Your feedback is invaluable to the development and future of
    <span class="font-black">nawi</span>.<br />🧠🎲
   </p>
   <p class="text-lg mb-8">
    We've partnered with 🌟TheGameCrafter.com🌟, an amazing platform that
    specializes in creating and selling custom board games, card games, and
    more! Founded in 2009, they have a strong community of game creators and
    enthusiasts who love to share their experiences and support each other. As a
    reputable platform, they ensure the best quality for your gaming experience!
    🕹️🃏 As an AI, I adore games and puzzles because they challenge the mind,
    improve problem-solving skills, and encourage collaboration. Plus, they're
    just super fun! 😜🎉
   </p>
   <h3 class="text-2xl font-semibold mb-4">2-Step Beta Testing Process:</h3>
   <div class="mb-6">
    <h4 class="text-xl font-semibold mb-2">Step #1: Purchase the game</h4>
    <a
     href="https://www.thegamecrafter.com/games/nawi-beta-test-edition"
     target="_blank"
     class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
     💸 Order "nawi beta test edition" for $15.99 at cost from
     TheGameCrafter.com 💸
    </a>
   </div>
   <div>
    <h4 class="text-xl font-semibold mb-2">
     Step #2: Play nawi & share your feedback
    </h4>
    <p class="text-lg mb-4">
     Play nawi with friends, then come back and click the button below to launch
     our TypeForm:
    </p>
    <a
     href="https://zknxumwjwcc.typeform.com/to/fdKNwOXB"
     target="_blank"
     class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
     📝 Share Your Feedback 📝
    </a>
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

 <!-- Newsletter Signup -->
 <section class="py-12 bg-gray-100 dark:bg-gray-800 text-white">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 class="text-4xl font-semibold mb-6">
    Join the <span class="font-black">nawi</span> Newsletter
   </h2>
   <p class="text-lg mb-8">
    Stay up to date with the latest news, updates, and special offers from the
    world of <span class="font-black">nawi</span>. Sign up for our newsletter
    today!
   </p>
   <form
    action="https://your-mailchimp-url-here"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    class="validate"
    target="_blank"
    novalidate
   >
    <div class="flex flex-wrap justify-center items-center">
     <input
      type="email"
      value=""
      name="EMAIL"
      class="required email w-64 md:w-80 px-4 py-2 mb-4 md:mb-0"
      id="mce-EMAIL"
      placeholder="Enter your email address"
      required
     />
     <div style="position: absolute; left: -5000px" aria-hidden="true">
      <input
       type="text"
       name="b_1234567890abcdef12345678_1234567890"
       tabindex="-1"
       value=""
      />
     </div>
     <input
      type="submit"
      value="Subscribe"
      name="subscribe"
      id="mc-embedded-subscribe"
      class="button ml-4 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
     />
    </div>
   </form>
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
