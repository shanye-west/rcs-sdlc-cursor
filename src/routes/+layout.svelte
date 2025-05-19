<!-- Root layout component -->
<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { supabase } from '$lib/supabaseClient';

	// Navigation state
	let isMenuOpen = false;

	// Handle logout
	async function handleLogout() {
		await supabase.auth.signOut();
		window.location.href = '/login';
	}

	// Navigation items based on user role
	$: navItems = $auth?.role === 'admin'
		? [
				{ href: '/admin/tournaments', label: 'Tournaments' },
				{ href: '/admin/players', label: 'Players' },
				{ href: '/admin/teams', label: 'Teams' }
			]
		: $auth?.role === 'player'
			? [
					{ href: '/tournaments', label: 'Tournaments' },
					{ href: '/matches', label: 'My Matches' }
				]
			: [
					{ href: '/', label: 'Tournaments' },
					{ href: '/about', label: 'About' }
				];

	// Toggle mobile menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow-sm">
		<div class="container mx-auto px-4">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<a href="/" class="text-xl font-bold text-blue-600">RCS Golf</a>
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						{#each navItems as item}
							<a
								href={item.href}
								class="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium {$page.url.pathname === item.href ? 'border-blue-500 text-gray-900' : ''}"
							>
								{item.label}
							</a>
						{/each}
					</div>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:items-center">
					{#if $auth}
						<button
							on:click={handleLogout}
							class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Sign Out
						</button>
					{:else}
						<a
							href="/login"
							class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Sign In
						</a>
					{/if}
				</div>
				<div class="-mr-2 flex items-center sm:hidden">
					<button
						type="button"
						on:click={toggleMenu}
						class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						aria-controls="mobile-menu"
						aria-expanded="false"
					>
						<span class="sr-only">Open main menu</span>
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		{#if isMenuOpen}
			<div class="sm:hidden" id="mobile-menu">
				<div class="pt-2 pb-3 space-y-1">
					{#each navItems as item}
						<a
							href={item.href}
							class="{$page.url.pathname === item.href ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
						>
							{item.label}
						</a>
					{/each}
				</div>
				<div class="pt-4 pb-3 border-t border-gray-200">
					<div class="flex items-center px-4">
						{#if $auth}
							<button
								on:click={handleLogout}
								class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Sign Out
							</button>
						{:else}
							<a
								href="/login"
								class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Sign In
							</a>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</nav>

	<slot />
</div>
