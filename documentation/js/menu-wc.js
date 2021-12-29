'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">grocery-transparency documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7e2da4bb1659075dc2edbe80150e09b8f6a651782c6cc3bf5728b250a2ac3c910bdf97712c093adb12c24dc83f7a1395530ee302798414c90f4ab9e6735aad69"' : 'data-target="#xs-components-links-module-AppModule-7e2da4bb1659075dc2edbe80150e09b8f6a651782c6cc3bf5728b250a2ac3c910bdf97712c093adb12c24dc83f7a1395530ee302798414c90f4ab9e6735aad69"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7e2da4bb1659075dc2edbe80150e09b8f6a651782c6cc3bf5728b250a2ac3c910bdf97712c093adb12c24dc83f7a1395530ee302798414c90f4ab9e6735aad69"' :
                                            'id="xs-components-links-module-AppModule-7e2da4bb1659075dc2edbe80150e09b8f6a651782c6cc3bf5728b250a2ac3c910bdf97712c093adb12c24dc83f7a1395530ee302798414c90f4ab9e6735aad69"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardForMainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardForMainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardForShoppinglistComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardForShoppinglistComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardsForFavoritsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CardsForFavoritsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavoritsCreateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavoritsCreateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavoritsScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavoritsScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductDetailviewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductDetailviewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppinglistDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppinglistDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppinglistScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppinglistScreenComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmenuCardforfavoritsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmenuCardforfavoritsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmenuCardformainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmenuCardformainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmenuCardforshoppinglistComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmenuCardforshoppinglistComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/account.html" data-type="entity-link" >account</a>
                            </li>
                            <li class="link">
                                <a href="classes/Alllists.html" data-type="entity-link" >Alllists</a>
                            </li>
                            <li class="link">
                                <a href="classes/CardContent.html" data-type="entity-link" >CardContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/Categories.html" data-type="entity-link" >Categories</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProduct.html" data-type="entity-link" >CreateProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/Discounterfilter.html" data-type="entity-link" >Discounterfilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Favorits.html" data-type="entity-link" >Favorits</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterNpolicy.html" data-type="entity-link" >FilterNpolicy</a>
                            </li>
                            <li class="link">
                                <a href="classes/Kauflandstores.html" data-type="entity-link" >Kauflandstores</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissionNpolicy.html" data-type="entity-link" >PermissionNpolicy</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/Searchfilter.html" data-type="entity-link" >Searchfilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Shoppinglist.html" data-type="entity-link" >Shoppinglist</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShoppingListProducts.html" data-type="entity-link" >ShoppingListProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/Sortfilter.html" data-type="entity-link" >Sortfilter</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FetchAllListsService.html" data-type="entity-link" >FetchAllListsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FetchCurrentOffersService.html" data-type="entity-link" >FetchCurrentOffersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FetchProductdetailsService.html" data-type="entity-link" >FetchProductdetailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FetchSearchResultsService.html" data-type="entity-link" >FetchSearchResultsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenerateAccountService.html" data-type="entity-link" >GenerateAccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagingFavoritsService.html" data-type="entity-link" >ManagingFavoritsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagingFiltersNPolicyService.html" data-type="entity-link" >ManagingFiltersNPolicyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagingShoppinglistService.html" data-type="entity-link" >ManagingShoppinglistService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/GT_Response_Account.html" data-type="entity-link" >GT_Response_Account</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GT_Response_CreateProduct.html" data-type="entity-link" >GT_Response_CreateProduct</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GT_Response_filterNpolicy.html" data-type="entity-link" >GT_Response_filterNpolicy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GT_Response_List.html" data-type="entity-link" >GT_Response_List</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GT_Response_Product.html" data-type="entity-link" >GT_Response_Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GT_Response_Resonse.html" data-type="entity-link" >GT_Response_Resonse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GT_Response_ShoppingList.html" data-type="entity-link" >GT_Response_ShoppingList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GT_Response_ShoppingListAddToProducts.html" data-type="entity-link" >GT_Response_ShoppingListAddToProducts</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});