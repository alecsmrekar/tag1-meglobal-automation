import LoginPage from  '../../pageobjects/CMS/Login/login.page';
import AdminContentPage from '../../pageobjects/CMS/Login/adminContent.page';
import DropdownBlockPage from '../../pageobjects/CMS/Components/dropdown.page';
import { dropdownBlockData } from '../../data/dropdown.data';
import QALayoutPage from '../../pageobjects/CMS/Components/QALayoutPage.page';
import { getEnvironmentConfig } from '../../../envSelector';


describe('Dropdown Component Tests', () => {
    
    before(async ()=>{
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);

        // Use the environment data
        const bypassURL = environment.bypassURL;
        const cookies = environment.cookies;

        //Bypass login
        await browser.url(await bypassURL);
        await browser.maximizeWindow();

        // Set user cookies
        await browser.setCookies(await cookies);

    });

    before(async function() {
        global.suiteDescription = this.currentTest?.parent?.title;
        //navigate to admin content page
        await AdminContentPage.open();
        // Navigate to QA Landing page to execute tests
        await AdminContentPage.getTestPage(global.suiteDescription);  
        await expect(QALayoutPage.tabLayout).toBeDisplayed();
    })

    afterEach(async function() { 
        // Take a screenshot after each test/assertion
        const testName = this.currentTest?.fullTitle().replace(/\s/g, '_');
        const screenshotPath = `./screenshots/Dropdown/${testName}.png`;
        await browser.saveScreenshot(screenshotPath);
    });

    //delete previously created sections
    afterEach(async function() { 
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.cleanUpJob();
        await expect(QALayoutPage.btnRemoveSection).not.toBeDisplayedInViewport();
        //return to starting point
        await AdminContentPage.open();
        await AdminContentPage.getTestPage(global.suiteDescription);  
    });

    //delete page
    after(async function () {
        // Get the environment configuration
        const environment = getEnvironmentConfig(process.env.ENV);
        //await browser.url(environment.baseUrl+'user/logout');
        await browser.setCookies(environment.admin);
        await AdminContentPage.open();
        await AdminContentPage.deleteTestPage(global.suiteDescription);
        await expect($('.mf-alert__container--highlight')).toBeDisplayed();
    });

    it('[S3C855] Verify that a site Content Administrator can create a Dropdown Component with 1 menu item', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await DropdownBlockPage.configBlock).waitForDisplayed();

        await DropdownBlockPage.createDropdownItem(dropdownBlockData.title, dropdownBlockData.triggerText, dropdownBlockData.url, dropdownBlockData.linkText);

        await expect(DropdownBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await DropdownBlockPage.dropdownElement).scrollIntoView();
        
        await expect(DropdownBlockPage.dropdownElement).toExist; 

        await (await DropdownBlockPage.dropdownElement).click();
        await expect(DropdownBlockPage.duckDuckItem).toBeDisplayedInViewport(); 
    });

    it('[S3C856] Verify that a site Content Administrator can create a Dropdown Component with more than 1 menu item', async () => {
        await (await QALayoutPage.tabLayout).click();
        await QALayoutPage.createNewSection();
        await QALayoutPage.navigateToBlockList();
        (await QALayoutPage.btnFreeform).scrollIntoView();
        (await QALayoutPage.btnFreeform).click();
        (await DropdownBlockPage.configBlock).waitForDisplayed();

        await DropdownBlockPage.createDropdownMultiItem(dropdownBlockData.title, dropdownBlockData.triggerText, dropdownBlockData.url, dropdownBlockData.linkText, dropdownBlockData.triggerText1, dropdownBlockData.url1, dropdownBlockData.linkText1);

        await expect(DropdownBlockPage.successMsg).toBeDisplayed();

        await QALayoutPage.goToPageView();
        await (await DropdownBlockPage.dropdownElement).scrollIntoView();

        const elem = await DropdownBlockPage.dropdownElements.length;
        
        await expect(elem).toEqual(2); 

        await (await DropdownBlockPage.dropdownElement1).click();
        await expect(DropdownBlockPage.wikiItem).toBeDisplayedInViewport(); 
    });
    

    // it('[S3C857] Verify that all design fields are present with the correct available options.', async () => {
    //  await (await QALayoutPage.tabLayout).click();
    //     await QALayoutPage.createNewSection();
    //     await QALayoutPage.navigateToBlockList();
    //     (await QALayoutPage.btnFreeform).scrollIntoView();
    //     (await QALayoutPage.btnFreeform).click();
    //     (await DropdownBlockPage.configBlock).waitForDisplayed();

    //     await DropdownBlockPage.navToStyling()
        
    //     await expect(DropdownBlockPage.dropdownSize).toBeDisplayed();
    //     await expect(DropdownBlockPage.dropdownSize).toHaveValue('auto');
    //     await expect(DropdownBlockPage.dropdownSize).toHaveValue('small');
    //     await expect(DropdownBlockPage.dropdownSize).toHaveValue('base');
    //     await expect(DropdownBlockPage.dropdownSize).toHaveValue('large');
    //     await expect(DropdownBlockPage.dropdownSize).toHaveValue('full-width');

    //     await expect(DropdownBlockPage.inputMaxHeight).toBeDisplayed();
    //     await expect(DropdownBlockPage.inputMaxHeight).toHaveValue('370');

    //     await expect(DropdownBlockPage.dropdownMobileListPosition).toBeDisplayed();
    //     await expect(DropdownBlockPage.dropdownMobileListPosition).toHaveValue('left');
    //     await expect(DropdownBlockPage.dropdownMobileListPosition).toHaveValue('right');
    //     await expect(DropdownBlockPage.dropdownMobileListPosition).toHaveValue('center');

    //     await expect(DropdownBlockPage.dropdownDesktopListPosition).toBeDisplayed();
    //     await expect(DropdownBlockPage.dropdownDesktopListPosition).toHaveValue('left');
    //     await expect(DropdownBlockPage.dropdownDesktopListPosition).toHaveValue('right');
    //     await expect(DropdownBlockPage.dropdownDesktopListPosition).toHaveValue('center');

    //     await expect(DropdownBlockPage.inputVerticalOffset).toBeDisplayed();
    //     await expect(DropdownBlockPage.inputVerticalOffset).toHaveValue('8');
        
    //     await expect(DropdownBlockPage.inputHorizontalOffset).toBeDisplayed();
    //     await expect(DropdownBlockPage.inputHorizontalOffset).toHaveValue('0');

    // });

  });
