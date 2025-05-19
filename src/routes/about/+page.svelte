<script lang="ts">
  const features = [
    {
      title: 'Tournament Management',
      description: 'Easily create and manage golf tournaments with our intuitive interface. Set up tournament details, manage registrations, and track scores in real-time.'
    },
    {
      title: 'Player Profiles',
      description: 'Maintain detailed player profiles with handicaps, tournament history, and performance statistics. Track player progress over time.'
    },
    {
      title: 'Real-time Leaderboards',
      description: 'View live tournament standings and leaderboards. Get instant updates on player scores and tournament progress.'
    }
  ];
</script>

<svelte:head>
  <title>About - RCS Golf Tournaments</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">About RCS Golf Tournaments</h1>

    <div class="prose prose-lg mb-12">
      <p class="text-gray-600 mb-6">
        Welcome to RCS Golf Tournaments, your premier platform for managing and participating in golf tournaments. 
        Our system is designed to streamline the tournament experience for organizers and players alike.
      </p>
      <p class="text-gray-600">
        Whether you're a tournament organizer looking to manage your event or a player seeking to join competitions, 
        our platform provides all the tools you need for a seamless golf tournament experience.
      </p>
    </div>

    <div class="grid gap-8 md:grid-cols-3 mb-12">
      {#each features as feature}
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="text-blue-600 mb-4">
            {#if feature.title === 'Tournament Management'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            {:else if feature.title === 'Player Profiles'}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            {:else}
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            {/if}
          </div>
          <h3 class="text-xl font-semibold mb-2">{feature.title}</h3>
          <p class="text-gray-600">{feature.description}</p>
        </div>
      {/each}
    </div>

    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
      <p class="text-gray-600 mb-4">
        Have questions or need assistance? Our team is here to help.
      </p>
      <div class="space-y-2">
        <p class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          support@rcsgolf.com
        </p>
        <p class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          (555) 123-4567
        </p>
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f3f4f6;
  }
</style> 