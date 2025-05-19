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

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow-sm">
		<div class="container mx-auto px-4">
			<div class="flex justify-between h-16">
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<a href="/" class="text-xl font-bold text-blue-600">RCS Golf</a>
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						<a
							href="/"
							class="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Tournaments
						</a>
						<a
							href="/players"
							class="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							Players
						</a>
						<a
							href="/about"
							class="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
						>
							About
						</a>
					</div>
				</div>
				<div class="hidden sm:ml-6 sm:flex sm:items-center">
					<button
						type="button"
						class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Sign In
					</button>
				</div>
				<div class="-mr-2 flex items-center sm:hidden">
					<button
						type="button"
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

		<!-- Mobile menu, show/hide based on menu state. -->
		<div class="sm:hidden" id="mobile-menu">
			<div class="pt-2 pb-3 space-y-1">
				<a
					href="/"
					class="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>
					Tournaments
				</a>
				<a
					href="/players"
					class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>
					Players
				</a>
				<a
					href="/about"
					class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
				>
					About
				</a>
			</div>
			<div class="pt-4 pb-3 border-t border-gray-200">
				<div class="flex items-center px-4">
					<button
						type="button"
						class="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Sign In
					</button>
				</div>
			</div>
		</div>
	</nav>

	<slot />
</div>
