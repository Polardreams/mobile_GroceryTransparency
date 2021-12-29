import { Favorits } from "./favorits";
import { Shoppinglist } from "./shoppinglists";

/**
 * Model for Favorits and ShoppingLists. Needed as Wrapper in Service fetch-all-lists.
 */

export class Alllists {
    Fav:Favorits[] = [];
    Shop:Shoppinglist[] = [];
}
