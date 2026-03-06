export type Theme = {
	name: string;
	emoji: string;
	icon?: string;
};

export const themes: Theme[] = [
	{
		name: 'catppuccin',
		emoji: '🐈',
	},
	{
		name: 'cerberus',
		emoji: '🐺',
	},
	{
		name: 'concord',
		emoji: '🤖',
	},
	{
		name: 'crimson',
		emoji: '🔴',
	},
	{
		name: 'fennec',
		emoji: '🦊',
	},
	{
		name: 'hamlindigo',
		emoji: '👔',
	},
	{
		name: 'legacy',
		emoji: '💀',
	},
	{
		name: 'mint',
		emoji: '🍃',
	},
	{
		name: 'modern',
		emoji: '🌸',
	},
	{
		name: 'mona',
		emoji: '🐙',
	},
	{
		name: 'nosh',
		emoji: '🥙',
	},
	{
		name: 'nouveau',
		emoji: '👑',
	},
	{
		name: 'pine',
		emoji: '🌲',
	},
	{
		name: 'reign',
		emoji: '📒',
	},
	{
		name: 'rocket',
		emoji: '🚀',
	},
	{
		name: 'rose',
		emoji: '🌷',
	},
	{
		name: 'sahara',
		emoji: '🏜️',
	},
	{
		name: 'seafoam',
		emoji: '🧜‍♀️',
	},
	{
		name: 'terminus',
		emoji: '🌑',
	},
	{
		name: 'vintage',
		emoji: '📺',
	},
	{
		name: 'vox',
		emoji: '👾',
	},
	{
		name: 'wintry',
		emoji: '🌨️',
	},
	{
		name: 'blackpink',
		emoji: '🖤',
		icon: '/blackpinkicon.png',
	},
	{
		name: 'bol',
		emoji: '🧢',
		icon: '/bolanaicon.png',
	},
];

export const FALLBACK_THEME = 'bol';

