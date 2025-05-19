<script lang="ts">
  import { page } from '$app/stores';
  
  interface Player {
    id: string;
    name: string;
    handicap: number;
    score?: number;
  }

  interface Tournament {
    id: string;
    name: string;
    date: string;
    location: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    players: Player[];
    description: string;
  }

  // Mock data - in a real app, this would come from an API
  const tournament: Tournament = {
    id: $page.params.id,
    name: 'Summer Championship 2024',
    date: '2024-07-15',
    location: 'Pine Valley Golf Club',
    status: 'upcoming',
    description: 'Join us for the annual Summer Championship at the prestigious Pine Valley Golf Club. This tournament features a challenging 18-hole course and is open to players of all skill levels.',
    players: [
      { id: '1', name: 'John Doe', handicap: 12, score: 72 },
      { id: '2', name: 'Jane Smith', handicap: 8, score: 68 },
      { id: '3', name: 'Mike Johnson', handicap: 15, score: 75 }
    ]
  };

  let showRegistrationForm = false;
  let newPlayer = {
    name: '',
    handicap: 0
  };

  function handleRegistration() {
    // In a real app, this would make an API call
    tournament.players = [...tournament.players, {
      id: String(tournament.players.length + 1),
      ...newPlayer
    }];
    showRegistrationForm = false;
    newPlayer = { name: '', handicap: 0 };
  }
</script>

<svelte:head>
  <title>{tournament.name} - RCS Golf Tournaments</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-4xl mx-auto">
    <a href="/" class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Tournaments
    </a>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h1 class="text-3xl font-bold mb-4">{tournament.name}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <p class="text-gray-600 mb-2">
            <span class="font-semibold">Date:</span> {new Date(tournament.date).toLocaleDateString()}
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-semibold">Location:</span> {tournament.location}
          </p>
          <p class="text-gray-600">
            <span class="font-semibold">Status:</span>
            <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold ml-2
              {tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
               tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
               'bg-gray-100 text-gray-800'}">
              {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
            </span>
          </p>
        </div>
        <div>
          <p class="text-gray-600 mb-4">{tournament.description}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Leaderboard</h2>
        {#if tournament.status === 'upcoming'}
          <button
            on:click={() => showRegistrationForm = !showRegistrationForm}
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {showRegistrationForm ? 'Cancel Registration' : 'Register Now'}
          </button>
        {/if}
      </div>

      {#if showRegistrationForm}
        <div class="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 class="text-xl font-semibold mb-4">Player Registration</h3>
          <form on:submit|preventDefault={handleRegistration} class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                bind:value={newPlayer.name}
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label for="handicap" class="block text-sm font-medium text-gray-700">Handicap</label>
              <input
                type="number"
                id="handicap"
                bind:value={newPlayer.handicap}
                min="0"
                max="54"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Complete Registration
            </button>
          </form>
        </div>
      {/if}

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handicap</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each tournament.players.sort((a, b) => (a.score || 0) - (b.score || 0)) as player, i}
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.handicap}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {player.score ? player.score : '-'}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>

<style>
  :global(body) {
    background-color: #f3f4f6;
  }
</style> 