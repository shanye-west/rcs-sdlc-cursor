<!-- Root layout component -->
<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import { onMount } from 'svelte';
	import type { AuthUser } from '$lib/auth';

	// Navigation state
	let isMenuOpen = false;
	let currentUser: AuthUser | null = null;

	// Check if user is authenticated
	onMount(async () => {
		// TODO: Implement session check
		// For now, we'll just check localStorage
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			currentUser = JSON.parse(storedUser);
		}
	});

	// Navigation items based on user role
	$: navItems = currentUser?.role === 'admin' 
		? [
				{ href: '/admin/tournaments', label: 'Tournaments' },
				{ href: '/admin/players', label: 'Players' },
				{ href: '/admin/teams', label: 'Teams' },
				{ href: '/admin/bets', label: 'Bets' }
			]
		: currentUser?.role === 'player'
		? [
				{ href: '/tournaments', label: 'Tournaments' },
				{ href: '/matches', label: 'My Matches' },
				{ href: '/bets', label: 'Bets' }
			]
		: [
				{ href: '/tournaments', label: 'Tournaments' }
			];

	// Toggle mobile menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Handle logout
	function handleLogout() {
		localStorage.removeItem('user');
		currentUser = null;
		window.location.href = '/login';
	}
</script>

<div class="min-h-screen bg-gray-100">
	<!-- Navigation -->
	<nav class="bg-white shadow-lg">
		<div class="max-w-7xl mx-auto px-4">
			<div class="flex justify-between h-16">
				<!-- Logo and main nav -->
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<a href="/" class="text-xl font-bold text-gray-800">RCS Tournament</a>
					</div>
					<!-- Desktop navigation -->
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						{#each navItems as item}
							<a
								href={item.href}
								class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
									{$page.url.pathname.startsWith(item.href)
										? 'border-indigo-500 text-gray-900'
										: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
							>
								{item.label}
							</a>
						{/each}
					</div>
				</div>

				<!-- Right side menu -->
				<div class="flex items-center">
					{#if currentUser}
						<div class="hidden sm:ml-6 sm:flex sm:items-center">
							<span class="text-gray-500 mr-4">Welcome, {currentUser.username}</span>
							<button
								on:click={handleLogout}
								class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
							>
								Logout
							</button>
						</div>
					{:else}
						<a
							href="/login"
							class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
						>
							Login
						</a>
					{/if}

					<!-- Mobile menu button -->
					<div class="flex items-center sm:hidden">
						<button
							on:click={toggleMenu}
							class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span class="sr-only">Open main menu</span>
							<!-- Menu icon -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
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
		</div>

		<!-- Mobile menu -->
		{#if isMenuOpen}
			<div class="sm:hidden">
				<div class="pt-2 pb-3 space-y-1">
					{#each navItems as item}
						<a
							href={item.href}
							class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium
								{$page.url.pathname.startsWith(item.href)
									? 'bg-indigo-50 border-indigo-500 text-indigo-700'
									: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'}"
						>
							{item.label}
						</a>
					{/each}
					{#if currentUser}
						<div class="pt-4 pb-3 border-t border-gray-200">
							<div class="flex items-center px-4">
								<div class="flex-shrink-0">
									<span class="text-gray-500">Welcome, {currentUser.username}</span>
								</div>
							</div>
							<div class="mt-3 space-y-1">
								<button
									on:click={handleLogout}
									class="block w-full text-left px-4 py-2 text-base font-medium text-red-500 hover:text-red-700 hover:bg-gray-50"
								>
									Logout
								</button>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</nav>

	<!-- Main content -->
	<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
		<slot />
	</main>
</div>
