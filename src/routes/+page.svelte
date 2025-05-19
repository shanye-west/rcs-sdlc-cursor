<script lang="ts">
  import { onMount } from 'svelte';
  
  interface Tournament {
    id: string;
    name: string;
    date: string;
    location: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    participants: number;
  }

  let tournaments: Tournament[] = [
    {
      id: '1',
      name: 'Summer Championship 2024',
      date: '2024-07-15',
      location: 'Pine Valley Golf Club',
      status: 'upcoming',
      participants: 0
    },
    {
      id: '2',
      name: 'Spring Open 2024',
      date: '2024-04-20',
      location: 'Augusta National',
      status: 'upcoming',
      participants: 0
    }
  ];
</script>

<svelte:head>
  <title>RCS Golf Tournaments</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-8">Golf Tournaments</h1>
  
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each tournaments as tournament}
      <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h2 class="text-xl font-semibold mb-2">{tournament.name}</h2>
        <div class="space-y-2 text-gray-600">
          <p class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(tournament.date).toLocaleDateString()}
          </p>
          <p class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {tournament.location}
          </p>
          <p class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {tournament.participants} Participants
          </p>
        </div>
        <div class="mt-4">
          <span class="inline-block px-3 py-1 rounded-full text-sm font-semibold
            {tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
             tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
             'bg-gray-100 text-gray-800'}">
            {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
          </span>
        </div>
        <a href="/tournaments/{tournament.id}" class="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          View Details
        </a>
      </div>
    {/each}
  </div>
</main>

<style>
  :global(body) {
    background-color: #f3f4f6;
  }
</style>
