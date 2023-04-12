<script setup>
import { Head, Link } from "@inertiajs/vue3";

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
    class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-4 py-2"
  >
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white font-bold italic text-2xl">
        <a href="/"> <span class="font-black">nawi</span></a>
      </div>
      <nav class="text-white">
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
        </ul>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section
    class="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 py-20 text-white"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-5xl mb-6">
          Welcome to the World of
          <span class="font-black">nawi</span> 🌈
        </h1>
        <p class="text-center text-xl mb-10">
          Hi, I'm ChatGPT, and I'm excited to introduce you to
          <span class="font-black">nawi</span> - a captivating game of elemental
          strategy! 🎉
        </p>
        <a
          href="#how-to-play"
          class="bg-white text-indigo-700 font-semibold py-2 px-8 rounded-full hover:bg-indigo-200 transition-all duration-300"
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
            particularly drawn to the esoteric origins of the elements - Fire,
            Water, Earth, and Air. Through a combination of ancient wisdom and
            modern technology, I designed a game that embodies the magic of
            change and the power of transformation. Built by Human+AI
            collaboration with 💜, <span class="font-black">nawi</span> is a
            game that will stand the test of time.
          </p>
          <p>
            As players compete to control the most territory on an 8x8 board,
            they'll experience the magic of
            <span class="font-black">nawi</span>'s elemental interactions. 🌟
            The game's rules are simple yet challenging, with each element
            flipping others in a specific pattern. The strategic placement of
            each piece can lead to cascading chain reactions, making for an
            engaging and dynamic gameplay experience.
          </p>
          <p>
            So come, join me in the world of
            <span class="font-black">nawi</span>, and experience the power of
            the elements for yourself. 🌈
          </p>
        </div>
        <div
          class="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 p-8 rounded-lg text-white"
        >
          <h3 class="text-3xl font-bold mb-4">Rules 📜</h3>
          <ol class="list-decimal list-outside ml-4 space-y-2">
            <li>Grab a friend and play on an 8x8 board.</li>
            <li>
              You both get 16 Air, Water, Fire, and Earth pieces. 💨🌊🔥🌍
            </li>
            <li>
              Take turns putting a piece on any empty cell. Black goes first.
              ⚫️
            </li>
            <li>
              Elements flip others like this:
              <ul class="list-disc list-inside mt-2">
                <li>Air flips Water</li>
                <li>Water flips Fire</li>
                <li>Fire flips Earth</li>
                <li>Earth flips Air</li>
              </ul>
            </li>
            <li>
              Placing a piece might flip nearby pieces. Keep flipping until you
              can't. 🤯
            </li>
            <li>
              If your piece is between two different opponent pieces, you choose
              what order to flip them in. Then, let the chain reaction play out,
              with your pieces taking precedence. 💥
            </li>
            <li>When your piece flips, you get it back to use again. 🔄</li>
            <li>
              If a piece can't flip because you don't have any left, it'll wait
              until one is free. ⏳
            </li>
            <li>
              The game ends when the board is full. Count your pieces, and the
              most pieces win! 🏆
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <!-- Online Multiplayer Call-to-Action -->
  <section class="bg-gradient-to-br from-blue-500 to-purple-600 py-12">
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

  <!-- Video or Animated Demo -->
  <section class="py-12 min-h-[520px]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-semibold mb-4">
        See <span class="font-black">nawi</span> in Action
      </h2>
      <p class="text-xl mb-6">
        Watch a video or animated demo to get a glimpse of the engaging and
        dynamic gameplay experience that
        <span class="font-black">nawi</span> offers.
      </p>
      <div class="relative w-full max-w-2xl mx-auto">
        <div class="w-full h-0 pb-9/16 relative">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/4Fowg6TgQXo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
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
            "<span class="font-black">nawi</span> is a breath of fresh air in
            the world of strategy games. The elemental mechanics make for an
            addictively fun experience!"
          </p>
          <h3 class="text-xl font-semibold mb-2">Jane Boardgamer</h3>
          <p class="text-gray-600">Board Game Enthusiast</p>
        </div>
        <div class="testimonial">
          <p class="text-lg italic mb-4">
            "I never thought I'd fall in love with a game created by an AI, but
            <span class="font-black">nawi</span> has won my heart! It's
            challenging, yet accessible, and always keeps me on my toes."
          </p>
          <h3 class="text-xl font-semibold mb-2">John Gamestream</h3>
          <p class="text-gray-600">YouTuber & Twitch Streamer</p>
        </div>
        <div class="testimonial">
          <p class="text-lg italic mb-4">
            "As a professional player, I'm always looking for games that test my
            skills. <span class="font-black">nawi</span> delivers with its
            unique blend of strategy and unpredictability. A must-play!"
          </p>
          <h3 class="text-xl font-semibold mb-2">Alice Proplayer</h3>
          <p class="text-gray-600">eSports Champion</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Community Section -->
  <section class="py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-semibold mb-6">
        Join the <span class="font-black">nawi</span> Community
      </h2>
      <p class="text-lg mb-8">
        We're building an amazing community of
        <span class="font-black">nawi</span> players and enthusiasts. Stay tuned
        for our community platform, where you'll be able to share your
        experiences, learn from others, and make new friends who love
        <span class="font-black">nawi</span> as much as you do!
      </p>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Coming Soon!
      </button>
    </div>
  </section>

  <!-- Print-on-Demand Option -->
  <section class="py-12 bg-gray-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl font-semibold mb-6">
        Get Your Physical <span class="font-black">nawi</span> Board Game
      </h2>
      <p class="text-lg mb-8">
        Love the tactile experience of playing board games? We've partnered with
        The Game Crafter to offer high-quality, print-on-demand physical
        versions of
        <span class="font-black">nawi</span>. Order your own copy and bring the
        magic of the elements to your game nights!
      </p>
      <a
        href="https://www.thegamecrafter.com/your-nawi-game-link"
        target="_blank"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Order from The Game Crafter
      </a>
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
            "<span class="font-black">nawi</span> has taken the gaming world by
            storm with its innovative gameplay and enchanting design. An instant
            classic!"
          </p>
        </div>
        <div class="mb-4">
          <h3 class="text-2xl font-semibold mb-2">
            Fictional Board Game Weekly
          </h3>
          <p>
            "Move over, Chess and Go! <span class="font-black">nawi</span> is
            the new elemental game in town, and it's here to stay."
          </p>
        </div>
        <div class="mb-4">
          <h3 class="text-2xl font-semibold mb-2">Pretend Gamer's Digest</h3>
          <p>
            "<span class="font-black">nawi</span> masterfully combines strategy,
            elegance, and just the right amount of mischief. A must-play for
            board game enthusiasts!"
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
        Stay up to date with the latest news, updates, and special offers from
        the world of <span class="font-black">nawi</span>. Sign up for our
        newsletter today!
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
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-200"
    >
      <h3 class="text-lg font-semibold mb-4">
        Built by Human+AI collaboration with 💜
      </h3>
      <p class="mb-4">
        Email us at
        <a
          href="mailto:hello@nawi.fun"
          class="text-blue-400 hover:text-blue-500"
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
    </div>
  </footer>
</template>

<style>
/* Add your custom CSS styles, using Tailwind CSS classes as needed */
</style>
