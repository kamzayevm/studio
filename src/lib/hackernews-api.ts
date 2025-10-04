import type { HNItem, HNComment, HNStory } from './types';

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } }); // Cache for 60 seconds
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  return res.json();
}

export async function getTopStoryIds(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/topstories.json`);
}

export async function getNewStoryIds(): Promise<number[]> {
  return fetchJson<number[]>(`${API_BASE_URL}/newstories.json`);
}

export async function getItem<T extends HNItem>(id: number): Promise<T | null> {
  try {
    const item = await fetchJson<T>(`${API_BASE_URL}/item/${id}.json`);
    if (item === null || item.deleted || item.dead) {
      return null;
    }
    return item;
  } catch (error) {
    console.error(`Error fetching item ${id}:`, error);
    return null;
  }
}

export async function getItems<T extends HNItem>(ids: number[]): Promise<(T | null)[]> {
  return Promise.all(ids.map(id => getItem<T>(id)));
}

export async function getCommentsWithChildren(commentIds: number[]): Promise<HNComment[]> {
  if (!commentIds || commentIds.length === 0) {
    return [];
  }
  
  const comments = await Promise.all(commentIds.map(id => getItem<HNItem>(id)));

  const validComments = comments.filter((c): c is HNItem & { kids?: number[] } => c !== null && c.type === 'comment');

  const commentsWithChildren = await Promise.all(
    validComments.map(async (comment) => {
      let children: HNComment[] = [];
      if (comment.kids && comment.kids.length > 0) {
        children = await getCommentsWithChildren(comment.kids);
      }
      return { ...comment, children } as HNComment;
    })
  );

  return commentsWithChildren;
}
