import { slugify } from './common-utils';

// Accept posts from any collection with tags
type AnyPost = { data: { tags?: string[]; publishDate?: string | Date; [key: string]: any }; [key: string]: any };

export function sortItemsByDateDesc(itemA: AnyPost, itemB: AnyPost) {
  return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}

export function getAllTags(posts: Array<{ data: { tags?: string[] } }>) {
  const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
  return tags
    .map((tag) => {
      return {
        name: tag,
        id: slugify(tag),
      };
    })
    .filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
    });
}

export function getPostsByTag(posts: Array<{ data: { tags?: string[] } }>, tagId: string) {
  return posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagId));
}
