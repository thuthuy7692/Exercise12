import {Page,Locator } from '@playwright/test'
export class DashBoad {
    page:Page;
    wooCommerceSetup: Locator;
    wooCommerceStatus: Locator;
    wooCommerceRecentReviews: Locator;
    siteHealthStatus: Locator;
    ataGlance: Locator;
    activity: Locator;
    quickDraft: Locator;
    wordPressEventsandNews: Locator;

    constructor(page:Page){
        this.page=page;
        this.wooCommerceSetup=this.page.getByRole('heading',{name:'WooCommerce Setup'});
        this.wooCommerceStatus=this.page.getByRole('heading',{name:'WooCommerce Status'});
        this.wooCommerceRecentReviews=this.page.getByRole('heading',{name:'wooCommerce Recent Reviews'});
        this.ataGlance=this.page.getByRole('heading',{name:'at a Glance'});
        this.activity=this.page.getByRole('heading',{name:'activity'});
        this.quickDraft=this.page.getByRole('heading',{name:'quick Draft'});
        this.wordPressEventsandNews=this.page.getByRole('heading',{name:'wordPress Events and News'});

    }


}