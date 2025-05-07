import { expect } from 'chai';
import HomePage from '../pageobjects/home.page';


describe('CheapFlights Homepage', () => {
     before(async () => {
          await HomePage.open();
     });

     it('should display the logo', async () => {
          expect(await HomePage.logo.isDisplayed()).to.be.true;
     });

     it('should display and allow clicking the login button', async () => {
          expect(await HomePage.loginButton.isDisplayed()).to.be.true;
          expect(await HomePage.loginButton.isClickable()).to.be.true;
     });

     it('should search for flights', async () => {
          const destination = 'Sydney';
          const departure = '1 June, 2025';
          const returnDate = '10 June, 2025';

          // Enter destination
          await HomePage.flightDestinationInput.setValue(destination);

          // Select first suggestion
          await HomePage.firstDestinationOption.waitForDisplayed({ timeout: 5000 });
          await HomePage.firstDestinationOption.click();

          // Select departure date
          await HomePage.departureDate(departure).waitForDisplayed({ timeout: 5000 });
          await HomePage.departureDate(departure).click();

          // Select return date
          await HomePage.returnDate(returnDate).waitForDisplayed({ timeout: 5000 });
          await HomePage.returnDate(returnDate).click();

          // Click search
          await HomePage.searchButton.waitForClickable({ timeout: 5000 });
          await HomePage.searchButton.click();

          // Wait for search results
          const resultsSelector = '//div[@id="flight-results-list-wrapper"]//div[@role="group"]';
          await browser.waitUntil(
               async () => (await $$(resultsSelector)).length > 0,
               {
                    timeout: 15000,
                    timeoutMsg: 'Expected at least one search result to appear',
               }
          );

          const searchResults = await $$(resultsSelector);
          expect(searchResults.length).to.be.greaterThan(0);
     });
});
