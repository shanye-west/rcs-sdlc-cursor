<script lang="ts">
  interface Player {
    id: string;
    name: string;
    handicap: number;
    tournamentsPlayed: number;
    averageScore: number;
  }

  // Mock data - in a real app, this would come from an API
  const players: Player[] = [
    {
      id: '1',
      name: 'John Doe',
      handicap: 12,
      tournamentsPlayed: 5,
      averageScore: 74.2
    },
    {
      id: '2',
      name: 'Jane Smith',
      handicap: 8,
      tournamentsPlayed: 8,
      averageScore: 71.5
    },
    {
      id: '3',
      name: 'Mike Johnson',
      handicap: 15,
      tournamentsPlayed: 3,
      averageScore: 78.6
    }
  ];
</script>

<svelte:head>
  <title>Players - RCS Golf Tournaments</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <div class="max-w-7xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Players</h1>

    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handicap</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tournaments</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Score</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each players as player}
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-blue-600 font-medium">{player.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{player.name}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.handicap}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.tournamentsPlayed}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.averageScore.toFixed(1)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="/players/{player.id}" class="text-blue-600 hover:text-blue-900">View Profile</a>
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