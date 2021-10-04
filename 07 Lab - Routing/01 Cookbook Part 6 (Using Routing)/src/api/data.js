import createApi from './api.js';

const api = createApi(null, null, (msg) => alert(msg));

const endpoints = {
    RECIPE_LIST: 'data/recipes?select=' + encodeURIComponent('_id,name,img'),
    RECIPE_COUNT: 'data/recipes?count',
    RECENT_RECIPES: 'data/recipes?select=' + encodeURIComponent('_id,name,img') + '&sortBy=' + encodeURIComponent('_createdOn desc'),
    RECIPES: 'data/recipes',
    RECIPE_BY_ID: 'data/recipes/',
    COMMENTS: 'data/comments',
    COMMENT_BY_ID: 'data/comments/',
    COMMENTS_BY_RECIPE_ID: 'data/comments?where=' + encodeURIComponent('recipeId='),
};

export const login = api.login.bind(api);
export const logout = api.logout.bind(api);
export const register = api.register.bind(api);

export async function getRecipes(page = 1, search) {
    let url = endpoints.RECIPE_LIST + `&offset=${(page - 1) * 5}&pageSize=5`;
    if (search) {
        url += '&where=' + encodeURIComponent(`name like "${search}"`);
    }
    return await api.get(url);
}

export async function getRecipeCount(search) {
    let url = endpoints.RECIPE_COUNT;
    if (search) {
        url += '&where=' + encodeURIComponent(`name like "${search}"`);
    }
    return await api.get(endpoints.RECIPE_COUNT);
}

export async function getRecent() {
    return await api.get(endpoints.RECENT_RECIPES);
}

export async function getRecipeById(id) {
    return await api.get(endpoints.RECIPE_BY_ID + id);
}

export async function createRecipe(recipe) {
    return await api.post(endpoints.RECIPES, recipe);
}

export async function editRecipe(id, recipe) {
    return await api.put(endpoints.RECIPE_BY_ID + id, recipe);
}

export async function deleteRecipeById(id) {
    return await api.delete(endpoints.RECIPE_BY_ID + id);
}

export async function getCommentsByRecipeId(recipeId) {
    return await api.get(endpoints.COMMENTS_BY_RECIPE_ID + encodeURIComponent(`"${recipeId}"`) + '&load=' + encodeURIComponent('author=_ownerId:users'));
}

export async function createComment(comment) {
    const result = await api.post(endpoints.COMMENTS, comment);
    return await api.get(endpoints.COMMENT_BY_ID + result._id + '?load=' + encodeURIComponent('author=_ownerId:users'));
}