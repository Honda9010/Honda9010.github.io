import { getCollection, type CollectionEntry } from 'astro:content';

export const siteName = '行摄手记';
export const sectionNames = { travel: '游记', essays: '随笔' } as const;

export type Album = CollectionEntry<'albums'>;
export type Story = CollectionEntry<'stories'>;
export type Photo = Album['data']['photos'][number];
export type Section = keyof typeof sectionNames;

export function albumUrl(album: Album) {
  return `/photography/${album.id}/`;
}

export function storyUrl(story: Story) {
  return `/${story.data.section}/${story.id}/`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

export async function getJournal() {
  const [albums, stories] = await Promise.all([
    getCollection('albums'),
    getCollection('stories', ({ data }) => !data.draft),
  ]);
  albums.sort((a, b) => Number(b.data.featured) - Number(a.data.featured) || a.id.localeCompare(b.id));
  stories.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
  return { albums, stories, albumsById: new Map(albums.map((album) => [album.id, album])) };
}
