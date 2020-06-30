var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _cards, _currentlySelected;
export class Store {
    constructor(store) {
        _cards.set(this, void 0);
        _currentlySelected.set(this, void 0);
        __classPrivateFieldSet(this, _cards, store.cards);
        __classPrivateFieldGet(this, _currentlySelected);
        document.querySelector('.todo-card');
    }
    get cards() {
        return __classPrivateFieldGet(this, _cards);
    }
}
_cards = new WeakMap(), _currentlySelected = new WeakMap();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFZQSxNQUFNLE9BQU8sS0FBSztJQUlqQixZQUFZLEtBQWdCO1FBSDVCLHlCQUFjO1FBQ2QscUNBQStCO1FBRzlCLHVCQUFBLElBQUksVUFBVSxLQUFLLENBQUMsS0FBSyxFQUFBO1FBQ3pCLGlEQUF1QjtRQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUVELElBQUksS0FBSztRQUNSLDRDQUFrQjtJQUNuQixDQUFDO0NBQ0QifQ==