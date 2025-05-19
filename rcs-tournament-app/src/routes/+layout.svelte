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
	$: navItems =
		currentUser?.role === 'admin'
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
				: [{ href: '/tournaments', label: 'Tournaments' }];

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
		<div class="mx-auto max-w-7xl px-4">
			<div class="flex h-16 justify-between">
				<!-- Logo and main nav -->
				<div class="flex">
					<div class="flex flex-shrink-0 items-center">
						<a href="/" class="text-xl font-bold text-gray-800">RCS Tournament</a>
					</div>
					<!-- Desktop navigation -->
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						{#each navItems as item}
							<a
								href={item.href}
								class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium
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
							<span class="mr-4 text-gray-500">Welcome, {currentUser.username}</span>
							<button
								on:click={handleLogout}
								class="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
							>
								Logout
							</button>
						</div>
					{:else}
						<a
							href="/login"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
						>
							Login
						</a>
					{/if}

					<!-- Mobile menu button -->
					<div class="flex items-center sm:hidden">
						<button
							on:click={toggleMenu}
							class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset"
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
				<div class="space-y-1 pt-2 pb-3">
					{#each navItems as item}
						<a
							href={item.href}
							class="block border-l-4 py-2 pr-4 pl-3 text-base font-medium
								{$page.url.pathname.startsWith(item.href)
								? 'border-indigo-500 bg-indigo-50 text-indigo-700'
								: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}"
						>
							{item.label}
						</a>
					{/each}
					{#if currentUser}
						<div class="border-t border-gray-200 pt-4 pb-3">
							<div class="flex items-center px-4">
								<div class="flex-shrink-0">
									<span class="text-gray-500">Welcome, {currentUser.username}</span>
								</div>
							</div>
							<div class="mt-3 space-y-1">
								<button
									on:click={handleLogout}
									class="block w-full px-4 py-2 text-left text-base font-medium text-red-500 hover:bg-gray-50 hover:text-red-700"
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
	<main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
		<slot />
	</main>
</div>
